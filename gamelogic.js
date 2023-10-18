//selectors
let car=document.getElementById("car");
let stripe=document.getElementById("stripe");
let traffic=document.getElementById("traffic");
let score=document.getElementById("score");
let high=document.getElementById("high");
let road=document.getElementById("road");
let home=document.getElementById("home");
let gameover=document.getElementById("gameover");

//variables for margins
let lftmargin=car.offsetLeft;
let topmargin=car.offsetTop;
let trafficmgn=traffic.offsetTop;
let scoreCtr=0;
let sts=0;
let highCtr=0;

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
        topmargin-=5;
        car.style.marginTop=topmargin+"px";
    }
}

function movedown(e)
{
    if(e.key=="ArrowDown" && topmargin<=500 && sts==1)
    {
        topmargin+=5;
        car.style.marginTop=topmargin+"px";
    }
}

function moveright(e)
{
    if(e.key=="ArrowRight" && lftmargin<=300 && sts==1)
    {
        lftmargin+=5;
        car.style.marginLeft=lftmargin+"px";
    }
}

function moveleft(e)
{
    if(e.key=="ArrowLeft" && lftmargin>=0 && sts==1)
    {
        lftmargin-=5;
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
    trafficmgn+=5;
    traffic.style.marginTop=trafficmgn+"px";
    if(trafficmgn>700)
    {
        trafficmgn=-250;
        traffic.style.marginLeft=Math.floor(Math.random()*250)+"px";
    }
    scoreCtr++;
    score.innerHTML="SCORE:"+scoreCtr;
    if(highCtr<scoreCtr)
    {
        highCtr=scoreCtr;
        high.innerHTML="HIGH SCORE: "+highCtr;
    }
}

//function to end gane
function endgame()
{
    gameover.style.display="block";
    sts=0;
    document.addEventListener("keydown",restart);
    document.removeEventListener("keydown",pause);
}

//function to restart game
function restart(e){
    if(e.key==" ")
    {
        sts=1;
        gameover.style.display="none";
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
    return !((arect.bottom<=brect.top) || (arect.top>=brect.bottom) || (arect.right<=brect.left) || (arect.left>=brect.right))
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

//function that run game
function gameplay()
{
    if(sts)
    {
        movetraffic();
        setTimeout(gameplay,20);
    }
}