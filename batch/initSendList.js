let web3 = require('../web3/initweb3.js');
const fs = require('fs');
let config = require('../config.js');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let sendList = JSON.parse(fs.readFileSync('./sendList.json'));

if(fs.existsSync('./deposit.json')){
    let deposit_send = JSON.parse(fs.readFileSync('./deposit.json'));
    if(deposit_send && deposit_send.deposit)
    {
        sendList.deposit = deposit_send.deposit;
    }
}
if(fs.existsSync('./sendList_refund.json')) {
    let sendList_refund = JSON.parse(fs.readFileSync('./sendList_refund.json'));
    if (sendList_refund && sendList_refund.refund) {
        sendList.refund = sendList_refund.refund;
    }
}

let matrixUtil = require('matrix-util');
web3.matrix = new matrixUtil.web3Wan(web3);
web3.eth.getTransactionCount(sendList.from,function (err,result) {
    if(!err)
    {
        console.log(result);
        sendList.nonce = result;
        let OTALoop = new ASyncLoopStack(1);
        OTALoop.EndFunc = function () {
            fs.writeFileSync('./sendListWithNonce.json',JSON.stringify(sendList,null,4),"utf8");
            process.exit();
        }
        OTALoop.run();
    }
    else{
        console.log(err.message);
        process.exit();
    }
})