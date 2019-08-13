
var express = require('express');
var app = express();


const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')



const mySeed = 'DONOTSTOREYOURSEEDONAPUBLICGITHUBSITEASANYONECANSTEALALLYOUR9IOTATOKENSKEEPITSAFE'   //Your secret seed. All your tokens

global.myRecieveIndex = 0    // defines when to start showing the replies! Careful will not show results if above latest recive address

const myRefreshInterval = 40     // 40 seconds for the page and data to refresh

global.myReceiveAddress = 'CYM9IKWWVVTCCFKYXC9HMXISTAEDKFLLW9ABQALFNFKGZZDEKANCFSABKNNRFJRIXGZNBZQZMOBCIEUGCEMIMJWOP9' // This will be immediately generated

const myMaxArray = 12
global.myArrayOfAddresses = new Array(myMaxArray)

global.myResponse0 = ''
global.myResponse1 = ''
global.myResponse2 = ''




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
  //   global.myResponse0 = '<h2>My Next '+myMaxArray+' Addresses: </h2>' + '<pre id="myPre01">'+JSON.stringify(myGenAddress, null, 3)+'</pre>' + '<hr>';  // hopefully this is global

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
   //  global.myResponse1 += '<h2>Send a small amount of tokens to: </h2>' + '<pre id="myPre01">'+JSON.stringify(myGenAddress, null, 3)+'</pre>' + '<hr>';  // hopefully this is global
     if (global.myReceiveAddress == myGenAddress){
        console.log('No change your recieve address is still: ' + myGenAddress )
      //  global.myResponse1 += 'No change your recieve address is still: ' + myGenAddress + '<br>'
     } else {
        console.log('Cool a change has occured and your new address is: ' + myGenAddress )
      //  global.myResponse1 += 'Cool a change has occured and your new address is: ' + myGenAddress+'<hr>'
     }
     global.myReceiveAddress = myGenAddress


//////////////////////////////////////// find out the previous index



         let myNewIndex = global.myArrayOfAddresses.indexOf(global.myReceiveAddress)
         if (myNewIndex > 0){
            console.log('The index is: '+myNewIndex)
             for (myLoop=global.myRecieveIndex ; myLoop < myNewIndex; myLoop++){   // loop from old address index to index before unused address
               console.log(myLoop)
               myCheckTransactionUsingAddress(global.myArrayOfAddresses[myLoop])
             }

            global.myRecieveIndex +=  myNewIndex    // change old address index to new address index plus the old one
            global.myResponse1 += global.myResponse0
            myLoadAddressesFromSeed(mySeed)      // reset main array of addresses

       }    // if index > 0

  })
  .catch(err => {
    console.log(err)
  })


}



function myResponseToTokens(theResponse, TheMessage){

return 'Good luck you may need it today! '+TheMessage
}



function myResponseEncouraging(theResponse, TheMessage){

    const myMaxArrayNice = 7
    let myNiceArray = new Array()
    myNiceArray[0] = '0.... ' + TheMessage
    myNiceArray[1] = '1'
    myNiceArray[2] = '2........ ' + TheMessage
    myNiceArray[3] = '3'
    myNiceArray[4] = '4'
    myNiceArray[5] = '5'
    myNiceArray[6] = '6.................... '+ TheMessage

    let myRand = Math.floor(Math.random() * myMaxArrayNice) ;

   return  myNiceArray[myRand]
}

function myResponseOk(theResponse, TheMessage){

    const myMaxArrayNice = 7
    let myNiceArray = new Array()
    myNiceArray[0] = '0.... ' + TheMessage
    myNiceArray[1] = '1'
    myNiceArray[2] = '2........ ' + TheMessage
    myNiceArray[3] = '3'
    myNiceArray[4] = '4'
    myNiceArray[5] = '5'
    myNiceArray[6] = '6.................... '+ TheMessage

    let myRand = Math.floor(Math.random() * myMaxArrayNice) ;

   return  myNiceArray[myRand]
}

function myResponseNasty(theResponse, TheMessage){

    const myMaxArrayNice = 7
    let myNiceArray = new Array()
    myNiceArray[0] = '0.... ' + TheMessage
    myNiceArray[1] = '1'
    myNiceArray[2] = '2........ ' + TheMessage
    myNiceArray[3] = '3'
    myNiceArray[4] = '4'
    myNiceArray[5] = '5'
    myNiceArray[6] = 'Life is '+TheMessage+' what happens to you while you’re busy making other plans –John Lennon'

    let myRand = Math.floor(Math.random() * myMaxArrayNice) ;

   return  myNiceArray[myRand]
}





