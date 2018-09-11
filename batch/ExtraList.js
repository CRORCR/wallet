const rlp = require('rlp');
const fs = require('fs');
let web3 = require('../web3/initweb3.js');
let privateKey = require('../Accounts/privateKey.js');
let Tx = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');

class TxData {
    constructor() {
        this.nonce = 0;
        this.gasPrice = 0;
        this.gas = 0;
        this.to = 0;
        this.value = 0;
        this.input = 0;
        this.extra = []; //Extra
    }

    setNonce(nonce) {
        this.nonce = nonce;
    }

    setGasPrice(gasPrice) {
        this.gasPrice = gasPrice;
    }

    setGas(gas) {
        this.gas = gas;
    }

    setTo(to) {
        this.to = to;
    }

    setValue(value) {
        this.value = value;
    }

    setInput(input) {
        this.input = input;
    }

    setExtra(ex) {
        this.extra.push(ex);
    }
}

class Extra {
    constructor() {
        this.txType = 0;
        this.lockHeight = 0;
        this.extra_to = []; //extraTo
    }

    setTxType(txType) {
        this.txType = txType;
    }

    setLockHeight(lockHeight) {
        this.lockHeight = lockHeight;
    }

    setExtraTo(extraTo) {
        this.extra_to.push(extraTo)
    }
}

class TxTo {
    constructor() {
        this.to = null;
        this.value = 0;
        this.input = 0;
    }

    setTo(to) {
        this.to = to;
    }

    setValue(value) {
        this.value = value;
    }

    setInput(input) {
        this.input = input;
    }
}

function init() {
    txData.setNonce(0);
    txData.setGasPrice(1);
    txData.setGas(2);
    txData.setTo("123");
    txData.setValue("234");
    txData.setInput("date");

    var extra = new Extra();
    extra.setTxType("345");
    extra.setLockHeight(7);

    var txTo = new TxTo();
    txTo.setTo("234");
    txTo.setValue(10);
    txTo.setInput("234");

    extra.setExtraTo(txTo);
    txData.setExtra(extra)
}

// init();
// setParameter();

let temp = [];
let send = [];
function setParameter(txdata, extraList, tem) {
    temp.push(txdata.nonce);
    send.push(txdata.nonce);
    temp.push(txdata.gasPrice);
    send.push(txdata.gasPrice);
    temp.push(txdata.gas);
    send.push(txdata.gas);
    temp.push(txdata.to);
    send.push(txdata.to);
    temp.push(txdata.value);
    send.push(txdata.value);
    temp.push(txdata.input);
    send.push(txdata.input);
    for (var i = 0; i < extraList.length; i++) {
        var temp1 = [];
        var maxtemp1 = [];
        temp1.push(0);
        temp1.push(0);
        var tempTo = [];
        for (var j = 0; j < tem.length; j++) {
            var temp2 = [];
            temp2.push(tem[j].to);
            temp2.push(tem[j].value);
            temp2.push(tem[j].input);
            tempTo.push(temp2)
        }
        temp1.push(tempTo);
        maxtemp1.push(temp1);
        send.push(temp1);
        temp.push(maxtemp1);
    }
    temp.push(10);
    temp.push(0);
    temp.push(0);
   // var v = rlp.encode(temp);
  // console.log("0x" + v.toString('hex'));

  //  console.log("send:", temp);
    return ethUtil.rlphash(temp.slice(0,temp.length));
    // return ethUtil.rlphash(temp);
}

function SignList(msgHash, privateKey) {
    var sig = ethUtil.ecsign(msgHash, privateKey);
    sig.v += 10 * 2 + 8 + 128;

    send.splice(6, 0, sig.v, sig.r, sig.s);

    var v = rlp.encode(send);
    // console.log("v",v)
    // console.log("temp:", send);
    return "0x" + v.toString('hex');
};

exports.SetParameter = setParameter;
exports.TxData = TxData;
exports.Extra = Extra;
exports.TxTo = TxTo;
exports.SignList = SignList;