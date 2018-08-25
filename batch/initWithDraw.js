let web3 = require('../web3/initweb3.js');
const fs = require('fs');
let config = require('../config.js');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let withdrawList = JSON.parse(fs.readFileSync('../context/withdraw/withdraw.json'));

if(fs.existsSync('./withdraw.json')){
    let withdraw_send = JSON.parse(fs.readFileSync('../context/withdraw/withdraw.json'));
    if(withdraw_send && withdraw_send.withdraw)
        withdrawList.withdraw = withdraw_send.withdraw;
}

let manUtil = require('manchain-util');
web3.man = new manUtil.web3Man(web3);
web3.eth.getTransactionCount(withdrawList.from,function (err,result) {
    if(!err)
    {
        console.log(result);
        withdrawList.nonce = result;
        let OTALoop = new ASyncLoopStack(1);
        OTALoop.EndFunc = function () {
            fs.writeFileSync('../context/withdraw/withNonce.json',JSON.stringify(withdrawList,null,4),"utf8");
            process.exit();
        }
        OTALoop.run();
    }
    else{
        console.log(err.message);
        process.exit();
    }
})