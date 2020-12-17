const fs = require('fs');
const url = require('url');
const path = require('path');
const mysql = require('mysql');
const request = require('request');
const Store = require('./Store.js');
const Log = require('./Log.js');
const modal = require('electron-modal');
const PythonShell = require('python-shell');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { resolve } = require('path');

let mainWindow;

// First instantiate the class
const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'user-preferences',
    defaults: {
        // 800x600 is the default size of our window
        windowBounds: { width: 800, height: 600 }
    }
});

const samplingLogger = new Log({
    configName: 'sampling-log',
    defaults: {
        data: 'kosong'
    }
})

samplingLogger.insert({
    id: 1,
    rs_id: 1,
    nurse_id: 1
})

// MySQl Connection
let { host, user, password, database } = store.get('database');

let connection = mysql.createConnection({
    host    :   host,
    user    :   user,
    password:   password,
    database:   database
})

let { cloud_host, cloud_database } = store.get('cloud-vps');

function createWindow () {
    connection.connect(function (err) {
        console.log(err)
    })

    // cloud.connect(function (err) {
    //     console.log(err)
    // })

    modal.setup();

    // First we'll get our height and width. This will be the defaults if there wasn't anything saved
    let { width, height } = store.get('windowBounds');

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
    });

    mainWindow = new BrowserWindow({
        width: width,
        height: height ,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });

     //mainWindow.webContents.openDevTools()

    // The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
    // to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
    mainWindow.on('resize', () => {
        // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
        // the height, width, and x and y coordinates.
        let { width, height } = mainWindow.getBounds();
        // Now that we have them, save them using the `set` method.
        store.set('windowBounds', { width, height });
    });

    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});


// // // // // // // // // // // // // // // //
// Fungsi Electron! hayooo
// // // // // // // // // // // // // // // //

function timestamp() {
    arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
    date = new Date()
    millisecond = date.getMilliseconds()
    detik = date.getSeconds()
    menit = date.getMinutes()
    jam = date.getHours()
    hari = date.getDay()
    tanggal = date.getDate()
    bulan = date.getMonth()
    tahun = date.getFullYear()
    date = `${tahun}-${bulan}-${tanggal} ${jam}:${menit}:${detik}`
    return date
}

// Terima data dari python setiap detik
PythonShell.PythonShell.run('enose-dummy.py', {scriptPath: path.join(__dirname,"../python/")} ).stdout.on('data', (data) => {mainWindow.send('python-data', data)})

ipcMain.on('mounted', () => {
    let { rumahSakit } = store.get('ID');
    mainWindow.send('mountedResponse', rumahSakit)
})

ipcMain.on('connect', () => {
    console.log('connecting....')
    // sinkronisasi awal
});

ipcMain.on('disconnect', () => {
    //message = `Disconnected!`
    //mainWindow.send('disconnectResponse', message)
});

function getMaxSamplingIdLocal() {
    return new Promise(resolve => {
        connection.query('SELECT MAX(id) as id from sampling', function(err, res) {
            // console.log(res[0].id)
            resolve(res[0].id)
        })
    })
}

function getMaxSamplingIdCloud() {
    return new Promise(resolve => {
        request.post(
            `http://${cloud_host}/max_sampling_id`,
            {
                json: {
                    'database': cloud_database
                },
            },
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                resolve(body)
            }
        )
    })
}

function getMaxClinicalDataIdLocal() {
    return new Promise(resolve => {
        connection.query('SELECT MAX(id) as id from clinical_data', function(err, res) {
            // console.log(res[0].id)
            resolve(res[0].id)
        })
    })
}

function getMaxClinicalDataIdCloud() {
    return new Promise(resolve => {
        request.post(
            `http://${cloud_host}/max_clinical_data_id`,
            {
                json: {
                    'database': cloud_database
                },
            },
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                resolve(body)
            }
        )
    })
}

