let keyStore = require("./keyStore.js");
let manUtil = require('manchain-util');
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
            return manUtil.computeWaddrPrivateKey(OTAAddress, this.AKey, this.BKey);
        }
    }
}