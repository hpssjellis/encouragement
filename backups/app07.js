
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
        index : global.myRecieveIndex ,
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
     global.myResponse0 = '<h2>My Next '+myMaxArray+' Addresses: </h2>' + '<pre id="myPre01">'+JSON.stringify(myGenAddress, null, 3)+'</pre>' + '<hr>';  // hopefully this is global

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
     global.myResponse1 += '<h2>Send a small amount of tokens to: </h2>' + '<pre id="myPre01">'+JSON.stringify(myGenAddress, null, 3)+'</pre>' + '<hr>';  // hopefully this is global
     if (global.myReceiveAddress == myGenAddress){
        console.log('No change your recieve address is still: ' + myGenAddress )
        global.myResponse1 += 'No change your recieve address is still: ' + myGenAddress + '<br>'
     } else {
        console.log('Cool a change has occured and your new address is: ' + myGenAddress )
        global.myResponse1 += 'Cool a change has occured and your new address is: ' + myGenAddress+'<hr>'
     }
     global.myReceiveAddress = myGenAddress


//////////////////////////////////////// find out the previous index



         let myNewIndex = global.myArrayOfAddresses.indexOf(global.myReceiveAddress)
          console.log('The index is: '+myNewIndex)
          for (myLoop=global.myRecieveIndex ; myLoop < myNewIndex; myLoop++){   // loop from old address index to index before unused address
             console.log(myLoop)
             myCheckTransactionUsingAddress(global.myArrayOfAddresses[myLoop])
          }

         global.myRecieveIndex =  myNewIndex    // change old address index to new address index

         myLoadAddressesFromSeed(mySeed)      // reset main array of addresses



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
       console.log(' ')
       console.log(response[0].address)
       console.log(response[0].value)
       console.log(' ')
      // global.myResponse2 = '<h2>2.2-fetch-hello.js</h2>' + '<pre id="myPre01">'+JSON.stringify(response, null, 3)+'</pre>' + '<hr>';  // hopefully this is global
       global.myResponse2 += 'response[0].address: '+  response[0].address   + '<br>response[0].value: '+ response[0].value + '<br>';  // hopefully this is global
       if (response[0].value == 0  ){ global.myResponse2 += 'Sorry no comment for you!<hr>'}
       if (response[0].value > 0  && response[0].value < 10  ){ global.myResponse2 += 'You will have a great day! <hr>'}
       if (response[0].value >= 10 ){ global.myResponse2 += 'Good luck you may need it today! <hr>'}
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
     }, 40000);   // end setInterval






app.get('/', function(req, res) {
   let myCombined = `
       <meta http-equiv="refresh" content="10"/>
       <h3 align=center>IOTA Good Karma Reverse Pyschology Encouragment </h3>
       Send a few IOTA to the below mentioned address <br>
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
