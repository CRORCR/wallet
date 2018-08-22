let TokenSend = require("../interface/transaction.js").TokenSend;
let matrixContract = require("../interface/contract.js").matrixContract;
let ownCreateOTAAddress = require("../interface/OTAAddress.js").ownCreateOTAAddress;
class matrixTokenSend extends TokenSend
{
    constructor(from,to,tokenAddress,CoinAmount,nonce)
    {
        super(from,tokenAddress,nonce);
        this.Contract = new matrixContract(tokenAddress);
        this.trans.setData(this.Contract.getData(to,CoinAmount));
    }
}
module.exports = matrixTokenSend;