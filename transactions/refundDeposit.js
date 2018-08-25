let TokenSend = require("../interface/transaction.js").TokenSend;
let refundContract = require("../interface/contract.js").RefundContract;
class RefundDeposit extends TokenSend
{
    constructor(from,to,nonce)
    {
        super(from,null,nonce);
        this.Contract = new refundContract();
        this.trans.setTo(to);
        this.trans.setGas(600000);
        this.trans.setData(this.Contract.getData());
    }
}
module.exports = RefundDeposit;