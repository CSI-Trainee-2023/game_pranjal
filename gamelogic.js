let car=document.getElementById("car");
let stripe=document.getElementById("stripe");
let traffic=document.getElementById("traffic");
let score=document.getElementById("score");
let lftmargin=car.offsetLeft;
let topmargin=car.offsetTop;
let trafficmgn=traffic.offsetTop;
let scoreCtr=0;
let sts=1;

document.addEventListener("keydown", start);
document.addEventListener("keydown", moveup);
document.addEventListener("keydown", movedown);
document.addEventListener("keydown", moveright);
document.addEventListener("keydown", moveleft);

function moveup(e)
{
    if(e.key=="ArrowUp" && topmargin>=50)
    {
        topmargin-=5;
        car.style.marginTop=topmargin+"px";
    }
}

function movedown(e)
{
    if(e.key=="ArrowDown" && topmargin<=500)
    {
        topmargin+=5;
        car.style.marginTop=topmargin+"px";
    }
}

function moveright(e)
{
    if(e.key=="ArrowRight" && lftmargin<=300)
    {
        lftmargin+=5;
        car.style.marginLeft=lftmargin+"px";
    }
}

function moveleft(e)
{
    if(e.key=="ArrowLeft" && lftmargin>=0)
    {
        lftmargin-=5;
        car.style.marginLeft=lftmargin+"px";
    }
}

function movetraffic()
{
    if(collision(car,traffic))
    {
        endgame();
    }
    trafficmgn+=5;
    traffic.style.marginTop=trafficmgn+"px";
    if(trafficmgn>700)
    {
        trafficmgn=-250;
        traffic.style.marginLeft=Math.floor(Math.random()*250)+"px";
    }
    scoreCtr++;
    score.innerHTML="SCORE:"+scoreCtr;
}

function endgame()
{
    sts=0;
    document.addEventListener("keydown",restart);
    document.removeEventListener("keydown",pause);
}

function restart(e){
    if(e.key==" ")
    {
        scoreCtr=0;
        score.innerHTML="SCORE: 00";
        sts=1;
        car.style.marginLeft="300px";
        car.style.marginTop="500px";
        traffic.style.marginLeft="0px"
        traffic.style.marginTop="0px";
        lftmargin=car.offsetLeft;
        topmargin=car.offsetTop;
        trafficmgn=traffic.offsetTop;
        document.addEventListener("keydown",start);
        document.removeEventListener("keydown",restart);
    }
}
function movestripe(){
}

function collision(a,b)
{
    let arect=a.getBoundingClientRect();
    let brect=b.getBoundingClientRect();
    return !((arect.bottom<brect.top) || (arect.top>brect.bottom) || (arect.right<brect.left) || (arect.left>brect.right))
}

function start(e)
{
    if(e.key==" ")
    {
        sts=1;
        document.addEventListener("keydown",pause);
        document.removeEventListener("keydown",start);
        gameplay();
    }
}

function pause(e){
    if(e.key==" ")
    {
        sts=0;
        document.addEventListener("keydown",start);
        document.removeEventListener("keydown",pause);
    }
}

function gameplay()
{
    if(sts)
    {
        movetraffic();
        setTimeout(gameplay,20);
    }
}