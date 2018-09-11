const fs = require('fs');
let sendList = JSON.parse(fs.readFileSync('./send.json'));
let lengthArray=1;
// let dataArray = [];
if(fs.existsSync('./send.json')){
    let normal_send = JSON.parse(fs.readFileSync('./send.json'));
    amountSr=normal_send.normal[0];
    for(var i=1;i<lengthArray;i++){
        sendList.normal.push(amountSr);
    }
    // sendList.normal=dataArray
    fs.writeFileSync('../context/sendList/send.json',JSON.stringify(sendList,null,4),"utf8");
}
