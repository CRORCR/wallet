const fs = require('fs');
let web3 = require('../web3/initweb3.js');
let ASyncLoopStack = require('./ASyncLoopStack.js');
let transArray = JSON.parse(fs.readFileSync('../context/signTx.json'));
let transLoop = new ASyncLoopStack(1);
transLoop.Array = transArray;
let tranHashArray = [];
//一次发送多少条数据
// let num=200
//多久发送一次
// let timeSend=1000
// let t1 = new Date().getTime()
// let count =0
// let numSend=0
transLoop.EachFunc = function (param,item,index) {
    // count++
    // for(;;){
    //     if (count<num){
    //         break
    //     }
    //     var t2=new Date().getTime()
    //     if (t2 - t1 >= timeSend) {
    //         t1=t2
    //         console.log("count",count)
    //         count=0
    //         console.log("t2",t2)
    //         break
    //     }
    // }
    web3.eth.sendRawTransaction(item,function (err,result) {
        if(!err)
        {
            // numSend++
            // console.log(numSend);
            console.log(result);
            tranHashArray.push(result);
            transLoop.stepNext();
        }
        else
        {
            console.log(err.message);
            tranHashArray.push('');
            transLoop.stepNext();
        }
    })
};
transLoop.EndFunc = function () {
    console.log("send Transaction complete!");
    fs.writeFileSync('../context/transHash.json',JSON.stringify(tranHashArray,null,2),"utf8");
    console.log('transHash transaction data has been written in file ./transHash.json');
    process.exit();
};
transLoop.run();