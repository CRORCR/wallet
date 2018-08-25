const fs = require('fs');
let refundList = JSON.parse(fs.readFileSync('../context/refund/withNonce.json'));

let privateKey = require('../Accounts/privateKey.js');
let refundDeposit = require('../transactions/refundDeposit.js');
let nonce = refundList.nonce;
let dataArray = [];
let password = '1111111111';
let fromKey = new privateKey(refundList.from,password);

if(fromKey.AKey)
{
    if(refundList.refund && refundList.refund.length)
    {
        for(var i=0;i<refundList.refund.length;i++,nonce++)
        {
            let item =refundList.refund[i];
            let newSend = new refundDeposit(refundList.from,item.to,nonce);
            let data = newSend.sign(fromKey.AKey);
            dataArray.push(data);
        }
    }
}
else
{
    console.log('password is error or something wrong!');
}

fs.writeFileSync('../context/refund/signTx.json',JSON.stringify(dataArray,null,2),"utf8");
console.log('Signed transaction data has been written in file ../context/refundsignTx.json');
process.exit();