let web3 = require('../web3/initweb3.js');
const fs = require('fs');
let config = require('../config.js');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let sendList = JSON.parse(fs.readFileSync('../context/miner/deposit.json'));

if(fs.existsSync('../context/vali/deposit.json')){
    let deposit_send = JSON.parse(fs.readFileSync('../context/miner/deposit.json'));
    if(deposit_send && deposit_send.deposit)
    {
        sendList.deposit = deposit_send.deposit;
    }
}


let manUtil = require('manchain-util');
web3.man = new manUtil.web3Man(web3);
web3.eth.getTransactionCount(sendList.from,function (err,result) {
    if(!err)
    {
        console.log(result);
        sendList.nonce = result;
        let OTALoop = new ASyncLoopStack(1);
        OTALoop.EndFunc = function () {
            fs.writeFileSync('../context/miner/withNonce.json',JSON.stringify(sendList,null,4),"utf8");
            process.exit();
        }
        OTALoop.run();
    }
    else{
        console.log(err.message);
        process.exit();
    }
})