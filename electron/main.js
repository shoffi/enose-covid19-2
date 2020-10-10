const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const mysql = require('mysql')
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
            preload: path.join(__dirname, 'preload.js'),
        },
    });

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

ipcMain.on('connect', () => {
    SerialPort.list()
    .then(ports => {
        let message = ''
        let done = false
        let count = 0
        let allports = ports.length
        ports.forEach(function(port) {
            count = count+1
            pm  = port.manufacturer
        
            if (typeof pm !== 'undefined' && pm.includes('arduino')) {
                const path = port.path
                ArduinoPort = new SerialPort(path, { baudRate: 115200 })
                
                ArduinoPort.on('open', function(){
                    console.log(`connected! arduino is now connected at port ${path}`)
                    message = `connected! arduino is now connected at port ${path}`
                    const status = true
                    mainWindow.send('connectResponse', message, status)
                })

                done = true
            }
        
            if(count === allports && done === false){
                console.log(`can't find any arduino`)
                message = `can't find any arduino`
                const status = false
                mainWindow.send('connectResponse', message, status)
            }
        });
    });
});

ipcMain.on('disconnect', () => {
    ArduinoPort.close()
    message = `Disconnected!`
    mainWindow.send('disconnectResponse', message)
});

ipcMain.on('start', () => {
    const parser = new Readline()

    ArduinoPort.pipe(parser)
    ArduinoPort.flush()

    const calibrationPromise = new Promise((resolve, reject) => {
        ArduinoPort.write('1')
        parser.on('data', (data) => {
            // console.log(data)
            dataArray = data.split(";")
            
            let sensors = {
                Timestamp   :   '',
                MQ2_LPG     :   dataArray[0],
                MQ2_CO      :   dataArray[1],
                MQ2_SMOKE   :   dataArray[2],
                MQ2_ALCOHOL :   dataArray[3],
                MQ2_CH4     :   dataArray[4],
                MQ2_H2      :   dataArray[5],
                MQ2_PROPANE :   dataArray[6],
            };

            // let query = connection.query('INSERT INTO enose SET ?', sensors, function(err, result) {
            //     console.log(err)
            // });

            // console.log(query.sql);

            resolve('done')
        })
    })

    calibrationPromise.then( (successMessage) => {
        parser.on('data', function(data){
            mainWindow.send('startResponse', data)
        })
    } )
});