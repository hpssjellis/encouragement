// destroy the online build by the next comment. remove to work

var express = require('express');



var app = express();

///////////////////////////////
// Fetch your HELLOWORLD Message
///////////////////////////////

const iotaLibrary = require('@iota/core')

const iota = iotaLibrary.composeAPI({
    provider: 'https://iotanode.us:443'

})   //  provider: 'https://nodes.devnet.thetangle.org:443'

const myReceiveAddress =
  'RJKYCCRHVRZCRZZ9AEAGCSRGUBNIHDTPBWVKQRALYHOUGTWSYWFFKMNVAWDASDLFEVDBNHRNQKLTQYZZACHJHONACW'   // temp1 recieve





iota
  .findTransactionObjects({ addresses: [myReceiveAddress] })
  .then(response => {
   // console.log(response)
       global.myResponse22 = '<h2>2.2-fetch-hello.js</h2>' + '<pre id="myPre01">'+JSON.stringify(response, null, 3)+'</pre>' + '<hr>';  // hopefully this is global

  })
  .catch(err => {
    console.error(err)
  })









app.get('/', function(req, res) {
   let myCombined = `
       <h3 align=center>IOT enocuramgemnt </h3>
       `+global.myResponse22+`


   `    // end long string
   res.send(myCombined);

});





// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);
