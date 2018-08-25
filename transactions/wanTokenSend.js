let TokenSend = require("../interface/transaction.js").TokenSend;
let manContract = require("../interface/contract.js").manContract;
let ownCreateOTAAddress = require("../interface/OTAAddress.js").ownCreateOTAAddress;
class manTokenSend extends TokenSend
{
    constructor(from,to,tokenAddress,CoinAmount,nonce)
    {
        super(from,tokenAddress,nonce);
        this.Contract = new manContract(tokenAddress);
        this.trans.setData(this.Contract.getData(to,CoinAmount));
    }
}
module.exports = manTokenSend;