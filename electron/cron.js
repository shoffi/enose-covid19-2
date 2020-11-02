const cron = require('node-cron');
const Store = require('./Store.js');

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
      // 800x600 is the default size of our window
      windowBounds: { 
          width: 800, 
          height: 600 
      },
      config: {
          rumahSakit: "No Name",
          idRumahSakit: null
      },
      database: {
          host    :   'localhost',
          user    :   'root',
          password:   'adminadminhehe',
          database:   'enose'
      }
  }
});

let { host, user, password, database } = store.get('database');


cron.schedule('* * * * * *',  function() {
  var exec = require('child_process').exec;
  var child = exec(`mysqldump -u ${user} -p ${password} ${database} > sensor.sql`);
});

cron.schedule('* * * * * *',  function() {
  var exec = require('child_process').exec;
  var child = exec(' pv /home/pi/Desktop/raspinode/sensor.sql | mysql -h 34.101.214.113 -u root -p raspberry -D sensor');
  console.log("running migrating data");
});

//cron.schedule('* * * * * *',  function() {
//  console.log("running migrating data");
//});