function getMaxSensorDataIdLocal() {
    return new Promise(resolve => {
        connection.query('SELECT MAX(id) as id from sensor_data', function(err, res) {
            // console.log(res[0].id)
            resolve(res[0].id)
        })
    })
}

function getMaxSensorDataIdCloud() {
    return new Promise(resolve => {
        request.post(
            `http://${cloud_host}/max_sensor_data_id`,
            {
                json: {
                    'database': cloud_database
                },
            },
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                resolve(body)
            }
        )
    })
}

ipcMain.on('storePatient', (event, input, detailPatient, clinical_data) => {
    let sampling = {        
        rs_id       :   1,
        nurse_id    :   detailPatient.nurse_id,
        room_id     :   detailPatient.ruang_id.id,
        patient_id  :   detailPatient.patient_id,
        covid_status:   !detailPatient.covid_status,

        s1  :   input[0][0],
        s2  :   input[1][0],
        s3  :   input[2][0],
        s4  :   input[3][0],
        s5  :   input[4][0],
        s6  :   input[5][0],
        s7  :   input[6][0],
        s8  :   input[7][0],
        s9  :   input[8][0],

        c1  :   input[9][0],
        c2  :   input[10][0],
        c3  :   input[11][0],
        c4  :   input[12][0],
        c5  :   input[13][0],
        c6  :   input[14][0],
        c7  :   input[15][0],
        c8  :   input[16][0],
        c9  :   input[17][0],

        created_at: timestamp(),
    }

    let clicinal_data_row = {
        sampling_id: "",
        temperature: clinical_data.temperature,
        uric_acid: clinical_data.uric_acid,
        cholestrol: clinical_data.cholestrol,
        oxygen_saturation: clinical_data.oxygen_saturation,
        glucose: clinical_data.glucose,
        heart_rate: clinical_data.heart_rate,
        created_at: timestamp(),
    }

    let insertSamplingPromise = new Promise(function(myResolve, myReject) {
        // "Producing Code" (May take some time)

        connection.query('INSERT INTO sampling SET ?', sampling, function(err, result) {
            if (err) {
                myReject();  // when error
                throw err;
            }

            clicinal_data_row.sampling_id = result.insertId

            async function synchronizedDB() {
                console.log('Syncronizing Check')

                let resolveValue = {
                    'sampling_id' : result.insertId,
                    'sync'        : false
                }
    
                const maxSamplingIdLocal = await getMaxSamplingIdLocal() - 1
                const maxSamplingIdCloud = await getMaxSamplingIdCloud()
                const maxClinicalDataIdLocal = await getMaxClinicalDataIdLocal()
                const maxClinicalDataIdCloud = await getMaxClinicalDataIdCloud()
                const maxSensorDataIdLocal = await getMaxSensorDataIdLocal()
                const maxSensorDataIdCloud = await getMaxSensorDataIdCloud()
                
                if (maxSamplingIdLocal == maxSamplingIdCloud) {
                    if (maxClinicalDataIdLocal == maxClinicalDataIdCloud) {
                        if (maxSensorDataIdLocal == maxSensorDataIdCloud) {
                            console.log("database sudah sinkron")
                            sampling.database = cloud_database
                            request.post(
                                `http://${cloud_host}/store_sampling`,
                                {
                                    json: sampling,
                                },
                                (error, res, body) => {
                                    if (error) {
                                        console.error(error)
                                        // logging gagal masukin ke cloud sampling
                                        return
                                    }
                                    console.log(`sampling statusCode: ${res.statusCode}`)
                                    console.log(body)
                                    resolveValue.sync = true
                                    myResolve(resolveValue);
                                }
                            )
                        } else {
                            console.log('tabel sensor_data belum sinkron')
                            myResolve(resolveValue);
                        }
                    } else {
                        console.log('tabel clinical_data belum sinkron')
                        myResolve(resolveValue);
                    }
                } else {
                    console.log('tabel sampling belum sinkron')
                    myResolve(resolveValue);
                }
            }
    
            synchronizedDB()
        });
    });

    // "Consuming Code" (Must wait for a fulfilled Promise)
    insertSamplingPromise.then(
        function(value) {
            connection.query('INSERT INTO clinical_data SET ?', clicinal_data_row, function(err) {
                if (err) throw err;

                if(value.sync){
                    clicinal_data_row.database = cloud_database

                    request.post(
                        `http://${cloud_host}/store_clinical_data`,
                        {
                            json: clicinal_data_row,
                        },
                        (error, res, body) => {
                          if (error) {
                            console.error(error)
                            return
                          }
                          console.log(`clinical_data statusCode: ${res.statusCode}`)
                          console.log(body)
                        }
                    )
                }
                else{
                    // logging gagal masukin ke cloud sampling
                }

                mainWindow.send('storePatientResponse', value.sampling_id)
            });
        },

        function(error) {
            /* code if some error */
            console.log(error)
        }
    );

});

