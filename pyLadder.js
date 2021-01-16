const vLines = 5;
const nodes = 4;

const cvX = 800;
const cvY = 500;
const scaleRate = 0.18;

const baseX1 = cvX*(scaleRate);
const baseY1 = cvY*(scaleRate);
const baseX2 = cvX*(1-scaleRate);
const baseY2 = cvY*(1-scaleRate);

const dx = (baseX2-baseX1) / vLines;
const dy = (baseY2-baseY1) / nodes;
const nodeRadius = 10;

const piasX = dx/2;
const piasY = dy/2;

var arr = [];
for(let i=0;i<vLines;i++)
{
    arr.push([])
    for(let j=0;j<nodes;j++)
    {
        arr[i].push(0);
    }
}
//console.log(arr);

//generating how many horizontal line in Column
function randInt(n){          
    var res = Math.floor(Math.random()*n);
    return 0;
}

function genBranchArray(a,i){
    var tmp = new Array(a[i].length);
    tmp.fill(0);
    for(let j=0;j<tmp.length;j++){
       tmp[j] = a[i][j]; 
    }
    
    var randTimes = randInt(2)+1;
    for(let j=0;j<randTimes;j++){
        var rd = randInt(nodes);
        while(tmp[rd]!==0){
            rd = randInt(nodes);
            console.log(rd);
        }
        tmp[rd] = 1;
    }
    
  
    for(let j=0;j<tmp.length;j++){
        if(tmp[j] == 1){
          a[i+1][j] = -1;
          a[i][j] = 1;
        }
        else if(tmp[j] == 0){
            a[i+1][j] = 0;
            a[i][j] = 0;
        }
        else if(tmp[j] == -1){
            a[i+1][j] = 0;
            a[i][j] = -1;
        }
    }
  
    return a;
}

//x座標,y頭座標,y尾座標
function drawLineV(x,y1,y2){    
    stroke(104, 170, 247,192);
    strokeWeight(8);
    line(x,y1,x,y2);
}

//y座標,x座標,x線段長,第 i-th Col 的橫線 
function drawLineH(y,x1,dx,i){  
    stroke(104, 170, 247,192);
    strokeWeight(8);
    line(x1+i*dx,y,x1+(i+1)*dx,y);
}

//x座標,y座標,半徑
function drawNode(x,y,r){      
    noStroke();
    fill(104, 170, 247,128);
    ellipse(x,y,r,r);
}


function setup() {
    createCanvas(cvX, cvY);
    arr = genBranchArray(arr,0);
    console.log(arr);
    
}

function draw() {
    background(50);


    for(let i=0;i<vLines;i++){
        //vLines
        //pias (bias) 偏移
        //base 基準位置
        drawLineV(piasX+baseX1+i*dx,baseY1,baseY2);

        //最後一條vLines的橫線不畫
        if(i===vLines-1)continue;
        //hLines
        for(let j=0;j<nodes;j++){
            //j*dy 同一個Col的第j個node畫出橫線
            if(arr[i][j]!==1)continue;
            drawLineH(piasY+baseY1+j*dy,piasX+baseX1,dx,i);
        }

    }


    //nodes
    for(let i=0;i<vLines;i++){
        for(let j=0;j<nodes;j++)
        {
            drawNode(piasX+baseX1+i*dx,piasY+baseY1+j*dy,nodeRadius);
            //drawNode(baseX1+i*dx,baseY1+j*dy,nodeRadius);
        }
    }

}