var fs = require('fs');
var csv = require('csv-parser')


var inputFilePath = "originalmy-3-years-abc-bounty-program_2018-07-29_03-24-49-winners - Pivot Table 1.csv"

var stream = csv({
  raw: false,     // do not decode to utf-8 strings
  separator: ',', // specify optional cell separator
  quote: '"',     // specify optional quote character
  escape: '"',    // specify optional escape character (defaults to quote value)
  newline: '\n',  // specify a newline character
  strict: true,    // require column length match headers length
  headers: ['EMAIL', 'WALLET', 'ENTRIES'] // Specifing the headers
});

fs.createReadStream(inputFilePath)
.pipe(stream)
.on('data', function(data){
    try {
        console.log("Email: "+data.EMAIL);
        console.log("Wallet is: "+data.WALLET);
        console.log("Total ABC: "+data.ENTRIES);

        //perform the operation
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    console.log('All wallets parsed')
});

