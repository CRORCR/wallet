let TokenSend = require("../interface/transaction.js").TokenSend;
let depositContract = require("../interface/contract.js").DepositContract;
class valiDeposit extends TokenSend
{
    constructor(from,to,node,amount,nonce)
    {
        super(from,null,nonce);
        this.Contract = new depositContract();
        this.trans.setTo(to);
        this.trans.setGas(600000);
        this.trans.setValue(amount.getWei());
        this.trans.setData(this.Contract.getData(node));
    }
}
module.exports = valiDeposit;