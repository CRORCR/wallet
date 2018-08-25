let web3 = require('../web3/initweb3.js');
const fs = require('fs');
let config = require('../config.js');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let refundList = JSON.parse(fs.readFileSync('../context/refund/refund.json'));

if(fs.existsSync('../context/refund/refund.json')){
    let refund_send = JSON.parse(fs.readFileSync('../context/refund/refund.json'));
    if(refund_send && refund_send.refund)
        refundList.refund = refund_send.refund;
}

let manUtil = require('manchain-util');
web3.man = new manUtil.web3Man(web3);
web3.eth.getTransactionCount(refundList.from,function (err,result) {
    if(!err)
    {
        console.log(result);
        refundList.nonce = result;
        let OTALoop = new ASyncLoopStack(1);
        OTALoop.EndFunc = function () {
            fs.writeFileSync('../context/refund/withNonce.json',JSON.stringify(refundList,null,4),"utf8");
            process.exit();
        }
        OTALoop.run();
    }
    else{
        console.log(err.message);
        process.exit();
    }
})