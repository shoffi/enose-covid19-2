const cron = require('node-cron');


cron.schedule('* * * * * *',  function() {
  var exec = require('child_process').exec;
  var child = exec(' mysqldump -u root -praspberry sensor > sensor.sql');
});

cron.schedule('* * * * * *',  function() {
  var exec = require('child_process').exec;
  var child = exec(' pv /home/pi/Desktop/raspinode/sensor.sql | mysql -h 34.101.214.113 -u root -p raspberry -D sensor');
  console.log("running migrating data");
});

//cron.schedule('* * * * * *',  function() {
//  console.log("running migrating data");
//});