let num =1

for(var i=0;i<100000;i++){
    num++
    function myfunc(Interval){
        console.log("myfunc ",num);
    }
    var myInterval=setInterval(myfunc,1000,"Interval");
    // function stopInterval(){ clearTimeout(myInterval);
    // myInterval.unref();
    // }
    // setTimeout(stopInterval,5000);
}

