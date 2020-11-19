const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const modal = require('electron-modal');
const path = require('path');
const PythonShell = require('python-shell');
const url = require('url');
const mysql = require('mysql');
const fs = require('fs');
const Store = require('./Store.js');

let mainWindow;
let ArduinoPort = ''

// MySQl Connection
let connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   'adminadmin',
    database:   'enose'
})


// First instantiate the class
const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'user-preferences',
    defaults: {
        // 800x600 is the default size of our window
        windowBounds: { width: 800, height: 600 }
    }
});

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

    // mainWindow.webContents.openDevTools()

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

ipcMain.on('storePatient', (event, input, detailPatient) => {

    let pengambilan = {
        rs_id       :   1,
        nurse_id    :   detailPatient.nurse_id,
        room_id     :   detailPatient.ruang_id,
        patient_id  :   detailPatient.patient_id,

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
        c9  :   input[17][0]
    }

    console.log(pengambilan)
    mainWindow.send('storePatientResponse', 1)

    // connection.query('INSERT INTO pengambilan SET ?', pengambilan, function(err, result, fields) {
    //     if (err) throw err;
    //     mainWindow.send('storePatientResponse', result.insertId)
    // });
});

let startResponse

ipcMain.on('start', (event, pengambilan_id, totalTime) => {
    console.log('starting.... ' + pengambilan_id)
    
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }

    let counter = 1
    let limit = totalTime
    let content = "pengambilan_id;MQ2_LPG;MQ2_CO;MQ2_SMOKE;MQ2_ALCOHOL;MQ2_CH4;MQ2_PROPANE\n"
    
    startResponse = setInterval(function () {
        
        if(counter == limit){
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
                        })
                    }
                },
                (error) => {
                    console.log(error)
                }
            )

        }

        counter++

        PythonShell.PythonShell.run('enose-dummy.py', options, function (err, results) {
            if (err) throw err
            // console.log(`${results}`)
            let data = results[0].split(";")
            let enose = {
                pengambilan_id: pengambilan_id,
                MQ2_LPG     :   data[0],
                MQ2_CO      :   data[1],
                MQ2_SMOKE   :   data[2],
                MQ2_ALCOHOL :   data[3],
                MQ2_CH4     :   data[4],
                MQ2_H2      :   data[5],
                MQ2_PROPANE :   data[6], 
            }

            // console.log(enose)
            content = content + `${pengambilan_id};${data[0]};${data[1]};${data[2]};${data[3]};${data[4]};${data[5]};${data[6]}\n`
            console.log(content)

            // connection.query('INSERT INTO enose SET ?', enose, function(err, result, fields) {
            //     if (err) throw err;
            // });

            mainWindow.send('startResponse', results[0])
        })

    }, 1000)
});

ipcMain.on('stop', () => {
    console.log("HAPUSSS")
    startResponse = clearInterval(startResponse)
})

ipcMain.on('togglePompa', () => {
    console.log('TOGGLE')
    // let options = {
    //     scriptPath: path.join(__dirname,"../python/")
    // }

    // PythonShell.PythonShell.run('pompa.py', options, function (err, results) {
    //     if (err) throw err
    //     console.log(results)
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
