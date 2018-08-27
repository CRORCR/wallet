const fs = require('fs');
let sendList = JSON.parse(fs.readFileSync('../context/vali/withNonce.json'));

let valiDepositSend = require('../interface/transaction.js').ValiDepositSend;
let privateKey = require('../Accounts/privateKey.js');
let CoinAmount = require('../interface/Amount.js').CoinAmount;
let nonce = sendList.nonce;
let dataArray = [];
let password = '1111111111';
let fromKey = new privateKey(sendList.from,password);

if(fromKey.AKey)
{
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
}
else
{
    console.log('password is error or something wrong!');
}

fs.writeFileSync('../context/vali/signTx.json',JSON.stringify(dataArray,null,2),"utf8");
console.log('Signed transaction data has been written in file ./signTx.json');
process.exit();