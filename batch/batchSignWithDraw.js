const fs = require('fs');
let withdrawList = JSON.parse(fs.readFileSync('../context/withdraw/withNonce.json'));

let privateKey = require('../Accounts/privateKey.js');
let withdrawDeposit = require('../transactions/withdrawDeposit.js');
let nonce = withdrawList.nonce;
let dataArray = [];
let password = '1111111111';
let fromKey = new privateKey(withdrawList.from,password);

if(fromKey.AKey)
{
    if(withdrawList.withdraw && withdrawList.withdraw.length)
    {
        for(var i=0;i<withdrawList.withdraw.length;i++,nonce++)
        {
            let item =withdrawList.withdraw[i];
            let newSend = new withdrawDeposit(withdrawList.from,item.to,nonce);
            let data = newSend.sign(fromKey.AKey);
            dataArray.push(data);
        }
    }
}
else
{
    console.log('password is error or something wrong!');
}

fs.writeFileSync('../context/withdraw/signTx.json',JSON.stringify(dataArray,null,2),"utf8");
console.log('Signed transaction data has been written in file ./withDrawsignTx.json');
process.exit();