// destroy the online build by the next comment. remove to work

var express = require('express');



var app = express();



app.get('/', function(req, res) {
   let myCombined = `
       Cool this works <br> and this as well
   
   
   
   `


   res.send(myCombined);

});





// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);
