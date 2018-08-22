let keyStore = require("./keyStore.js");
let matrixUtil = require('matrix-util');
module.exports = class privateKey{
    constructor(address,password)
    {
        let priKey = keyStore.getPrivateKey(address,password);
        if(priKey)
        {
            this.AKey = priKey[0];
//            this.BKey = priKey[1];
        }
        else
        {
            this.AKey = null;
//            this.BKey = null;
        }
    }
    getOTAPrivateKey(OTAAddress) {
        if (this.AKey) {
            return matrixUtil.computeWaddrPrivateKey(OTAAddress, this.AKey, this.BKey);
        }
    }
}