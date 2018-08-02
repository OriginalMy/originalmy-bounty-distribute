const fs = require('fs');
const csv = require('csv-parser');
const Web3 = require('web3');

const SimpleNodeLogger = require('simple-node-logger');
var opts = {
    logFilePath:'logs/checking-'+Date.now()+'.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
}
var log = SimpleNodeLogger.createSimpleLogger(opts);
log.info("---------------------");

/* Write JSON to file */
function saveJSONFile(array, file) {
    var json = JSON.stringify(array);
    fs.writeFileSync(file, json, 'utf8', callback);

}
function callback(err) {
    log.error(err);
}

/* Test command line parameter */
const args = process.argv;
if (typeof args[2] == 'undefined') {
    console.log('Missing parameter: file.csv (file format: email,wallet,abc)');
    process.exit(1);
} else {
    var inputFilePath = args[2];
}    

/* Initialize all web3 connections to Ethereum */
var web3 = new Web3();
var eth = web3.eth;

web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
if(!web3.isConnected()) {
    console.log("Web3 ethereum provider not found. Check if node is running on localhost with RPC enabled");
    process.exit(1);
}
web3.eth.defaultAccount = eth.accounts[0];    

/* Network selector: select network and load the proper ABC ERC20 Contract */
var networkId = web3.version.network
switch (networkId) {
    case '1':
        /* MAINNET ABC - Anti Bureaucracy Coin MAINNET */
        var abcAddress = '0xAfd75caff5c1d402cbF3692e289775438dF6a9F0';
        var abcAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_vanishQty","type":"uint256"}],"name":"vanishToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_issueQty","type":"uint256"}],"name":"issueNew","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_target","type":"address"},{"name":"_freeze","type":"bool"}],"name":"freezeAccount","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_target","type":"address"},{"indexed":false,"name":"_frozen","type":"bool"}],"name":"FrozenFunds","type":"event"}];
        var abc = web3.eth.contract(abcAbi).at(abcAddress);
        log.info("Selected network: Mainnet");
        break
    case '4':
        /* TESTNET ABC - Anti Bureaucracy Coin TESTNET */
        var abcAddress = '0xeec0de4a3ebb0233b10f255da9cb8057205744ea';
        var abcAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_vanishQty","type":"uint256"}],"name":"vanishToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_issueQty","type":"uint256"}],"name":"issueNew","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_target","type":"address"},{"name":"_freeze","type":"bool"}],"name":"freezeAccount","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_target","type":"address"},{"indexed":false,"name":"_frozen","type":"bool"}],"name":"FrozenFunds","type":"event"}];
        var abc = web3.eth.contract(abcAbi).at(abcAddress);
        log.info("Selected network: Testnet");
        break
    default:
      console.log('Cant continue. This is an unknown network.');
      process.exit(1);
}

/* Format the stream of csv file with all participants 
    File format: email,wallet,entries
*/
var stream = csv({
  raw: false,     // do not decode to utf-8 strings
  separator: ',', // specify optional cell separator
  quote: '"',     // specify optional quote character
  escape: '"',    // specify optional escape character (defaults to quote value)
  newline: '\n',  // specify a newline character
  strict: true,    // require column length match headers length
  headers: ['EMAIL', 'WALLET', 'ENTRIES'] // Specifing the headers
});


/* Initialize accounting some vars */
var balance = 0;
var totalDistributed = 0;
var totalUsers = 0;
var totalInvalidWallets = 0;
var totalDidntReceived = 0;
var invalidWallet = [];
var validWallet = [];
var doesntReceiveWallet = [];

/* Here the game starts */

log.info("Starting a new bounty verification");
log.info("Filename: " + inputFilePath);

fs.readFile('json/valid.json', 'utf8', function readFileCallback(err, data) {

    if (err) {
        log.error(err);
    } else {
        validWallet = data ? JSON.parse(data) : [];

        fs.createReadStream(inputFilePath)
        .pipe(stream)
        .on('data', function(data){
            try { 
                if (web3.isAddress(data.WALLET)){
                    balance = (abc.balanceOf(data.WALLET)/100000000);
                    if (balance > 0){;
                        log.info("Received: email: " + data.EMAIL + ", wallet: " + data.WALLET + ", ABC: "+ balance)
                        totalDistributed += balance;
                        totalUsers += 1;
                        validWallet.push({ "email": data.EMAIL, "wallet": data.WALLET });
                    } else {
                        totalDidntReceived += 1;
                        doesntReceiveWallet.push({"email":data.EMAIL, "wallet":data.WALLET});
                        log.info("Didn't receive: email: " + data.EMAIL + ", wallet: " + data.WALLET)
                    };

                } else {
                        totalInvalidWallets += 1;
                        invalidWallet.push({"email":data.EMAIL, "wallet":data.WALLET});
                        log.warn('Invalid wallet: ' + data.WALLET + ' email: ' + data.EMAIL);
                    
                }
        
            }
            catch(err) {
                log.error(err);
            }
        })
        .on('end',function(){

            /* Almost finishing, lets log something */
            saveJSONFile(invalidWallet, 'json/check-invalid.json');
            saveJSONFile(doesntReceiveWallet, 'json/check-errors.json');
            saveJSONFile(validWallet, 'json/check-received.json');
            log.info('Total ABC Distributed: ', totalDistributed/100000000 );
            log.info('Received: ' + totalUsers );
            log.warn('Didnt receive: ' + totalDidntReceived );
            log.warn('Invalid wallets: ' + totalInvalidWallets);
            log.info("Finishing the bounty checking");
            log.info("Filename: " + inputFilePath);
            log.info("---------------------");
        });
    };
});



/* END */