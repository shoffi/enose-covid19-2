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

    insert  = async (sampling_data) => {
        
        fs.readFile(this.path, 'utf8',(err, jsonString) => {
            console.log(jsonString)
            try {
                let data = JSON.parse(jsonString)
                data.push(sampling_data)
                fs.writeFileSync(this.path, JSON.stringify(data));
            } catch (error) {
                let data = []
                data.push(sampling_data)
                fs.writeFileSync(this.path, JSON.stringify(data));
            }
        })
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