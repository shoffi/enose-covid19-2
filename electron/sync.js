var mysql = require('mysql');
var idlocal;
var idcloud;
var dataupdate;
var local = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "dummydb"
});

var cloud = mysql.createConnection({
    host: "34.101.214.113",
    user: "raspi",
    password: "raspberry",
    database: "dummydb"
  });

local.connect(function (err) {
    console.log(err)
  })
cloud.connect(function (err) {
    console.log(err)
  })



var localdata = local.query("SELECT id FROM dummytable ORDER BY id DESC LIMIT 1", function (err, result) {
    if (err) throw err;
    //console.log(result);
    local.query("SELECT id FROM dummytable WHERE id IN (SELECT MAX(id) FROM `dummytable`)", function (err, result) {
      if (err) throw err;
      var string=JSON.stringify(result);
      var json = JSON.parse(string);
      datalocal=result;
      //console.log(result)
      //console.log(json[0].id)
      //console.log(datalocal)
      idlocal=json[0].id
    });
});

cloud.query("SELECT id FROM dummytable ORDER BY id DESC LIMIT 1", function (err, result) {
  if (err) throw err;
  //console.log(result);
  cloud.query("SELECT id FROM dummytable WHERE id IN (SELECT MAX(id) FROM `dummytable`)", function (err, result) {
    if (err) throw err;
    var string=JSON.stringify(result);
    var json = JSON.parse(string);
    //console.log(json[0].id)
    idcloud=json[0].id
    localdata;
    if(idlocal>idcloud){
      localdata;
        //console.log(idlocal)
      console.log("Harus update");
      local.query("SELECT * FROM dummytable WHERE id > ?", idcloud, function (err, result) {
        if (err) throw err;
          //dataupdate=result
          var string=JSON.stringify(result);
          var json = JSON.parse(string);
          //console.log(json[0].id)
          selisih=idlocal-idcloud
          let ArrayData=[]
          for (let step=0; step<selisih; step++){
            let dataupdate=[]
            dataupdate.push(json[step].id)
            dataupdate.push(json[step].name)
            dataupdate.push(json[step].number)
            //dataupdate="["+json[step].id+"," +"'" +json[step].name+"'"+"," +"'"+ json[step].number+"'"+"]"
            ArrayData.push(dataupdate)
            console.log(dataupdate)  
          }
          console.log(ArrayData)
          let query = cloud.query("INSERT INTO dummytable (id, name, number) VALUES ?", [ArrayData])
          //console.log(query)
          console.log("Terupdate")
          localdata;
        });
    }
    if(idlocal==idcloud){
      console.log("sudah benar");
    }
  });
});