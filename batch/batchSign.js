const fs = require('fs');
let sendList = JSON.parse(fs.readFileSync('./sendListWithNonce.json'));

let normalTrans = require('../interface/transaction.js').NormalSend;
let privateKey = require('../Accounts/privateKey.js');
let refundOTASend = require('../transactions/refundOTASend.js');
let valiDepositSend = require('../transactions/valiDeposit.js');
let CoinAmount = require('../interface/Amount.js').CoinAmount;
let nonce = sendList.nonce;
let dataArray = [];
let password = '1111111111';
let fromKey = new privateKey(sendList.from,password);

if(fromKey.AKey)
{
    if(sendList.normal && sendList.normal.length)
    {
        for(var i=0;i<sendList.normal.length;i++,nonce++)
        {
            let item =sendList.normal[i];
            let newSend = new normalTrans(sendList.from,item.to,new CoinAmount(item.amount),nonce);
            let data = newSend.sign(fromKey.AKey);
            dataArray.push(data);
        }
    }
    if(sendList.deposit && sendList.deposit.length)
    {
        for(var i=0;i<sendList.deposit.length;i++,nonce++)
        {
            let item =sendList.deposit[i];
             let newSend = new valiDepositSend(sendList.from,item.to,item.nodeID,new CoinAmount(item.amount),nonce);
            let data = newSend.sign(fromKey.AKey);
            dataArray.push(data);
        }
    }

    if(sendList.refund && sendList.refund.length) {
        for (var i = 0; i < sendList.refund.length; i++, nonce++) {
            let item = sendList.refund[i];
            let refundOTA = new refundOTASend(sendList.from, fromKey, item.OTA, new CoinAmount(item.amount), item.OTAset, nonce);
            let data = refundOTA.sign(fromKey.AKey);
            dataArray.push(data);
        }
    }
}
else
{
    console.log('password is error or something wrong!');
}

fs.writeFileSync('./signTx.json',JSON.stringify(dataArray,null,2),"utf8");
console.log('Signed transaction data has been written in file ./signTx.json');
process.exit();