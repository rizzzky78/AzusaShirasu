var mainStr = '1234567891234567',
    vis = mainStr.slice(-4),
    countNum = '';

for(var i = (mainStr.length)-4; i>0; i--){
    countNum += '*';
}

console.log(countNum+vis);