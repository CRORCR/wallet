const fs = require('fs');
let withdrawOrRefundList = JSON.parse(fs.readFileSync('../context/withDrawOrRefund/withNonce.json'));
let privateKey = require('../Accounts/privateKey.js');
let withdrawDeposit = require('../transactions/withdrawDeposit.js');
let refundDeposit = require('../transactions/refundDeposit.js');
let nonce = withdrawOrRefundList.nonce;
let dataArray = [];
let config = require('../config.js');
let password = config.password;
let fromKey = new privateKey(withdrawOrRefundList.from,password);


if(fromKey.AKey)
{
    if(withdrawOrRefundList.withdraw && withdrawOrRefundList.withdraw.length)
    {
        console.log("withdraw");
        for(var i=0;i<withdrawOrRefundList.withdraw.length;i++,nonce++)
        {
            let item =withdrawOrRefundList.withdraw[i];
            let newSend = new withdrawDeposit(withdrawOrRefundList.from,item.to,nonce);
            let data = newSend.sign(fromKey.AKey);
            dataArray.push(data);
        }
    }else if(withdrawOrRefundList.refund && withdrawOrRefundList.refund.length)
    {
        console.log("refund");
        for(var i=0;i<withdrawOrRefundList.refund.length;i++,nonce++)
        {
            let item =withdrawOrRefundList.refund[i];
            let newSend = new refundDeposit(withdrawOrRefundList.from,item.to,nonce);
            let data = newSend.sign(fromKey.AKey);
            dataArray.push(data);
        }
    }
}
else
{
    console.log('password is error or something wrong!');
}

fs.writeFileSync('../context/signTx.json', JSON.stringify(dataArray, null, 2), "utf8");
console.log('Signed transaction data has been written in file ../context/signTx.json');
process.exit();
