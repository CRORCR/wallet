let web3 = require('../web3/initweb3.js');
const fs = require('fs');
let config = require('../config.js');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let sendList = JSON.parse(fs.readFileSync('../context/sendList/send.json'));
var per = process.argv.splice(2);
/*
if (!fs.existsSync('../context/sendList/send.json') && !fs.existsSync('../context/sendList/sendList.json')) {
    console.log("file does not exits");
    process.exit();
}
let sendLastTime = fs.lstatSync('../context/sendList/send.json').mtimeMs;
let sendListLastTime = fs.lstatSync('../context/sendList/sendList.json').mtimeMs;

if (sendLastTime - sendListLastTime > 0) {
    let send = JSON.parse(fs.readFileSync('../context/sendList/send.json'));
    if (send && send.normal) sendList.normal = send.normal;
} else {
    let normal_send = JSON.parse(fs.readFileSync('../context/sendList/sendList.json'));
    if (normal_send && normal_send.normal) sendList.normal = normal_send.normal;
}
*/
if( per && per.indexOf("extra")!=-1){
    console.log("extra");
    let send = JSON.parse(fs.readFileSync('../context/sendList/sendList.json'));
    if (send && send.normal) sendList.normal = send.normal;
}else{
    console.log("basic");
    let normal_send = JSON.parse(fs.readFileSync('../context/sendList/send.json'));
    if (normal_send && normal_send.normal) sendList.normal = normal_send.normal;
}
let manUtil = require('matrix-util');
web3.man = new manUtil.web3Man(web3);
web3.eth.getTransactionCount(sendList.from, function (err, result) {
    if (!err) {
        console.log(result);
        sendList.nonce = result;
        let OTALoop = new ASyncLoopStack(1);
        OTALoop.EndFunc = function () {
            fs.writeFileSync('../context/sendList/withNonce.json', JSON.stringify(sendList, null, 4), "utf8");
            process.exit();
        };
        OTALoop.run();
    }
    else {
        console.log(err.message);
        process.exit();
    }
});
