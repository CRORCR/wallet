let web3 = require('../web3/initweb3.js');
const fs = require('fs');
let config = require('../config.js');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let sendList = JSON.parse(fs.readFileSync('../context/sendList/sendList.json'));

if(fs.existsSync('../context/sendList/sendList.json')){
    let normal_send = JSON.parse(fs.readFileSync('../context/sendList/sendList.json'));
    if(normal_send && normal_send.normal)
    {
        sendList.normal = normal_send.normal;
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
            fs.writeFileSync('../context/sendList/withNonce.json',JSON.stringify(sendList,null,4),"utf8");
            process.exit();
        }
        OTALoop.run();
    }
    else{
        console.log(err.message);
        process.exit();
    }
})