let header = `Timestamp;MQ2_ADC;MQ3_ADC;MQ4_ADC;MQ5_ADC;MQ6_ADC;MQ7_ADC;MQ8_ADC;MQ9_ADC;MQ135_ADC;TEMPERATURE;HUMIDITY;MQ2_PPM_LPG;MQ2_PPM_CO;MQ2_PPM_SMOKE;MQ2_PPM_ALCOHOL;MQ2_PPM_CH4;MQ2_PPM_H2;MQ2_PPM_PROPANE;MQ3_PPM_ALCOHOL;MQ3_PPM_BENZINE;MQ3_PPM_CH4;MQ3_PPM_C0;MQ3_PPM_HEXANE;MQ3_PPM_LPG;MQ4_PPM_ALCOHOL;MQ4_PPM_CH4;MQ4_PPM_CO;MQ4_PPM_H2;MQ4_PPM_LPG;MQ4_PPM_SMOKE;MQ5_PPM_ALCOHOL;MQ5_PPM_CH4;MQ5_PPM_CO;MQ5_PPM_H2;MQ5_PPM_LPG;MQ6_PPM_ALCOHOL;MQ6_PPM_CH4;MQ6_PPM_CO;MQ6_PPM_H2;MQ6_PPM_LPG;MQ7_PPM_ALCOHOL;MQ7_PPM_CH4;MQ7_PPM_CO;MQ7_PPM_H2;MQ7_PPM_LPG;MQ8_PPM_ALCOHOL;MQ8_PPM_CH4;MQ8_PPM_CO;MQ8_PPM_H2;MQ8_PPM_LPG;MQ9_PPM_CH4;MQ9_PPM_CO;MQ9_PPM_LPG;MQ135_PPM_ACETON;MQ135_PPM_ALCOHOL;MQ135_PPM_CO;MQ135_PPM_CO2;MQ135_PPM_NH4;MQ135_PPM_TOLUOL;\n`

let content = header

