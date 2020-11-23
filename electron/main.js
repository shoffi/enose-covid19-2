const rpio = require('rpio');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const modal = require('electron-modal');
const path = require('path');
const PythonShell = require('python-shell');
const url = require('url');
const mysql = require('mysql');
const fs = require('fs');
const Store = require('./Store.js');

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

// MySQl Connection
let { host, user, password, database } = store.get('database');
let connection = mysql.createConnection({
    host    :   host,
    user    :   user,
    password:   password,
    database:   database
})

function createWindow () {
    connection.connect(function (err) {
        console.log(err)
    })

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

ipcMain.on('storePatient', (event, input, detailPatient, clinical_data) => {
    
    // console.log(detailPatient)
    console.log(clinical_data)

    let sampling = {
        rs_id       :   1,
        nurse_id    :   detailPatient.nurse_id,
        room_id     :   detailPatient.ruang_id.id,
        patient_id  :   detailPatient.patient_id,
        covid_status:   detailPatient.covid_status,

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

    mainWindow.send('storePatientResponse', 1)
    // console.log(clicinal_data_row)

    // let insertSamplingPromise = new Promise(function(myResolve, myReject) {
    //     // "Producing Code" (May take some time)
    //     connection.query('INSERT INTO sampling SET ?', sampling, function(err, result) {
    //         if (err) {
    //             myReject();  // when error
    //             throw err;
    //         }
    //         clicinal_data_row.sampling_id = result.insertId
    //         myResolve(result.insertId); // when successful
    //     });
    // });
    
    // "Consuming Code" (Must wait for a fulfilled Promise)
    // insertSamplingPromise.then(
    //     function(value) { 
    //         connection.query('INSERT INTO clinical_data SET ?', clicinal_data_row, function(err) {
    //             if (err) throw err;
    //             mainWindow.send('storePatientResponse', value)
    //         });
    //     },
    //     function(error) { 
    //         /* code if some error */ 
    //         console.log(error)
    //     }
    // );

});

let header = `Timestamp;MQ2_ADC;MQ3_ADC;MQ4_ADC;MQ5_ADC;MQ6_ADC;MQ7_ADC;MQ8_ADC;MQ9_ADC;MQ135_ADC;TEMPERATURE;HUMIDITY;MQ2_PPM_LPG;MQ2_PPM_CO;MQ2_PPM_SMOKE;MQ2_PPM_ALCOHOL;MQ2_PPM_CH4;MQ2_PPM_H2;MQ2_PPM_PROPANE;MQ3_PPM_ALCOHOL;MQ3_PPM_BENZINE;MQ3_PPM_CH4;MQ3_PPM_C0;MQ3_PPM_HEXANE;MQ3_PPM_LPG;MQ4_PPM_ALCOHOL;MQ4_PPM_CH4;MQ4_PPM_CO;MQ4_PPM_H2;MQ4_PPM_LPG;MQ4_PPM_SMOKE;MQ5_PPM_ALCOHOL;MQ5_PPM_CH4;MQ5_PPM_CO;MQ5_PPM_H2;MQ5_PPM_LPG;MQ6_PPM_ALCOHOL;MQ6_PPM_CH4;MQ6_PPM_CO;MQ6_PPM_H2;MQ6_PPM_LPG;MQ7_PPM_ALCOHOL;MQ7_PPM_CH4;MQ7_PPM_CO;MQ7_PPM_H2;MQ7_PPM_LPG;MQ8_PPM_ALCOHOL;MQ8_PPM_CH4;MQ8_PPM_CO;MQ8_PPM_H2;MQ8_PPM_LPG;MQ9_PPM_CH4;MQ9_PPM_CO;MQ9_PPM_LPG;MQ135_PPM_ACETON;MQ135_PPM_ALCOHOL;MQ135_PPM_CO;MQ135_PPM_CO2;MQ135_PPM_NH4;MQ135_PPM_TOLUOL;\n`

let content = header

ipcMain.on('recording', (event, data, time) => {
    
    if(time == 0)
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
    console.log("HAPUSSS")
    startResponse = clearInterval(startResponse)
})

ipcMain.on('pompaOn', () => {
    console.log('pompa ON')
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }
    // rpio.open(11, rpio.OUTPUT, rpio.LOW);
    // rpio.write(11, rpio.HIGH);

    //PythonShell.PythonShell.run('pompa-on.py', options, function (err, results) {
      //  if (err) throw err
      //  console.log(results)
   // })
})

ipcMain.on('pompaOff', () => {
    console.log('pompa OFF')
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }
    //  rpio.open(11, rpio.OUTPUT, rpio.LOW);
    //  rpio.write(11, rpio.LOW);

    //PythonShell.PythonShell.run('pompa-off.py', options, function (err, results) {
      //  if (err) throw err
      //  console.log(results)
   // })
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
