const fs = require('fs');
const csv = require('csv-parser');
const Web3 = require('web3');

const args = process.argv;

var web3 = new Web3();
var eth = web3.eth;

/* Inicializa conexão com o node local */
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.defaultAccount = eth.accounts[0];

if (typeof args[2] == 'undefined') {
    console.log('Missing parameter: file.csv (file format: email,wallet,abc)');
    process.exit(0)
}else {
    var inputFilePath = args[2];
}    
    

/* TESTNET ABC - Anti Bureaucracy Coin TESTNET */
var abcAddress = '0xeec0de4a3ebb0233b10f255da9cb8057205744ea';
var abcAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_vanishQty","type":"uint256"}],"name":"vanishToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_issueQty","type":"uint256"}],"name":"issueNew","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_target","type":"address"},{"name":"_freeze","type":"bool"}],"name":"freezeAccount","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_target","type":"address"},{"indexed":false,"name":"_frozen","type":"bool"}],"name":"FrozenFunds","type":"event"}];
var abcContract = web3.eth.contract(abcAbi)
var abc = abcContract.at(abcAddress)

var stream = csv({
  raw: false,     // do not decode to utf-8 strings
  separator: ',', // specify optional cell separator
  quote: '"',     // specify optional quote character
  escape: '"',    // specify optional escape character (defaults to quote value)
  newline: '\n',  // specify a newline character
  strict: true,    // require column length match headers length
  headers: ['EMAIL', 'WALLET', 'ENTRIES'] // Specifing the headers
});

var totalDistributed = 0;
var totalUsers = 0;
var invalidWallet = [];

fs.createReadStream(inputFilePath)
.pipe(stream)
.on('data', function(data){
    try {
        earnedAbc = data.ENTRIES*100000000;
        if (web3.isAddress(data.WALLET)){
            console.log("email: " + data.EMAIL + ", wallet: " + data.WALLET + ", ABC: "+ earnedAbc);
            // abc.transfer(data.WALLET,earnedAbc, {from: web.eth.accounts[0]})
            totalDistributed += earnedAbc;
            totalUsers += 1;
        } else {
            invalidWallet.push({"email":data.EMAIL, "wallet":data.WALLET});
        }
        
    }
    catch(err) {
        console.log(err);
    }
})
.on('end',function(){
    console.log('Default account $ETH balance: ' + web3.fromWei(eth.getBalance(web3.eth.defaultAccount)) + ' eth');
    console.log('ABC Total Supply: '+ abc.totalSupply()/(100000000) + ' ABC');
    console.log('Total ABC Distributed: ', totalDistributed/100000000 );
    console.log('Total users: ' + totalUsers );
    console.log('Invalid wallets: ' + JSON.stringify(invalidWallet));
});

