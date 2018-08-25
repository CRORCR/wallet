let web3 = require('../web3/initweb3.js');
class IContract{
    constructor()
    {
        this.Abi = null;
        this.func = null;
        this.tokenAddress = null;
    }
    setAbi(Abi)
    {
        this.Abi = Abi;
    }
    setTokenAddress(tokenAddress)
    {
        if(/^0x[0-9a-f]{40}$/i.test(tokenAddress))
        {
            this.tokenAddress = tokenAddress;
        }
    }
    setFunc(funcName)
    {
        this.func = funcName;
    }
    getFuncInterface()
    {
        if(this.Abi && this.tokenAddress)
        {
            var standardtokenContract = web3.eth.contract(this.Abi);
            let TokenInstance = standardtokenContract.at(this.tokenAddress);
            if(TokenInstance[this.func])
            {
                return TokenInstance[this.func];
            }
            else
            {
                return null;
            }
        }
    }
};
var manAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_toKey","type":"bytes"},{"name":"_value","type":"uint256"}],"name":"otatransfer","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"privacyBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manport","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"initialBase","type":"address"},{"name":"baseKeyBytes","type":"bytes"},{"name":"value","type":"uint256"}],"name":"initPrivacyAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"otabalanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allomance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"receipient","type":"address"}],"name":"buyManCoin","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"otaKey","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
class manContract  extends IContract
{
    constructor(tokenAddress)
    {
        super();
        this.setTokenAddress(tokenAddress);
        this.setAbi(manAbi);
        this.setFunc('transfer');
    }
    getData(toAddress,IAmount)
    {
        let funcInterface = this.getFuncInterface();
        if(funcInterface)
        {
            return funcInterface.getData(toAddress,IAmount.getWei());
        }
    }
}
var matrixAbi = [{"constant": true,"inputs": [],"name": "getDepositList","outputs": [{"name": "","type": "address[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "addr","type": "address"}],"name": "getDepositInfo","outputs": [{"name": "","type": "uint256"},{"name": "","type": "bytes"},{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "nodeID","type": "bytes"}],"name": "valiDeposit","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [{"name": "nodeID","type": "bytes"}],"name": "minerDeposit","outputs": [],"payable": true,"stateMutability": "payable","type": "function"},{"constant": false,"inputs": [],"name": "withdraw","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "refund","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}]
let depositAddress = "0x000000000000000000000000000000000000000A";
class DepositContract extends IContract
{
    constructor()
    {
        super();
        this.setTokenAddress(depositAddress);
        this.setAbi(matrixAbi);
        this.setFunc('valiDeposit');
    }
    getData(nodeID)
    {
        let funcInterface = this.getFuncInterface();
        if(funcInterface)
        {
            return funcInterface.getData(nodeID);
        }
    }
}

class MinerDepositContract extends IContract
{
    constructor()
    {
        super();
        this.setTokenAddress(depositAddress);
        this.setAbi(matrixAbi);
        this.setFunc('minerDeposit');
    }
    getData(nodeID)
    {
        let funcInterface = this.getFuncInterface();
        if(funcInterface)
        {
            return funcInterface.getData(nodeID);
        }
    }
}
class WithdrawContract extends IContract
{
    constructor()
    {
        super();
        this.setTokenAddress(depositAddress);
        this.setAbi(matrixAbi);
        this.setFunc('withdraw');
    }
    getData()
    {
        let funcInterface = this.getFuncInterface();
        if(funcInterface)
        {
            return funcInterface.getData();
        }
    }
}
class RefundContract extends IContract
{
    constructor()
    {
        super();
        this.setTokenAddress(depositAddress);
        this.setAbi(matrixAbi);
        this.setFunc('refund');
    }
    getData()
    {
        let funcInterface = this.getFuncInterface();
        if(funcInterface)
        {
            return funcInterface.getData();
        }
    }
}
let coinSCAbi = [{"constant":false,"type":"function","stateMutability":"nonpayable","inputs":[{"name":"OtaAddr","type":"string"},{"name":"Value","type":"uint256"}],"name":"buyCoinNote","outputs":[{"name":"OtaAddr","type":"string"},{"name":"Value","type":"uint256"}]},{"constant":false,"type":"function","inputs":[{"name":"RingSignedData","type":"string"},{"name":"Value","type":"uint256"}],"name":"refundCoin","outputs":[{"name":"RingSignedData","type":"string"},{"name":"Value","type":"uint256"}]},{"constant":false,"inputs":[],"name":"getCoins","outputs":[{"name":"Value","type":"uint256"}]}];
let contractCoinAddress = '0x0000000000000000000000000000000000000064';
class PrivacyContract extends IContract
{
    constructor()
    {
        super();
        this.setTokenAddress(contractCoinAddress);
        this.setAbi(coinSCAbi);
        this.setFunc('buyCoinNote');
    }
    getData(OTA,IAmount)
    {
        let funcInterface = this.getFuncInterface();
        if(funcInterface)
        {
            return funcInterface.getData(OTA,IAmount.getWei());
        }
    }
}
class refundOTAContract extends PrivacyContract
{
    constructor()
    {
        super();
        this.setFunc('refundCoin');
    }
    getData(ringSign,IAmount)
    {
        let funcInterface = this.getFuncInterface();
        if(funcInterface)
        {
            return funcInterface.getData(ringSign,IAmount.getWei());
        }
    }
}
let stampContractAddr = "0x00000000000000000000000000000000000000c8";
var abiDefStamp = [{"constant":false,"type":"function","stateMutability":"nonpayable","inputs":[{"name":"OtaAddr","type":"string"},{"name":"Value","type":"uint256"}],"name":"buyStamp","outputs":[{"name":"OtaAddr","type":"string"},{"name":"Value","type":"uint256"}]},{"constant":false,"type":"function","inputs":[{"name":"RingSignedData","type":"string"},{"name":"Value","type":"uint256"}],"name":"refundCoin","outputs":[{"name":"RingSignedData","type":"string"},{"name":"Value","type":"uint256"}]},{"constant":false,"type":"function","stateMutability":"nonpayable","inputs":[],"name":"getCoins","outputs":[{"name":"Value","type":"uint256"}]}];
class stampContract extends IContract
{
    constructor()
    {
        super();
        this.setTokenAddress(stampContractAddr);
        this.setAbi(abiDefStamp);
        this.setFunc('buyStamp');
    }
    getData(otaAddrStamp,IAmount)
    {
        let funcInterface = this.getFuncInterface();
        if(funcInterface)
        {
            return funcInterface.getData(otaAddrStamp,IAmount.getWei());
        }
    }
}
exports.manContract = manContract;
exports.PrivacyContract = PrivacyContract;
exports.refundOTAContract = refundOTAContract;
exports.stampContract = stampContract;
//matrix
exports.DepositContract = DepositContract;
exports.WithdrawContract = WithdrawContract;
exports.RefundContract = RefundContract;
exports.MinerDepositContract = MinerDepositContract;