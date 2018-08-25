let TokenSend = require("../interface/transaction.js").TokenSend;
let withdrawContract = require("../interface/contract.js").WithdrawContract;
class withdrawDeposit extends TokenSend
{
    constructor(from,to,nonce)
    {
        super(from,null,nonce);
        this.Contract = new withdrawContract();
        this.trans.setTo(to);
        this.trans.setGas(600000);
        this.trans.setData(this.Contract.getData());
    }
}
module.exports = withdrawDeposit;