const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const PythonShell = require('python-shell');
const url = require('url');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const mysql = require('mysql');
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
    let { rumahSakit } = store.get('config');
    mainWindow.send('mountedResponse', rumahSakit)
})

ipcMain.on('connect', () => {
    console.log('connecting....') 
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }
    
    PythonShell.PythonShell.run('hello.py', options, function (err, results) {
        if (err) throw err
        console.log(results[0])
    })
});

ipcMain.on('disconnect', () => {
    message = `Disconnected!`
    mainWindow.send('disconnectResponse', message)
});

ipcMain.on('storePatient', (event, input, detailPatient) => {
    
    let pengambilan = {
        rs_id       :   1,
        nurse_id    :   detailPatient.nurse_id,
        room_id     :   detailPatient.ruang_id,
        patient_id  :   detailPatient.patient_id,
        fever       :   input[0][0],
        flu         :   input[1][0],
        sore_throat :   input[2][0],
        cough       :   input[3][0],
        diff_breath :   input[4][0],
        nausea      :   input[5][0],
        headache    :   input[6][0],
        watery_eyes :   input[7][0],
        diarrhea    :   input[8][0],
    }
    
    let last_id

    connection.query('INSERT INTO pengambilan SET ?', pengambilan, function(err, result, fields) {
        if (err) throw err;

        console.log(result.insertId);
        last_id = result.insertId
    });
    
    let response = {
        id: last_id
    }

    mainWindow.send('storePatientResponse', response)
});

ipcMain.on('start', (pengambilan_id) => {
    const parser = new Readline()

    ArduinoPort.pipe(parser)
    ArduinoPort.flush()

    const calibrationPromise = new Promise((resolve, reject) => {
        ArduinoPort.write('1')
        parser.on('data', (data) => {
            console.log(data)
            dataArray = data.split(";")
            
            let sensors = {
                pengambilan_id  :   pengambilan_id,
                MQ2_LPG         :   dataArray[0],
                MQ2_CO          :   dataArray[1],
                MQ2_SMOKE       :   dataArray[2],
                MQ2_ALCOHOL     :   dataArray[3],
                MQ2_CH4         :   dataArray[4],
                MQ2_H2          :   dataArray[5],
                MQ2_PROPANE     :   dataArray[6],
            };

            connection.query('INSERT INTO enose SET ?', sensors, function(err, result, fields) {
                if (err) throw err;
                console.log(result)
            });

            resolve('done')
        })
    })

    calibrationPromise.then( (successMessage) => {
        parser.on('data', function(data){
            mainWindow.send('startResponse', data)
        })
    } )
});
