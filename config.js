const config = {
    version: '1.0.0',
    keyStorePath : 'D:/BlockChanGeth/chaindata/keystore/',
    gasPrice : 2,
    RingSignMixNum : 6,
    ipcPath : "\\\\.\\pipe\\geth.ipc",
};

module.exports = config;

/*
linux配置

    keyStorePath : '/lcq/BlockChanGeth/chaindata/keystore/',
    ipcPath : "/lcq/BlockChanGeth/chaindata/geth.ipc",

 */