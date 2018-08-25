let TokenSend = require("../interface/transaction.js").TokenSend;
let minerDepositContract = require("../interface/contract.js").MinerDepositContract;
class minerDeposit extends TokenSend
{
    constructor(from,to,node,amount,nonce)
    {
        super(from,null,nonce);
        this.Contract = new minerDepositContract();
        this.trans.setTo(to);
        this.trans.setGas(600000);
        this.trans.setValue(amount.getWei());
        this.trans.setData(this.Contract.getData(node));
    }
}
module.exports = minerDeposit;