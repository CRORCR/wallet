# matrix simple offline wallet

## Dependencies
   node > v8.x
   npm  > v5.x
## Prepare
    
    $ npm install
## How to create keyStore
    
 ### Use MatrixWalletGui
 
   - Download and install MatrixWalletGui.
   - Open MatrixWalletGui and create account.
   - Click menu File->Backup->Accounts to get the keystore directory.
 ### Use MatrixWalletGui
   
   - Download MatrixWalletGui
   - Open MatrixWalletGui and run `node createKeystore.js`
   - Run `node keyStorePath.js`  to get the keystore directory.
   
 ### Use gMatrix console client
 
   - Download gMatrix
   - Run gMatrix node and open gMatrix console client
   - Run personal.newAccount to create a keyStore.
   - The keystore directory is in gMatrix datadir.
## How to set config.js

   - keyStorePath:  Set your local keyStore path
   - ipcPath : Set your gMatrix.ipc path
   - gasPrice : Set your transactions' gasPrice
   - RingSignMixNum : Set the OTA adresses Mix number fore RingSign.
       
## How to batch signed transaction data and send

        $ cd batch
   ### First: prepare sendList.json, sendList_charge.json and sendList_refund.json
   
   ####sendList.json [necessary]
   
   - from : The transaction from adress.
   - normal: Normal Matrix coin transaction list.
   - For example:
   
           {
             "from": "0x49bd323ddd6fa686bd0a9acb2b8bf051e6534df2",
             "normal": [
               {
                 "to": "0x5d02B782497c951aF163F188208D969a4b6A9bdA",
                 "amount": 100
               }
             ]
           }
       
   #### sendList_charge.json [optional]
   
   - ChargePrivacyCoin : privacy Matrix coin transaction list
   - For example:
   
           {
             "ChargePrivacyCoin": [
               {
                 "to": "0x02f6436055b35dd2bd3df31ab9a563bbe7bc3068b0cbeae64f513d748923569df0035c4f0ba507c26b6aec4dc643a19d071f21e83058e819fa78a21fcb4cc36c40ad",
                 "facevalue": 10
               }
               ]
           }
           
   #### sendList_refund.json [optional]
   
   - refund : fefund OTA balance transaction list
   - For example:
   
           {
              "refund": [
                {
                  "OTA": "0x0203c1bd673e8e75228b408fe88f44715ae3f8304e937f5e7af7a7bde9c4b85395020007061a311c3c7519d9daf3156ad1aa8debc672835aa032c3ff1606f895b255",
                  "amount": 10
                }
                ]
           }
           

### second: Connect web3 and run `node initSendList.js`
       
   - Set the truth nonce.
   - Set the OTAset for ringSign.
   - The result file is "sendListWithNonce.json"
    

### third: run `node batchSign.js` 
   
   - Set from address password in 'batchSign.js'
   
            let password = 'Matrixglu';
            
   - Sign the transactions list.
   - The result file is 'signTx.json'
   - The Privacy OTA balance Info File is 'current Date + _OTABalance.json"
   
            For example: 2018-1-15-10-14-56_OTABalance.json
   
### finally: Connect web3 and run `node batchRawSendTrans.js`
   
   - Send the signed transactions list.
   - The transaction hash result file is 'transHash.json'
        

### Preset coin face value

10 Matrix
20 Matrix
50 Matrix
100 Matrix
200 Matrix
500 Matrix
1000 Matrix
5000 Matrix
50000 Matrix
