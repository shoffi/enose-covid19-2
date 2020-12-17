const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Log {
    constructor (opts) {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, opts.configName + '.json');
        this.data = parseDataFile(this.path, opts.defaults);
    }

    get(key) {
        return this.data[key];
    }
    
    set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }

    insert (sampling_data) {
        // let data = JSON.parse(this.path)
        // let data = JSON.stringify(sampling_data)
        console.log(`data ${this.path}`)

        // fs.appendFile( this.path, data, (err) => {
        //     if (err) throw err;
        // });
    }
}

function parseDataFile(filePath, defaults) {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch(error) {
      // if there was some kind of error, return the passed in defaults instead.
      return defaults;
    }
}
  
// expose the class
module.exports = Log