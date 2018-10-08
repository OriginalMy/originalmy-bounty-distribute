const fs = require('fs');
const csv = require('csv-parser');
const Web3 = require('web3');
const SimpleNodeLogger = require('simple-node-logger');
var path = require("path");
const json2csv = require('json2csv').parse;

var configFile = './config.json';
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
if (config.stop == true) {
    console.log("config.json stop == true");
    process.exit(1);
}    

/* Creates a folder if it not exists */
var date = Date.now();
var dirName = './' + date;
if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
}


/* Initializes Logger */
var opts = {
    logFilePath: dirName + '/distributing-' + date + '.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
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
if (!web3.isConnected()) {
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
        var abcAbi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_vanishQty", "type": "uint256" }], "name": "vanishToken", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "frozenAccount", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_issueQty", "type": "uint256" }], "name": "issueNew", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_target", "type": "address" }, { "name": "_freeze", "type": "bool" }], "name": "freezeAccount", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_initialAmount", "type": "uint256" }, { "name": "_tokenName", "type": "string" }, { "name": "_decimalUnits", "type": "uint8" }, { "name": "_tokenSymbol", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_target", "type": "address" }, { "indexed": false, "name": "_frozen", "type": "bool" }], "name": "FrozenFunds", "type": "event" }];
        var abc = web3.eth.contract(abcAbi).at(abcAddress);
        log.info("Selected network: Mainnet");
        break

    case '4':

        /* TESTNET ABC - Anti Bureaucracy Coin TESTNET */
        var abcAddress = '0xeec0de4a3ebb0233b10f255da9cb8057205744ea';
        var abcAbi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_vanishQty", "type": "uint256" }], "name": "vanishToken", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "frozenAccount", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_issueQty", "type": "uint256" }], "name": "issueNew", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_target", "type": "address" }, { "name": "_freeze", "type": "bool" }], "name": "freezeAccount", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_initialAmount", "type": "uint256" }, { "name": "_tokenName", "type": "string" }, { "name": "_decimalUnits", "type": "uint8" }, { "name": "_tokenSymbol", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_target", "type": "address" }, { "indexed": false, "name": "_frozen", "type": "bool" }], "name": "FrozenFunds", "type": "event" }];
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
var stream2 = csv({
    raw: false,     // do not decode to utf-8 strings
    separator: ',', // specify optional cell separator
    quote: '"',     // specify optional quote character
    escape: '"',    // specify optional escape character (defaults to quote value)
    newline: '\n',  // specify a newline character
    strict: true,    // require column length match headers length
    headers: ['EMAIL', 'WALLET', 'ENTRIES'] // Specifing the headers
});


/* Initialize accounting some vars */
var totalDistributed = 0;
var totalUsers = 0;
var totalInvalidWallets = 0;
var totalDidntReceived = 0;
var csvAbcTotal = 0;
var txTotal = 0;
var invalidWallet = [];
var receivedWallet = [];
var didntReceiveWallet = [];
var transferTx = [];
var counter = 0;

var initialBalance = eth.getBalance(web3.eth.defaultAccount);
try {
    var walletAbcBalance = abc.balanceOf(web3.eth.defaultAccount)/100000000;
} catch (e){
    console.log("Cant get wallet ABC balance" + e);
    process.exit(1);
}

config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
if (config.stop == true) {
    console.log("config.json stop == true");
    process.exit(1);
}  

/* Here the game starts */
log.info("Starting a new bounty distribution");
log.info("Filename: " + inputFilePath);

var countAbc = fs.createReadStream(inputFilePath)
    .pipe(stream2)
    .on('data', function (data) {
        csvAbcTotal += parseInt(data.ENTRIES);
        txTotal += 1;
    })
    .on('end', function () {
        log.info("Wallet ABC balance: " + parseInt(walletAbcBalance));
        log.info("Expected ABC to distribute: " + parseInt(csvAbcTotal));
        if (parseInt(walletAbcBalance) < parseInt(csvAbcTotal)){
            console.log("Not enough ABC. Wallet need to be funded with ABC to continue");
            console.log("Expected : " + parseInt(csvAbcTotal) + " Balance: " + parseInt(walletAbcBalance));
            var abcNeeded = (parseInt(csvAbcTotal) - parseInt(walletAbcBalance));
            console.log("Funding needed: " + abcNeeded);
            process.exit(1);
        }
        if (parseInt((config.gas * config.gasPrice) * txTotal) > parseInt(initialBalance)){
            console.log("Not enough ETH. Wallet need to be funded with ETH to continue");
            console.log("Expected : " + parseInt(web3.fromWei((config.gas * config.gasPrice) * txTotal)) + " Balance: " + parseInt(web3.fromWei(initialBalance)));
            var ethNeeded = parseInt((config.gas * config.gasPrice) * txTotal) - parseInt(initialBalance);
            console.log("Funding needed: " + web3.fromWei(ethNeeded));
            process.exit(1);
        }
    });




/* valid.json has already sent wallet list */
fs.readFile('json/received.json', 'utf8', function readFileCallback(err, data) {

    if (err) {
        log.error(err);
    } else {

        receivedWallet = data ? JSON.parse(data) : [];


        /* Read the file from command line */
        var is = fs.createReadStream(inputFilePath)
            .pipe(stream)
            .on('data', function (data) {
                try {
                    counter += 1;
                    config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
                    /* Validate if already sent, if the wallet is valid and then the transfer */
                    if (receivedWallet.findIndex(function (item) { return item.wallet === data.WALLET }) < 0 && config.stop == false) {

                        earnedAbc = data.ENTRIES * 100000000;

                        if (web3.isAddress(data.WALLET)) {
                            /*
                                gasPrice High: 36681296496, gasPrice suggested: 5000000000, gasPrice Ok: 20000000000
                                Verify https://etherscan.io/gasTracker and https://ethgasstation.info/ before sending.
                                Optional setting: eth.gasPrice * 5 
                                Default gas: 52649                       
                            */
                            try {
                                abc.transfer(data.WALLET, earnedAbc, { from: web3.eth.defaultAccount, gas: config.gas, gasPrice: config.gasPrice }, function (err, hash) {

                                    if (!err) {

                                        totalDistributed += earnedAbc;
                                        totalUsers += 1;
                                        transferTx.push({ "wallet": data.WALLET, "tx": hash });
                                        receivedWallet.push({ "email": data.EMAIL, "wallet": data.WALLET, "entries": data.ENTRIES });
                                        log.info("Index: " + counter + " Sent OK! email: " + data.EMAIL + ", wallet: " + data.WALLET + ", ABC: " + data.ENTRIES);
                                        log.info("Wallet: " + data.WALLET + ", Tx: " + hash);

                                    } else {

                                        totalDidntReceived += 1;
                                        didntReceiveWallet.push({ "email": data.EMAIL, "wallet": data.WALLET, "entries": data.ENTRIES });
                                        log.warn('Couldnt send to wallet: ' + data.WALLET + ' email: ' + data.EMAIL);
                                        log.error("It was not possible to send ABC because of an error");
                                        log.error(err);

                                    };

                                });

                            } catch (err) {

                                totalDidntReceived += 1;
                                didntReceiveWallet.push({ "email": data.EMAIL, "wallet": data.WALLET, "entries": data.ENTRIES });
                                log.warn('Couldnt send to wallet: ' + data.WALLET + ' email: ' + data.EMAIL);
                                log.error("It was not possible to send ABC because of an error");
                                log.error(err);

                            };

                            /*  
                                Ethereum has a serious problem when managing a lot of transactions 
                                It is a little trick to delay the execution at this point, but to 
                                work inside the createReadStream is needed to pause the stream and 
                                then resume after timeout.
                                https://github.com/nodejs/node-v0.x-archive/issues/3767#issuecomment-9210653
                            */
                            this.pause();
                            setTimeout(function () {
                                is.resume();
                            }, config.delay*1000);
                            


                        } else {

                            totalInvalidWallets += 1;
                            invalidWallet.push({ "email": data.EMAIL, "wallet": data.WALLET, "entries": data.ENTRIES });
                            log.warn('Invalid wallet: ' + data.WALLET + ' email: ' + data.EMAIL);
                        }
                    } else {

                        totalDidntReceived += 1;
                        //didntReceiveWallet.push({ "email": data.EMAIL, "wallet": data.WALLET, "entries": data.ENTRIES });
                        log.info("Already received! email: " + data.EMAIL + ", wallet: " + data.WALLET);
                    }
                }
                catch (err) {

                    log.error(err);
                }
            })
            .on('end', function () {


                /* Almost finishing, lets save everything */
                saveJSONFile(invalidWallet, dirName + '/invalid-' + date + '.json');
                saveJSONFile(didntReceiveWallet, dirName + '/errors-' + date + '.json');
                saveJSONFile(transferTx, dirName + '/transactions-' + date + '.json');
                saveJSONFile(receivedWallet, dirName + '/received-' + date + '.json');
                saveJSONFile(receivedWallet, 'json/received.json');

                /* Put the things together */
                fs.copyFile('./' + inputFilePath, './' + date + '/' + path.basename(inputFilePath), (err) => {
                    if (err) throw err;
                    log.info(inputFilePath + ' copied to ' + date + '/' + path.basename(inputFilePath));
                });
                if (didntReceiveWallet.length > 0){
                    var csv = json2csv(didntReceiveWallet);
                    fs.writeFile(dirName + '/didnt-receive-' + date + '.csv', csv, function(err) {
                        if (err) throw err;
                        //console.log(csv);
                    });    
                }
                
                /* to get job done, just log a little */
                log.info("---------------------");
                log.info('Wallet Balance: ' + web3.fromWei(initialBalance) + ' eth');
                log.info('ABC wallet balance: ' + abc.balanceOf(web3.eth.defaultAccount) / (100000000) + ' ABC');
                log.info('Total ABC Distributed: ', totalDistributed / 100000000);
                log.info('Total users: ' + totalUsers);
                log.warn('Invalid wallets total: ' + totalInvalidWallets + ' : ' + JSON.stringify(invalidWallet));
                log.warn('Problem while sending: ' + totalDidntReceived + ' : ' + JSON.stringify(didntReceiveWallet));
                log.info("Finishing the bounty distribution");
                log.info("Filename: " + inputFilePath);
                log.info("---------------------");

            });
    };
});

/* END */