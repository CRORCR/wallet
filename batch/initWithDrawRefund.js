let web3 = require('../web3/initweb3.js');
const fs = require('fs');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let refundList = JSON.parse(fs.readFileSync('../context/withDrawOrRefund/refund.json'));
let withdrawList = JSON.parse(fs.readFileSync('../context/withDrawOrRefund/withdraw.json'));

let sendList = refundList;
if (!fs.existsSync('../context/withDrawOrRefund/refund.json') && !fs.existsSync('../context/withDrawOrRefund/withdraw.json')) {
    console.log("file does not exits");
    process.exit();
}

let sendRTime = fs.lstatSync('../context/withDrawOrRefund/refund.json').mtimeMs;
let sendWTime = fs.lstatSync('../context/withDrawOrRefund/withdraw.json').mtimeMs;

if (sendRTime - sendWTime > 0) {
    let refund_send = JSON.parse(fs.readFileSync('../context/withDrawOrRefund/refund.json'));
    console.log("refund");
    if (refund_send && refund_send.refund) {
        sendList.refund = refund_send.refund;
        sendList.from = refund_send.from;
    }
} else {
    let refund_send = JSON.parse(fs.readFileSync('../context/withDrawOrRefund/withdraw.json'));
    sendList = refund_send;
    console.log("withdraw");
    if (refund_send && refund_send.withdraw) {
        sendList.withdraw = refund_send.withdraw;
        sendList.from = refund_send.from;
    }
}

let manUtil = require('matrix-util');
web3.man = new manUtil.web3Man(web3);
web3.eth.getTransactionCount(sendList.from, function (err, result) {
    if (!err) {
        console.log(result);
        sendList.nonce = result;
        let OTALoop = new ASyncLoopStack(1);
        OTALoop.EndFunc = function () {
            fs.writeFileSync('../context/withDrawOrRefund/withNonce.json', JSON.stringify(sendList, null, 4), "utf8");
            process.exit();
        };
        OTALoop.run();
    }
    else {
        console.log(err.message);
        process.exit();
    }
});