ipcMain.on('recording', (event, data, presentase, sampling_id, sync_status) => {

    if( presentase == 100 )
    {
        clearInterval(startResponse)

        let saveOptions = {
            defaultPath: app.getPath('documents') + '/untitled.csv'
        }

        let savePromise = dialog.showSaveDialog(null, saveOptions)

        savePromise.then(
            (value) =>{
                console.log(value)

                if(!value.canceled) {
                    fs.writeFile(value.filePath, content, (err) => {
                        if(err) {
                            console.log('error in creating file: '+ err.message)
                        }
                        console.log(`file ${value.filePath} successfully created!`)
                        content = header
                    })
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }
    else
    {
        content = content + `${timestamp()};${data[0]};${data[1]};${data[2]};${data[3]};${data[4]};${data[5]};${data[6]};${data[7]};${data[8]};${data[9]};${data[10]};${data[11]};${data[12]};${data[13]};${data[14]};${data[15]};${data[16]};${data[17]};${data[18]};${data[19]};${data[20]};${data[21]};${data[22]};${data[23]};${data[24]};${data[25]};${data[26]};${data[27]};${data[28]};${data[29]};${data[30]};${data[31]};${data[32]};${data[33]};${data[34]};${data[35]};${data[36]};${data[37]};${data[38]};${data[39]};${data[40]};${data[41]};${data[42]};${data[43]};${data[44]};${data[45]};${data[46]};${data[47]};${data[48]};${data[49]};${data[50]};${data[51]};${data[52]};${data[53]};${data[54]};${data[55]};${data[56]};${data[57]};${data[58]};${data[59]}`

        let sensor_data = {
            sampling_id         : sampling_id,

            MQ2_ADC             :   data[0],
            MQ3_ADC             :   data[1],
            MQ4_ADC             :   data[2],
            MQ5_ADC             :   data[3],
            MQ6_ADC             :   data[4],
            MQ7_ADC             :   data[5],
            MQ8_ADC             :   data[6],
            MQ9_ADC             :   data[7],
            MQ135_ADC           :   data[8],
            TEMPERATURE         :   data[9],
            HUMIDITY            :   data[10],

            MQ2_PPM_LPG         :   data[11],
            MQ2_PPM_CO          :   data[12],
            MQ2_PPM_SMOKE       :   data[13],
            MQ2_PPM_ALCOHOL     :   data[14],
            MQ2_PPM_CH4         :   data[15],
            MQ2_PPM_H2          :   data[16],
            MQ2_PPM_PROPANE     :   data[17],

            MQ3_PPM_ALCOHOL     :   data[18],
            MQ3_PPM_BENZINE     :   data[19],
            MQ3_PPM_CH4         :   data[20],
            MQ3_PPM_CO          :   data[21],
            MQ3_PPM_HEXANE      :   data[22],
            MQ3_PPM_LPG         :   data[23],

            MQ4_PPM_ALCOHOL     :   data[24],
            MQ4_PPM_CH4         :   data[25],
            MQ4_PPM_CO          :   data[26],
            MQ4_PPM_H2          :   data[27],
            MQ4_PPM_LPG         :   data[28],
            MQ4_PPM_SMOKE       :   data[29],

            MQ5_PPM_ALCOHOL     :   data[30],
            MQ5_PPM_CH4         :   data[31],
            MQ5_PPM_CO          :   data[32],
            MQ5_PPM_H2          :   data[33],
            MQ5_PPM_LPG         :   data[34],

            MQ6_PPM_ALCOHOL     :   data[35],
            MQ6_PPM_CH4         :   data[36],
            MQ6_PPM_CO          :   data[37],
            MQ6_PPM_H2          :   data[38],
            MQ6_PPM_LPG         :   data[39],

            MQ7_PPM_ALCOHOL     :   data[40],
            MQ7_PPM_CH4         :   data[41],
            MQ7_PPM_CO          :   data[42],
            MQ7_PPM_H2          :   data[43],
            MQ7_PPM_LPG         :   data[44],

            MQ8_PPM_ALCOHOL     :   data[45],
            MQ8_PPM_CH4         :   data[46],
            MQ8_PPM_CO          :   data[47],
            MQ8_PPM_H2          :   data[48],
            MQ8_PPM_LPG         :   data[49],

            MQ9_PPM_CH4         :   data[50],
            MQ9_PPM_CO          :   data[51],
            MQ9_PPM_LPG         :   data[52],

            MQ135_PPM_ACETON    :   data[53],
            MQ135_PPM_ALCOHOL   :   data[54],
            MQ135_PPM_CO        :   data[55],
            MQ135_PPM_CO2       :   data[56],
            MQ135_PPM_NH4       :   data[57],
            MQ135_PPM_TOLUOL    :   data[58],

            created_at: timestamp()
        }

        // console.log(JSON.stringify(sensor_data))

        connection.query('INSERT INTO sensor_data SET ?', sensor_data, function(err, result, fields) {
            if (err) throw err;

            if(sync_status){
                sensor_data.database = cloud_database

                request.post(
                    `http://${cloud_host}/store_sensor_data`,
                    {
                        json: sensor_data,
                    },
                    (error, res, body) => {
                    if (error) {
                        console.error(error)
                        // loggingnya di sini
                        return
                    }
                    console.log(`sensor_data statusCode: ${res.statusCode}`)
                    console.log(body)
                    }
                )
            }
        });

        // cloud.query('INSERT INTO sensor_data SET ?', sensor_data, function(err, result, fields) {
        //     if (err) throw err;
        // });
    }

})

let startResponse

ipcMain.on('start', (event, pengambilan_id, totalTime) => {
    console.log('starting.... ' + pengambilan_id)

        // connection.query('INSERT INTO sensor_data SET ?', sensor_data, function(err, result, fields) {
        //     if (err) throw err;
        // });
});

ipcMain.on('stop', () => {
    // console.log("HAPUSSS")
    startResponse = clearInterval(startResponse)
})

ipcMain.on('pompaOn', () => {
    // console.log('pompa ON')
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }
     //rpio.open(11, rpio.OUTPUT, rpio.LOW);
     //rpio.write(11, rpio.HIGH);

    PythonShell.PythonShell.run('pompa-on.py', options, function (err, results) {
        if (err) throw err
        console.log(results)
    })
})

ipcMain.on('pompaOff', () => {
    // console.log('pompa OFF')
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }
      //rpio.open(11, rpio.OUTPUT, rpio.LOW);
      //rpio.write(11, rpio.LOW);

    PythonShell.PythonShell.run('pompa-off.py', options, function (err, results) {
        if (err) throw err
        console.log(results)
    })
})

ipcMain.on('getPengaturan', () => {
    let { proses1, proses2, proses3 } = store.get('config');
    let result = [proses1, proses2, proses3]
    mainWindow.send('getPengaturanResponse', result)
})

ipcMain.on('updatePengaturan', (event, input) => {
    let { proses1, proses2, proses3 } = input;
    store.set('config', { proses1, proses2, proses3 });
})

const insertSampling = async (sampling_id) => {
    try {
        let results = await new Promise( (resolve, reject) => {
            connection.query("SELECT * FROM sampling WHERE id = ?", [sampling_id], function (err, results){
                if (err) reject(err)
                else resolve(results[0])
            })
        })
    
        let body = await new Promise( (resolve, reject) => {
            request.post(
                `http://${cloud_host}/store_sampling`,
                {
                    json: results,
                },
                (error, res, body) => {
                    if (error) reject(error)
                    else resolve(body)
                }
            )
        } )

        console.log(body)

    } catch (error) {
        
    }
}

ipcMain.on('dbSync', async (event) => {
    console.log('synchronization process')

    const maxSamplingIdLocal = await getMaxSamplingIdLocal()
    const maxSamplingIdCloud = await getMaxSamplingIdCloud()
    const maxClinicalDataIdLocal = await getMaxClinicalDataIdLocal()
    const maxClinicalDataIdCloud = await getMaxClinicalDataIdCloud()
    const maxSensorDataIdLocal = await getMaxSensorDataIdLocal()
    const maxSensorDataIdCloud = await getMaxSensorDataIdCloud()

    // Sampling Table
    if (maxSamplingIdLocal > maxSamplingIdCloud) {
        console.log('Syncronizing Sampling Table')
        
        for (let sampling_id = maxSamplingIdCloud+1; sampling_id <= maxSamplingIdLocal; sampling_id++) {
            
            await insertSampling(sampling_id)
            // await insertClinicalData(sampling_id)
            // await insertSensorData(sampling_id)

        }
    }
})