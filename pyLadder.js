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
const nodeRadius = 5;
const userRadius = 30;

//color object
const nodeRGBA = {r:104,g:170,b:247,a:128};
const userNodeRGBA = {r:252, g:83, b:123, a:255};

//bias
const piasX = dx/2;
const piasY = dy/2;

//init arr
var arr = [];
for(let i=0;i<vLines;i++)
{
    arr.push([])
    for(let j=0;j<nodes;j++)
    {
        arr[i].push(0);
    }
}


function randInt(n){          
    var res = Math.floor(Math.random()*n);
    return res;
}

//use "arr" matrix and log Branch
//(a) matrix
//(i) i-th col
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

//x座標,y座標,直徑,RGBA物件
function drawNode(x,y,d,Obj){      
    noStroke();
    fill( Obj.r, Obj.g, Obj.b, Obj.a);
    ellipse(x,y,d,d);
}

//userNode x座標,y座標,直徑
function isIn_uNode(unx,uny,r){
    var dist = Math.sqrt(  Math.pow((mouseX-unx),2) + 
                           Math.pow((mouseY-uny),2));
    if(dist<=r)   return true;
    else          return false;
}

// which col ,userNode x座標, y座標, 直徑 ,RGBA物件
function tracker(colNum,unx,uny,r,Obj){
    if(isIn_uNode(unx,uny,r)){
        //need floor
        var x = unx,y=baseY2-dy/2
      
        noFill();
        stroke( Obj.r, Obj.g, Obj.b, Obj.a);
        strokeWeight(10);
        
        beginShape();
        vertex(unx,uny);
        vertex(x,y); 
        for(let j=nodes-1;j>=0;j--){
            if(arr[colNum][j]===1){      //trun right
                colNum++;
                x+=dx;
                vertex(x,y);
            }
            else if(arr[colNum][j]===-1){//turn left
                colNum--;
                x-=dx;
                vertex(x,y);
            }
          
            //最後一個節點後走dy/2
            if(j==0)  y-=dy/2;
            else      y-=dy;
            vertex(x,y);
        }
      
        endShape();
    }
}

function dLadder(){
    for(let i=0;i<vLines;i++){
        //vLines
        //pias (bias) 偏移
        //base 基準位置
        drawLineV(piasX+baseX1+i*dx,baseY1,baseY2);

        //最後一條vLines的橫線不畫
        if(i===vLines-1)continue;
        //hLines
        for(let j=0;j<nodes;j++){
            //j*dy 同一個Col的第j個node向右畫出橫線
            if(arr[i][j]!==1)continue;
            drawLineH(piasY+baseY1+j*dy,piasX+baseX1,dx,i);
        }

    }

    //nodes
    for(let i=0;i<vLines;i++){
        for(let j=0;j<nodes;j++)
        {
            //2*nodeRadius 直徑
            drawNode(piasX+baseX1+i*dx,piasY+baseY1+j*dy,2*nodeRadius,nodeRGBA);
            //drawNode(baseX1+i*dx,baseY1+j*dy,2*nodeRadius);
        }
    }
  
    //userNodes
    for(let i=0;i<vLines;i++){
        //cvY*0.9 手動喬位置
        //[252, 83, 123, 255] RGBA
        
        drawNode(piasX+baseX1+i*dx,cvY*0.9,2*userRadius,userNodeRGBA);
        tracker(i,piasX+baseX1+i*dx,cvY*0.9,userRadius,userNodeRGBA);
    }
    
}

function setup() {
    createCanvas(cvX, cvY);
    for(let i=0;i<vLines-1;i++){
         arr = genBranchArray(arr,i);
    }
}

function draw() {
    background(50);
    dLadder();
  
}