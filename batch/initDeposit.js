let web3 = require('../web3/initweb3.js');
const fs = require('fs');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let sendMiner = JSON.parse(fs.readFileSync('../context/deposit/miner.json'));
let sendValidator = JSON.parse(fs.readFileSync('../context/deposit/validator.json'));
let sendList=sendMiner
if (!fs.existsSync('../context/deposit/miner.json') && !fs.existsSync('../context/deposit/validator.json')) {
    console.log("file does not exits");
    process.exit();
}

let sendMTime = fs.lstatSync('../context/deposit/miner.json').mtimeMs;
let sendVTime = fs.lstatSync('../context/deposit/validator.json').mtimeMs;

if (sendMTime - sendVTime > 0) {
    let deposit_send = JSON.parse(fs.readFileSync('../context/deposit/miner.json'));
    console.log("miner");
    if(deposit_send && deposit_send.deposit) sendList.deposit = deposit_send.deposit;
}else{
    let  deposit_send = JSON.parse(fs.readFileSync('../context/deposit/validator.json'));
    sendList=deposit_send;
    console.log("validator");
    if(deposit_send && deposit_send.deposit) sendList.deposit = deposit_send.deposit;

}


let manUtil = require('matrix-util');
web3.man = new manUtil.web3Man(web3);
web3.eth.getTransactionCount(sendList.from,function (err,result) {
    if(!err)
    {
        console.log(result);
        sendList.nonce = result;
        let OTALoop = new ASyncLoopStack(1);
        OTALoop.EndFunc = function () {
            fs.writeFileSync('../context/deposit/withNonce.json',JSON.stringify(sendList,null,4),"utf8");
            process.exit();
        };
        OTALoop.run();
    }
    else{
        console.log(err.message);
        process.exit();
    }
});