async function myCheckTransactionUsingAddress(myRAddress){
iota
  .findTransactionObjects({ addresses: [myRAddress] })
  .then(response => {



   // console.log('response.length' )
  //  console.log(response.length )
  //  console.log(' ')



  for (myResponseLoop = 0; myResponseLoop < response.length; myResponseLoop++) {

   let myBig = response[myResponseLoop].signatureMessageFragment
   // console.log('Encoded message:')
   // console.log(myBig)
   // console.log(' ')

   // console.log(myBig.length)
    if (myBig.length % 2 == 0){ console.log('EVEN')} else {
       myBigEven = myBig.substring(0, myBig.length - 1);
     //  console.log('Now even at '+myBigEven.length)
       myBig = myBigEven
    }   // end even odd loop


    const myMessage = Converter.trytesToAscii(myBig)

      // global.myResponse2 = '<h2>2.2-fetch-hello.js</h2>' + '<pre id="myPre01">'+JSON.stringify(response, null, 3)+'</pre>' + '<hr>';  // hopefully this is global
      // global.myResponse2 += 'response['+myResponseLoop+'].address: '+  response[myResponseLoop].address   + '<br>response['+myResponseLoop+'].value: '+ response[myResponseLoop].value + '<br> message: '+ myMessage + '<br>';  // hopefully this is global



     //  myResponseToTokens(response[myResponseLoop].value, myMessage)

       global.myResponse2 += '<tr><td>'+myMessage+'</td>'
       global.myResponse2 += '<td>'+response[myResponseLoop].value+'</td>'

       if (response[myResponseLoop].value == 0  ){                                                 global.myResponse2 += '<td>Sorry no comment for you!</td>'  }
       if (response[myResponseLoop].value >= 1  && response[myResponseLoop].value < 1000  ){       global.myResponse2 += '<td>'+ myResponseEncouraging(response[myResponseLoop].value, myMessage) + '</td>'  }
       if (response[myResponseLoop].value >= 1000  && response[myResponseLoop].value < 1000000  ){ global.myResponse2 += '<td>'+ myResponseOk(response[myResponseLoop].value, myMessage) + '</td>'  }
       if (response[myResponseLoop].value == 1000000 ){                                            global.myResponse2 += '<td>'+ myResponseEncouraging(response[myResponseLoop].value, myMessage) + '</td>'  }
       if (response[myResponseLoop].value >  1000000 ){                                            global.myResponse2 += '<td>'+ myResponseNasty(response[myResponseLoop].value, myMessage) + '</td>'  }

     //  if (response[myResponseLoop].value == 0  ){ global.myResponse2 += 'Sorry no comment for you!<hr>'}
     //  if (response[myResponseLoop].value > 0  && response[myResponseLoop].value < 10  ){ global.myResponse2 += 'You will have a great day! <hr>'}
     //  if (response[myResponseLoop].value >= 10 ){ global.myResponse2 += 'Good luck you may need it today! <hr>'}


     //  global.myResponse2 += '<td>response[myResponseLoop].timestamp</td>'
       global.myResponse2 += '</tr>'


  } // end for response loop





  })
  .catch(err => {
    console.error(err)
  })

}


const myCountScript = `

function myCountDown(mySeconds){

var downloadTimer = setInterval(function(){
  document.getElementById('myDivCountdown01').innerHTML = 'Refresh in '+mySeconds + ' seconds.';
  mySeconds -= 1;
  if(mySeconds <= 0){
    clearInterval(downloadTimer);
    document.getElementById('myDivCountdown01').innerHTML = 'Finished'
  }
}, 1000);

}

`




/////////////////////////////////// run the main app //////////////////////////////////


//getLastTransaction(mySeed)


//myGenerateAddressFromSeed(mySeed)      // called using an interval
//myCheckTransactionUsingAddress(global.myReceiveAddress)   // called inside myGenerateAddressFromSeed

//myGenerateAddressFromSeed(mySeed)

myLoadAddressesFromSeed(mySeed)

myGenerateAddressFromSeed(mySeed)
let myTimer = setInterval(function(){
         myGenerateAddressFromSeed(mySeed)
}, myRefreshInterval*1000);   // end setInterval




//setTimeout(function(){

app.get('/', function(req, res) {
   let myCombined = `
       <meta http-equiv="refresh" content="`+myRefreshInterval+`"/>
       <h3 align=center>IOTA Daily Reverse Pyschology Encouragment </h3>
       For a reply here send a few IOTA using whatever wallet you have to the below mentioned address
       with a first name only in the IOTA message <br>
       <input type=text value="`+global.myReceiveAddress+`" size = "130">
       <div id="myDivCountdown01">...</div>
       <script>
       ` + myCountScript +` myCountDown(`+myRefreshInterval+`)
       </script>
       `+global.myResponse0+`
       `+global.myResponse1+`
       <table border=1>
       <tr><th>From</th><th>Tokens</th><th>Response</th></tr>
       `+global.myResponse2+`
     </table>

   `    // end long string
   res.send(myCombined);

});

//}, 10000);    // just a bit of time for the program to get started



// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);
