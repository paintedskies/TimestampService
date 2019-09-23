// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_stamp", function (req, res) {
  var date_stamp = req.params.date_stamp;
  console.log(Date.parse(1450137600000));
  if(date_stamp === ''){
    var present_time = Date.now();
    res.json({unix:present_time.getTime(), utc:present_time.toUTCString()});  
  }
  if(Number.isInteger(parseInt(date_stamp))){
    var date = new Date(parseInt(date_stamp));
     res.json({unix:date.getTime(), utc:date.toUTCString()});  
  }
  else if(!isNaN(Date.parse(date_stamp))){
    var date = new Date(date_stamp);
    res.json({unix:date.getTime(), utc:date.toUTCString()});    
     }
  else{
    res.json({"error" : "Invalid Date" });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});