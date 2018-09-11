const fs = require('fs');
const TxData = require('./ExtraList.js').TxData;
const Extra = require('./ExtraList.js').Extra;
const TxTo = require('./ExtraList.js').TxTo;
const setParameter = require('./ExtraList.js').SetParameter;
const transaction = require('./ExtraList.js').Transaction;
const signList = require('./ExtraList.js').SignList;
let sendList = JSON.parse(fs.readFileSync('../context/sendList/withNonce.json'));
let privateKey = require('../Accounts/privateKey.js');
let CoinAmount = require('../interface/Amount.js').CoinAmount;
let nonce = sendList.nonce;
let dataArray = [];
let normalTrans = require('../interface/transaction.js').NormalSend;
let GWeiAmount = require("../interface/Amount.js").GWeiAmount;
let config = require('../config.js');
let password = config.password;
let fromKey = new privateKey(sendList.from, password);
let gasPrice = new GWeiAmount(config.gasPrice);

function extracted(item) {
    var data = new TxData();
    data.nonce = nonce;
    data.gasPrice = gasPrice.getWei();
    data.gas = 21000000;
    data.to = item.to;
    data.value = new CoinAmount(item.amount).getWei();
    data.input = null;

    var extraList = [];
    var extra = new Extra();
    extra.txType = 0;
    extra.setLockHeight(0);
    extraList.push(extra);

    var temp = [];
    for (var i = 0; i < item.extra_to.length; i++) {
        var txTo = new TxTo();
        txTo.setTo(item.extra_to[i].to);
        txTo.setValue(new CoinAmount(item.amount).getWei());
        txTo.input = null;
        temp.push(txTo)
    }
    return {data, extraList, extra, temp};
}

if (fromKey.AKey) {
    if (sendList.normal && sendList.normal.length  && sendList.normal[0].extra_to) {
        console.log("extra");
        for (var i = 0; i < sendList.normal.length; i++, nonce++) {
            var {data, extraList, extra, temp} = extracted(sendList.normal[i]);
            extra.extra_to = temp;
            data.extra = extra;
            let msgHash = setParameter(data, extraList, temp);
            let aloneHash = signList(msgHash, fromKey.AKey);
            dataArray.push(aloneHash);
        }
    } else if (sendList.normal && sendList.normal.length) {
        console.log("basic");
        for (var i = 0; i < sendList.normal.length; i++, nonce++) {
            let item = sendList.normal[i];
            let newSend = new normalTrans(sendList.from, item.to, new CoinAmount(item.amount), nonce);
            // console.log("sends:", newSend);
            let data = newSend.sign(fromKey.AKey);
            dataArray.push(data);
        }
    }
}
else {
    console.log('password is error or something wrong!');
}

fs.writeFileSync('../context/signTx.json', JSON.stringify(dataArray, null, 2), "utf8");
console.log('Signed transaction data has been written in file ../context/signTx.json');
process.exit();
