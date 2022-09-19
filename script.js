fetch('./Data.json')
    .then((response)=>response.json())
    .then(function (json) 
{
        console.log(json)
         intitMainFunction(json);
});;
   
function intitMainFunction(bboxesjosn) {  

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
base_image = new Image();
base_image.src = "./final.png";
base_image.onload = function(){
ctx.drawImage(base_image, 0, 0);
}
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
ctx1.globalAlpha = 0.5;

rect = {},
drag = false;
var dragging=false;
var mousexcoordinates = null;
var mouseycoordinates = null;

canvas1.addEventListener('dblclick', click, false);
function click(e){
    ctx1.clearRect(0,0,canvas1.width,canvas1.height);
    dragging=false;
}

canvas1.addEventListener('mousedown', mouseDown, false);
function mouseDown(e) {
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
}

canvas1.addEventListener('mouseup', mouseUp, false);
function mouseUp() {
    drag = false;
}

canvas1.addEventListener('mousemove', mouseMove, false);
function mouseMove(e) {
//  for dragging nd getting values
if (drag) {
rect.w = (e.pageX - this.offsetLeft) - rect.startX;
rect.h = (e.pageY - this.offsetTop) - rect.startY ;
ctx1.clearRect(0,0,canvas1.width,canvas1.height);
draw();
}
//  for hovering
else 
if(!dragging){
const rect = canvas1.getBoundingClientRect();
const transform = ctx1.getTransform();
mousexcoordinates = ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas1.width;
mouseycoordinates = ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas1.height;

for(let i = 0; i < bboxesjosn.length; i++) {
    let obj = bboxesjosn[i];
if((mousexcoordinates>=(obj.coordinates[0]))&&(mousexcoordinates<=(obj.coordinates[0]+obj.coordinates[2])) && (mouseycoordinates>=(obj.coordinates[1]))&& (mouseycoordinates<=(obj.coordinates[1]+obj.coordinates[3]))){
ctx1.clearRect(obj.coordinates[0],obj.coordinates[1],obj.coordinates[2],obj.coordinates[3]);
ctx1.fillRect(obj.coordinates[0],obj.coordinates[1],obj.coordinates[2],obj.coordinates[3]);
}
else{
ctx1.clearRect(obj.coordinates[0],obj.coordinates[1],obj.coordinates[2],obj.coordinates[3]);
}}}}

function draw() {
dragging=true;
ctx1.setLineDash([6]);
ctx1.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
var x1=rect.startX+rect.w;
var y1=rect.startY+rect.h;
var result=[];var count=0;

for(let i = 0; i < bboxesjosn.length; i++) {
    let obj = bboxesjosn[i];

if ((obj.coordinates[0] > rect.startX && obj.coordinates[0] < x1 && obj.coordinates[1] > rect.startY && obj.coordinates[1] < y1)&&(obj.coordinates[2]<rect.w &&obj.coordinates[3]<rect.h ) || (obj.coordinates[0] < rect.startX && obj.coordinates[0] > x1 && obj.coordinates[1] < rect.startY && obj.coordinates[1] > y1)&&(obj.coordinates[2]>rect.w &&obj.coordinates[3]>rect.h )){
    ctx1.fillRect(obj.coordinates[0],obj.coordinates[1],obj.coordinates[2],obj.coordinates[3]);
result[count]=obj.value;
count++;
}
}
document.testform.name.value=result;
}
}

//===================== For Zooming
function zoomin(){
    var body = document.getElementById("canvas");
    var currWidth = body.clientWidth;
    body.style.width = (currWidth + 50) + "px";

    var body = document.getElementById("canvas1");
    var currWidth = body.clientWidth;
    body.style.width = (currWidth + 50) + "px";
    
}

function zoomout() {
    var zoomout = document.getElementById("canvas");
    var currWidth = zoomout.clientWidth;
    zoomout.style.width = (currWidth - 50) + "px";

    var zoomout = document.getElementById("canvas1");
    var currWidth = zoomout.clientWidth;
    zoomout.style.width = (currWidth - 50) + "px";
}



   