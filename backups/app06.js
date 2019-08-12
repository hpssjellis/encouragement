
var express = require('express');
var app = express();


const mySeed =
  'DONOTSTOREYOURSEEDONAPUBLICGITHUBSITEASANYONECANSTEALALLYOUR9IOTATOKENSKEEPITSAFE'   //temp1 seed

global.myReceiveAddress = 'QNLY9LSWBFKMXTJSYJQOJXDJ99HMXHLJYLOLCV9ONOUUZQZAXIURIKGZ9GJ9UBPKUAUVTWZDGPZGST9DDBCKKMR9PD' // This will be immediately generated
global.myRecieveIndex = 0

const myMaxArray = 12
global.myArrayOfAddresses = new Array(myMaxArray)

const iotaLibrary = require('@iota/core')

const iota = iotaLibrary.composeAPI({
    provider: 'https://iotanode.us:443'   // This is the main net not development
})   //  provider: 'https://nodes.devnet.thetangle.org:443'


function myLoadAddressesFromSeed(myPassedSeed){

	var options = {
		checksum: true,
		security: 2,
        index : 0,
        total : myMaxArray
       // total : 1   //,
		//index: 0     // if 0 it should always return the latest address
        // wierd if index is less than the present unused it generates the unused. If index is
        // more than the unused it generates the index.
	}


iota
  .getNewAddress(myPassedSeed, options)
  .then(myGenAddress => {
     console.log('Your address is: ' + myGenAddress )
     global.myResponse0 = '<h2>All'+myMaxArray+' Addresses: </h2>' + '<pre id="myPre01">'+JSON.stringify(myGenAddress, null, 3)+'</pre>' + '<hr>';  // hopefully this is global

     global.myArrayOfAddresses = myGenAddress

  })
  .catch(err => {
    console.log(err)
  })


}










async function myGenerateAddressFromSeed(myPassedSeed){

	var options = {
		checksum: true,
		security: 2
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


//////////////////////////////////////// find out the previous index


     //for (myLoop=0; myLoop<myMaxArray; myLoop++){
         let myNewIndex = global.myArrayOfAddresses.indexOf(global.myReceiveAddress)
          console.log('The index is: '+myNewIndex)
          for (myLoop=global.myRecieveIndex ; myLoop < myNewIndex; myLoop++){   // loop from old address index to index before unused address
             console.log(myLoop)
             myCheckTransactionUsingAddress(global.myArrayOfAddresses[myLoop])
          }

         global.myRecieveIndex =  myNewIndex    // change old address index to new address index

    // }



     //myCheckTransactionUsingAddress(global.myReceiveAddress)   // find last index
  })
  .catch(err => {
    console.log(err)
  })


}


async function myCheckTransactionUsingAddress(myRAddress){
iota
  .findTransactionObjects({ addresses: [myRAddress] })
  .then(response => {
       console.log(response)
       console.log(response[0].value)
      // global.myResponse2 = '<h2>2.2-fetch-hello.js</h2>' + '<pre id="myPre01">'+JSON.stringify(response, null, 3)+'</pre>' + '<hr>';  // hopefully this is global
       global.myResponse2 += 'response[0].address: '+  response[0].address   + 'response[0].value: '+ response[0].value + '<hr>';  // hopefully this is global

  })
  .catch(err => {
    console.error(err)
  })

}







/////////////////////////////////// run the main app //////////////////////////////////


//getLastTransaction(mySeed)


//myGenerateAddressFromSeed(mySeed)      // called using an interval
//myCheckTransactionUsingAddress(global.myReceiveAddress)   // called inside myGenerateAddressFromSeed



myLoadAddressesFromSeed(mySeed)

myGenerateAddressFromSeed(mySeed)
let myTimer = setInterval(function(){
         myGenerateAddressFromSeed(mySeed)
     }, 100000);   // end setInterval






app.get('/', function(req, res) {
   let myCombined = `
       <h3 align=center>IOT enocuramgemnt </h3>
       `+global.myResponse0+`
       `+global.myResponse1+`
       `+global.myResponse2+`


   `    // end long string
   res.send(myCombined);

});





// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);
