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
console.log(arr);


function drawLineV(x,y1,y2){
  stroke(104, 170, 247,192);
  strokeWeight(8);
  line(x,y1,x,y2);
}

function drawLineH(y,x1,dx,i){
  stroke(104, 170, 247,192);
  strokeWeight(8);
  line(x1+i*dx,y,x1+(i+1)*dx,y);
}

function drawNode(x,y,r){
  noStroke();
  fill(104, 170, 247,128);
  ellipse(x,y,r,r);
}


function setup() {
  createCanvas(cvX, cvY);
}

function draw() {
  background(50);
  
  //vLines
  for(let i=0;i<vLines;i++){
        drawLineV(piasX+baseX1+i*dx,baseY1,baseY2);
    
        //hLines
        if(i===vLines-1)continue;
        for(let j=0;j<nodes;j++){
          drawLineH(piasY + baseY1 + j*dy,piasX+baseX1,dx,i);
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