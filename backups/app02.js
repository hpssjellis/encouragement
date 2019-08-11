var express = require('express');
var app = express();


const mySeed =
  'DONOTSTOREYOURSEEDONAPUBLICGITHUBSITEASANYONECANSTEALALLYOUR9IOTATOKENSKEEPITSAFE'   //temp1 seed

global.myReceiveAddress = 'PCQHG9EGLLQVEPXCXPKKKMMFOGED9BBVYGVOQYYDSRFXAXIWFTWKXIXUDKYATNFDJHCWKKHJRFTYJCB9ZZGBDKRRFB' // This will be immediately generated


const iotaLibrary = require('@iota/core')

const iota = iotaLibrary.composeAPI({
    provider: 'https://iotanode.us:443'   // This is the main net not development
})   //  provider: 'https://nodes.devnet.thetangle.org:443'




function myGenerateAddressFromSeed(myPassedSeed){

	var options = {
		checksum: true,
		security: 2,
		index: 0     // should always return the latest address
	}


iota
  .getNewAddress(myPassedSeed, options)
  .then(myGenAddress => {
     console.log('Your address is: ' + myGenAddress )
     global.myResponse1 = '<h2>Send a small amount of tokens to: </h2>' + '<pre id="myPre01">'+JSON.stringify(myGenAddress, null, 3)+'</pre>' + '<hr>';  // hopefully this is global
     if (global.myReceiveAddress == myGenAddress){
        console.log('No change your recieve address is still: ' + myGenAddress )
        global.myResponse1 += 'No change your recieve address is still: ' + myGenAddress
     } else {
        console.log('Cool a change has occured and your new address is: ' + myGenAddress )
        global.myResponse1 += 'Cool a change has occured and your new address is: ' + myGenAddress
     }
     global.myReceiveAddress = myGenAddress
  })
  .catch(err => {
    console.log(err)
  })


}


function myCheckTransactionUsingAddress(myRAddress){
iota
  .findTransactionObjects({ addresses: [myRAddress] })
  .then(response => {
       console.log(response)
       global.myResponse2 = '<h2>2.2-fetch-hello.js</h2>' + '<pre id="myPre01">'+JSON.stringify(response, null, 3)+'</pre>' + '<hr>';  // hopefully this is global

  })
  .catch(err => {
    console.error(err)
  })

}


/////////////////////////////////// run the main app //////////////////////////////////

myGenerateAddressFromSeed(mySeed)
//myCheckTransactionUsingAddress(global.myReceiveAddress)




app.get('/', function(req, res) {
   let myCombined = `
       <h3 align=center>IOT enocuramgemnt </h3>
       `+global.myResponse1+`
       `+global.myResponse2+`


   `    // end long string
   res.send(myCombined);

});





// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);
