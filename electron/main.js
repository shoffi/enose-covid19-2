const { app, BrowserWindow, ipcMain, electron } = require('electron');
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
    
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }
    
    //PythonShell.PythonShell.run('hello.py', options, function (err, results) {
        //if (err) throw err
        //console.log(results[0])
    //})
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
        fever       :   input[0][0],
        flu         :   input[1][0],
        sore_throat :   input[2][0],
        cough       :   input[3][0],
        diff_breath :   input[4][0],
        nausea      :   input[5][0],
        headache    :   input[6][0],
        watery_eyes :   input[7][0],
        diarrhea    :   input[8][0],

        hypertension            :   input[9][0],
        diabetes_mellitus       :   input[10][0],
        immune_disorder         :   input[11][0],
        heart_disease           :   input[12][0],
        kidney_disease          :   input[13][0],
        liver_disease           :   input[14][0],
        astma                   :   input[15][0],
        cancer                  :   input[16][0],
        tuberkulosis            :   input[17][0],
        respiratory_disease     :   input[18][0],
        cardiovascular_disease  :   input[19][0],
    }

    console.log(pengambilan)

    connection.query('INSERT INTO pengambilan SET ?', pengambilan, function(err, result, fields) {
        if (err) throw err;
        mainWindow.send('storePatientResponse', result.insertId)
    });
});

ipcMain.on('start', (event, pengambilan_id, totalTime) => {
    console.log('starting.... ' + pengambilan_id)
    console.log('totalTime =======> ' + totalTime)
    
    let options = {
        scriptPath: path.join(__dirname,"../python/")
    }

    let counter = 1
    let limit = totalTime
    
    let startResponse = setInterval(function () {
        
        if(counter == limit){
            clearInterval(startResponse)
        }

        counter++

        PythonShell.PythonShell.run('enose-dummy.py', options, function (err, results) {
            if (err) throw err
            
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

            console.log(enose)

            const documentsDataPath = app.getPath('documents')
            let fileName =  documentsDataPath + '/enose-covid19/' + pengambilan_id + '.csv'
            fs.appendFile(fileName, `${pengambilan_id};${data[0]};${data[1]};${data[2]};${data[3]};${data[4]};${data[5]};${data[6]}\n`, (err) => {
                if (err) throw err;
            });

            connection.query('INSERT INTO enose SET ?', enose, function(err, result, fields) {
                if (err) throw err;
            });

            mainWindow.send('startResponse', results[0])
        })
    }, 1000)
    
    
});

ipcMain.on('getPengaturan', () => {
    let { proses1, proses2, proses3 } = store.get('config');
    let result = [proses1, proses2, proses3]
    mainWindow.send('getPengaturanResponse', result)
})

ipcMain.on('updatePengaturan', (event, input) => {
    let { proses1, proses2, proses3 } = input;
    store.set('config', { proses1, proses2, proses3 });
})
