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
   - gasPrice : Set your transactions gasPrice

## How to batch signed transaction data and send

        $ cd context
   ### First: prepare sendList.json, deposit.json ,minerdeposit.json ,withdraw.json and refund.json
   
   ####sendList.json [necessary]
   
   - from : The transaction from adress.
   - normal: Normal Matrix coin transaction list.
   - For example:
   
           {
             "from": "0xa3fa369696c73f58e9f3828a9a193cf46268cd21",
             "normal": [
               {
                 "to": "0x05731be759bc9b4900d4ba5e68173d9306017526",
                 "amount": 100
               }
             ]
           }

      #### deposit.json [optional]

      - refund :pay the validator deposit
      - For example:

              {
                 "deposit": [
                     {
                       "to": "0x000000000000000000000000000000000000000A",
                       "nodeID": "0xe5c8b3e655b6ce31c73330be8d653036c0e22d063dcf108910a748368a98fc843e6a8ae949884f55835e73c73beae182210e257c494d5071d91bfe18376cf8fa",
                       "amount": 100000
                     }
                 ]
              }

      #### withdraw.json [optional]

      - refund :withdraw transaction
      - For example:

            {
              "withdraw": [
                {
                  "to": "0x000000000000000000000000000000000000000A"
                }
              ]
            }

   #### refund.json [optional]
   
   - refund :refund of deposit transaction
   - For example:

           {
             "refund": [
               {
                 "to": "0x000000000000000000000000000000000000000A"
               }
             ]
           }

### second: Connect web3 and run `node initSendList.js`
       
   - Set the truth nonce.
   - The result file is "WithNonce.json"

### third: run `node batchSign.js`
            
   - Sign the transactions list.
   - The result file is 'signTx.json'

### finally: Connect web3 and run `node batchRawSendTrans.js`

   - Send the signed transactions list.
   - The transaction hash result file is 'transHash.json'