//selectors
let car=document.getElementById("car");
let stripe1=document.getElementById("stripe1");
let stripe2=document.getElementById("stripe2");
let stripe3=document.getElementById("stripe3");
let stripe4=document.getElementById("stripe4");
let stripe5=document.getElementById("stripe5");
let traffic=document.getElementById("traffic");
let score=document.getElementById("score");
let high=document.getElementById("high");
let road=document.getElementById("road");
let home=document.getElementById("home");
let gameover=document.getElementById("gameover");
let out=document.getElementById("outscrn");

//variables for margins
let stripemgn1=stripe1.offsetTop;
let stripemgn2=stripe2.offsetTop;
let stripemgn3=stripe3.offsetTop;
let stripemgn4=stripe4.offsetTop;
let stripemgn5=stripe5.offsetTop;
let lftmargin=car.offsetLeft;
let topmargin=car.offsetTop;
let trafficmgn=traffic.offsetTop;
let scoreCtr=0;
let sts=0;
let highCtr=localStorage.getItem("high score") || 0;
let speed=5;
high.innerHTML="HIGH SCORE: "+highCtr;

//event listeners
document.addEventListener("keydown", start);
document.addEventListener("keydown", moveup);
document.addEventListener("keydown", movedown);
document.addEventListener("keydown", moveright);
document.addEventListener("keydown", moveleft);

//functions to move car
function moveup(e)
{
    if(e.key=="ArrowUp" && topmargin>=50 && sts==1)
    {
        topmargin-=10;
        car.style.marginTop=topmargin+"px";
    }
}

function movedown(e)
{
    if(e.key=="ArrowDown" && topmargin<=500 && sts==1)
    {
        topmargin+=10;
        car.style.marginTop=topmargin+"px";
    }
}

function moveright(e)
{
    if(e.key=="ArrowRight" && lftmargin<=300 && sts==1)
    {
        lftmargin+=10;
        car.style.marginLeft=lftmargin+"px";
    }
}

function moveleft(e)
{
    if(e.key=="ArrowLeft" && lftmargin>=0 && sts==1)
    {
        lftmargin-=10;
        car.style.marginLeft=lftmargin+"px";
    }
}

//function that move traffic
function movetraffic()
{
    if(collision(car,traffic))
    {
        endgame();
    }
    trafficmgn+=speed;
    traffic.style.marginTop=trafficmgn+"px";
    if(trafficmgn>700)
    {
        trafficmgn=0;
        traffic.style.marginLeft=Math.floor(Math.random()*250)+"px";
    }
    scoreCtr++;
    if(scoreCtr%200==0)
    {
        speed+=1;
    }
    score.innerHTML="SCORE:"+scoreCtr;
    if(highCtr<scoreCtr)
    {
        highCtr=scoreCtr;
        high.innerHTML="HIGH SCORE: "+highCtr;
        localStorage.setItem("high score",highCtr);
    }
}

//function to end gane
function endgame()
{
    gameover.style.display="block";
    outscrn.style.display="block";
    sts=0;
    document.addEventListener("keydown",restart);
    document.removeEventListener("keydown",pause);
}

//function to restart game
function restart(e){
    if(e.key==" ")
    {
        sts=1;
        speed=5;
        gameover.style.display="none";
        outscrn.style.display="none";
        scoreCtr=0;
        score.innerHTML="SCORE: 00";
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

//function for collision of car and traffic
function collision(a,b)
{
    let arect=a.getBoundingClientRect();
    let brect=b.getBoundingClientRect();
    return !((arect.bottom<brect.top+5) || (arect.top+5>brect.bottom) || (arect.right<brect.left+5) || (arect.left+5>brect.right))
}


//function to start game
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

//function to pause game
function pause(e){
    if(e.key==" ")
    {
        sts=0;
        document.addEventListener("keydown",start);
        document.removeEventListener("keydown",pause);
    }
}

//function to move white lines
function movestripe()
{
    stripemgn1+=5;
    stripemgn2+=5;
    stripemgn3+=5;
    stripemgn4+=5;
    stripemgn5+=5;
    stripe1.style.marginTop=stripemgn1+"px";
    stripe2.style.marginTop=stripemgn2+"px";
    stripe3.style.marginTop=stripemgn3+"px";
    stripe4.style.marginTop=stripemgn4+"px";
    stripe5.style.marginTop=stripemgn5+"px";
    if(stripemgn1>750)
    {
        stripemgn1=0;
    }
    if(stripemgn2>750)
    {
        stripemgn2=0;
    }
    if(stripemgn3>750)
    {
        stripemgn3=0;
    }
    if(stripemgn4>750)
    {
        stripemgn4=0;
    }
    if(stripemgn5>750)
    {
        stripemgn5=0;
    }
}

//function that run game
function gameplay()
{
    if(sts)
    {
        movetraffic();
        movestripe();
        setTimeout(gameplay,20);
    }
}