var canvas = document.querySelector('[data-clock]');
var time = document.querySelector('[data-time]');
var ctx = canvas.getContext('2d');
var ctxTime = time.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var outerRadius = w < h ? w/2*0.9 : h/2*0.9;
var innerRadius = w < h ? w/2*0.75 : h/2*0.75;
var centerRadius = w < h ? w/2*0.03 : h/2*0.03;

//outer clock
ctx.beginPath();
ctx.fillStyle = "lightgray";
ctx.arc(w/2, h/2,outerRadius,0,2*Math.PI);
ctx.fill();
ctx.closePath();

//inner clock
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(w/2, h/2,innerRadius,0,2*Math.PI);
ctx.fill();
ctx.closePath();

//center clock
ctx.beginPath();
ctx.fillStyle = "black";
ctx.arc(w/2, h/2,centerRadius,0,2*Math.PI);
ctx.fill();
ctx.closePath();

//clock's hours and hour's indicators
var angle = Math.PI/6 //angle between two hour's numbers
var startingAngle = -Math.PI/2 + angle //angle between 12 and 1
var hoursRadius = innerRadius + (outerRadius-innerRadius)/2;
var indicatorsOuterRadius = innerRadius; //outer radius of hours indicators circle
var indicatorsInnerRadius = innerRadius - 15; //inner radius of hours indicator circle
ctx.textBaseline="middle";
ctx.textAlign="center";
var hours = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]
for(var hour = 0; hour < 12; hour ++){
    //Orthonormal reference center (x,y) = (w/2, h/2)
    var xPos = xPos2 = xPos3 = w/2; 
    var yPos = yPos2 = yPos3 = h/2;
    //each (xPos, yPos) is rotating in its own circle
    //the three circles has the same center (w/2, h/2) but different radius
    xPos += hoursRadius*Math.cos(startingAngle);
    yPos += hoursRadius*Math.sin(startingAngle);
    xPos2 += indicatorsOuterRadius*Math.cos(startingAngle);
    yPos2 += indicatorsOuterRadius*Math.sin(startingAngle);
    xPos3 += indicatorsInnerRadius*Math.cos(startingAngle);
    yPos3 += indicatorsInnerRadius*Math.sin(startingAngle);
    ctx.beginPath();
    ctx.moveTo(xPos2, yPos2);
    ctx.lineTo(xPos3, yPos3);
    if((hour+1)%3 !== 0){
        ctx.font = innerRadius*0.1 + "px serif";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
    }else{
        ctx.font = innerRadius*0.15 + "px serif";
        ctx.fillStyle = "#8E2800";
        ctx.lineWidth = 5;
    }
    ctx.stroke();
    ctx.closePath();
    ctx.fillText(hours[hour], xPos, yPos);
    startingAngle += angle;
}
//clock's seconds indicators
var angle = Math.PI/30;
var startingAngle = -Math.PI/2 + angle;
var indicatorsOuterRadius = innerRadius; 
var indicatorsInnerRadius = innerRadius - 9;
for(var sec = 1; sec < 61; sec ++){
    var xPos = xPos2 = w/2; 
    var yPos = yPos2 = h/2;
    xPos += indicatorsOuterRadius*Math.cos(startingAngle);
    yPos += indicatorsOuterRadius*Math.sin(startingAngle);
    xPos2 += indicatorsInnerRadius*Math.cos(startingAngle);
    yPos2 += indicatorsInnerRadius*Math.sin(startingAngle);
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos2, yPos2);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    startingAngle += angle;
}
//Time
var date = new Date();
console.log(date.getHours())
ctxTime.lineCap = "square";
function drawSeconds(){
    var angle = Math.PI/30;
    var startingAngle = -Math.PI/2;
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var secondsAngle = startingAngle + seconds * angle;
    var minutesAngle = startingAngle + minutes * angle;
    var hoursAngle = startingAngle + hours * Math.PI/6;
    var secX = mX = hX = w/2; 
    var secY = mY = hY = h/2;
    secX += (indicatorsInnerRadius - (indicatorsInnerRadius/6))*Math.cos(secondsAngle);
    secY += (indicatorsInnerRadius - (indicatorsInnerRadius/6))*Math.sin(secondsAngle);

    mX += (indicatorsInnerRadius - (indicatorsInnerRadius/3))*Math.cos(minutesAngle+secondsAngle/60);
    mY += (indicatorsInnerRadius - (indicatorsInnerRadius/3))*Math.sin(minutesAngle+secondsAngle/60);

    hX += (indicatorsInnerRadius - (indicatorsInnerRadius/2))*Math.cos(hoursAngle+minutesAngle/60+secondsAngle/3600);
    hY += (indicatorsInnerRadius - (indicatorsInnerRadius/2))*Math.sin(hoursAngle+minutesAngle/60+secondsAngle/3600);

    ctxTime.clearRect(0,0,w,h);

    ctxTime.beginPath()
    ctxTime.moveTo(w/2, h/2)
    ctxTime.lineTo(secX,secY)
    ctxTime.lineWidth = 2;
    ctxTime.stroke();
    ctxTime.closePath();

    ctxTime.beginPath()
    ctxTime.moveTo(w/2, h/2)
    ctxTime.lineTo(mX,mY)
    ctxTime.lineWidth = 5;
    ctxTime.stroke();
    ctxTime.closePath();

    ctxTime.beginPath()
    ctxTime.moveTo(w/2, h/2)
    ctxTime.lineTo(hX,hY)
    ctxTime.lineWidth = 8;
    ctxTime.stroke();
    ctxTime.closePath();
}
var now;
var delta;
var then = Date.now();
var interval = 1000;
function animate(){
    requestAnimationFrame(animate)
    now = Date.now();
    delta = now - then
    if( delta > interval){
        drawSeconds();
        then = now - (delta % interval);
    }
}
drawSeconds()
animate()


