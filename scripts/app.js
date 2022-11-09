//stats
let score = 0;
let yolk = 0;
let earning = 1;
let cookies = 0;
let cookieBonus = 1;

//currently egg
let eggCounter = 1;
let eggType = 1;
let eggCap = 3;
let eggCapInc = 3;
const audio = new Audio("audio/click_sound.mp3");
let muteValue = false;
//funcs
function add(event){
    if(!muteValue){audio.play();}
    score = score + Math.round(upgrades.lvl[0] * cookieBonus);
    clickNumber(event);
    document.getElementById("score").innerHTML = score;
    changeImg();
}

function changeImg(){
    
let img = document.getElementById("egg-img");
    if(score>=eggCap && eggCounter<6)
    {
        eggCounter++;
        img.src = "images/eggs/egg" + eggType + "/egg" + eggCounter + ".svg";
        eggCap = eggCap + eggCapInc;
    }
    else if(eggCounter==6){
        
        eggType = getRandomInt(1,5);
        eggCounter=0;
        yolk = yolk + Math.round(earning * cookieBonus) + upgrades.yolkEarning[3];
        document.getElementById("yolks").innerHTML = yolk;
        eggCapInc++;
        
    }
}

 function getRandomInt(min, max) {
        min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  //clicker numbers
  function clickNumber(event){
    let clicker = document.getElementById("clicker");
    let clickerOffset = clicker.getBoundingClientRect();
    let position = {
        x: event.pageX - clickerOffset.left,
        y: event.pageY - clickerOffset.top
    };
    let element = document.createElement("div");
    element.textContent = "+" + Math.round(upgrades.lvl[0] * cookieBonus);
    element.classList.add("number", "unselectable");
    element.style.left = position.x + "px";
    element.style.top = position.y + "px";

    clicker.appendChild(element);

    let movmentInterval = window.setInterval(function(){
        if(typeof element == "undefined" && element == null) clearInterval(movmentInterval);
        position.y--;
        element.style.top = position.y + "px";
    },10)

    fadeOut(element, 3000, 0.5, function(){
         element.remove();
    });
  }

  function fadeOut(element, duration, finalOpacity, callback){
    let opacity = 1;

    let elementFadingInterval = window.setInterval(function() {
        opacity -= 0.1;
        if(opacity <= finalOpacity){
            clearInterval(elementFadingInterval);
            callback();
        }
        element.style.opacity = opacity;
    }, 400);
  }
  

//Upgrades functions
let upgrades = {
    name: [
        "Cursor",
        "Rock",
        "Hammer",
        "eb",
        "cookie"
    ],
    lvl: [ 1, 0, 0, 0, 0],
    cost: [50, 200, 500, 1000, 0],
    yolkCost: [0, 0, 0, 0, 19],
    earning: [0, 0, 0, 0, 0],
    yolkEarning: [0, 0, 0, 0, 0],

}

//Upgrades
function upgrade(index){
    if(score >= upgrades.cost[index] && yolk>= upgrades.yolkCost[index]){
        score = score - upgrades.cost[index];
        yolk = yolk - upgrades.yolkCost[index];
        upgrades.cost[index] =  upgrades.cost[index] *2;
        upgrades.lvl[index]++;
        upgrades.earning[index] = upgrades.earning[index]* 2;
        refresh();
    }
}
//--------------------------------------------cursor
function upgradeCursor(){
    upgrade(0);
    upgrades.earning[0] = 0;
}

//------------------------------------------rock
function upgradeRock(){
    upgrade(1);
    if(upgrades.earning[1] == 0)
    {
        upgrades.earning[1] = 1;
    }
    
    if(upgrades.lvl[1] > 0){
        document.getElementById("l2").style.visibility = "visible";
    }
}
setInterval(function() {
    if(upgrades.lvl[1]>0){
    score = score + Math.round(upgrades.earning[1] * cookieBonus);
    }
    refresh();
}, 1000);

//---------------------------------------hammer
function upgradeHammer(){
    upgrade(2);
    if(upgrades.earning[2] == 0)
    {
        upgrades.earning[2] = 25;
    }
    if(upgrades.lvl[2] > 0){
        document.getElementById("l3").style.visibility = "visible";
    }
}
setInterval(function() {
    if(upgrades.lvl[2]>0){
    score = score + Math.round(upgrades.earning[2] * cookieBonus);
    }
}, 20000);

//--------------------------------eggbreaker
function upgradeEggbreaker(){
        upgrade(3);
        if(upgrades.earning[3] == 0)
    {
        upgrades.earning[3] = 85;
    }
        upgrades.yolkEarning[3]++;

    if(upgrades.lvl[3] >0){
        document.getElementById("l4").style.visibility = "visible";
    }
}
setInterval(function() {
    if(upgrades.lvl[3]>0){
    score = score + Math.round(upgrades.earning[3] * cookieBonus);
    refresh();}
}, 60000);

//------------------------------cookies
function bakeCookies(){

    
    
    if( yolk >= upgrades.cost[4]) {
        if(confirm("Baking eggs reset all ur progress and upgrades but gives you cookies, every cookie gives 5% to all your earnings. Are you sure u want to bake? ")) {
        yolk = yolk - upgrades.yolkCost[4];
        upgrades.yolkCost[4] = upgrades.yolkCost[4]*3;
        cookies++;
        cookieBonus = cookieBonus + 0.05;
        score = 0;
        eggCounter = 1;
        eggType = 1;
        eggCap = 3;
        eggCapInc = 3;
        sps = 0;
        upgrades.lvl = [ 1, 0, 0, 0, 0];
        upgrades.cost = [50, 200, 500, 1000, 0];
        upgrades.earning = [0, 0, 0, 0, 0];
        upgrades.yolkEarning = [0, 0, 0, 0, 0];
        document.getElementById("l2").style.visibility = "hidden";
        document.getElementById("l3").style.visibility = "hidden";
        document.getElementById("l4").style.visibility = "hidden";
        refresh();
    }
    }

}

//--------------------score per second
let sps = 0;

function updateSPS() {
    if(upgrades.lvl[1]>0 || upgrades.lvl[12]>0 || upgrades.lvl[13]>0){
    sps = upgrades.earning[1] + (upgrades.earning[2] /20) + (upgrades.earning[3]/60);
    sps = sps.toFixed(3);
    }
    document.getElementById("sps").innerHTML = sps;
}

//-----------------------save/load
function save() {
    let Save = {
        score: score,
        yolk: yolk,
        earning: earning,
        eggCounter: eggCounter,
        eggType: eggType,
        eggCap: eggCap,
        eggCapInc: eggCapInc,
        cookies: cookies,
        upgradesLvl: upgrades.lvl,
        upgradesCost: upgrades.cost,
        upgradesYolkCost: upgrades.yolkCost,
        upgradesearning: upgrades.earning,
        upgradesYolkearning: upgrades.yolkEarning,
    };
    localStorage.setItem("Save", JSON.stringify(Save));
}

function load() {
    let saveFile = JSON.parse(localStorage.getItem("Save"));
    if (typeof saveFile.score !== "undefined") {score = saveFile.score;}
    if (typeof saveFile.yolk !== "undefined") {yolk = saveFile.yolk;}
    if (typeof saveFile.earning !== "undefined") {earning = saveFile.earning;}
    if (typeof saveFile.eggCounter !== "undefined") {eggCounter = saveFile.eggCounter;}
    if (typeof saveFile.eggType !== "undefined") { eggType = saveFile.eggType;}
    if (typeof saveFile.eggCap !== "undefined") { eggCap = saveFile.eggCap;}
    if (typeof saveFile.eggCapInc !== "undefined") {eggCapInc = saveFile.eggCapInc;}
    if (typeof saveFile.cookies !== "undefined") {cookies = saveFile.cookies;}
    if (typeof saveFile.cookieBonus !== "undefined") {cookieBonus = saveFile.cookieBonus;}
    if (typeof saveFile.upgradesLvl !== "undefined" && typeof saveFile.upgradesCost!== "undefined" && typeof saveFile.upgradesYolkCost!== "undefined" && typeof saveFile.upgradesearning!== "undefined" && typeof saveFile.upgradesYolkearning!== "undefined" ) {
        for (i=0; i< saveFile.upgradesLvl.length; i++){
            upgrades.lvl[i] = saveFile.upgradesLvl[i];
            upgrades.cost[i] = saveFile.upgradesCost[i];
            upgrades.yolkCost[i] = saveFile.upgradesYolkCost[i];
            upgrades.earning[i] = saveFile.upgradesearning[i];
            upgrades.yolkEarning[i] = saveFile.upgradesYolkearning[i];
        }
        for (i=1; i< 4; i++){
            if(upgrades.lvl[i] >0){
                document.getElementById("l" + (i+1)).style.visibility = "visible";
            }
        }
    }
    
    let img = document.getElementById("egg-img");
    img.src = "images/eggs/egg" + eggType + "/egg" + eggCounter + ".svg";
    refresh();
}

//------------------------------------------------------refresh content
function refresh(){
    document.getElementById("score").innerHTML = score;
    document.getElementById("yolks").innerHTML = yolk;
    document.getElementById("sps").innerHTML = sps;
    document.getElementById("cookies").innerHTML = cookies;
    document.getElementById("cookiesR").innerHTML = cookies;
    document.getElementById("bakeCost").innerHTML = upgrades.yolkCost[4];
    document.getElementById("cursorCost").innerHTML = upgrades.cost[0];
    document.getElementById("cursorLvl").innerHTML = upgrades.lvl[0];
    document.getElementById("ebCost").innerHTML = upgrades.cost[3];
    document.getElementById("ebLvl").innerHTML = upgrades.lvl[3];
    document.getElementById("rockCost").innerHTML = upgrades.cost[1];
    document.getElementById("rockLvl").innerHTML = upgrades.lvl[1];
    document.getElementById("hammerCost").innerHTML = upgrades.cost[2];
    document.getElementById("hammerLvl").innerHTML = upgrades.lvl[2];
    changeImg();
    updateSPS();
}

//-------------------------------reset
function reset(){
    if(confirm("You will lose all your progress!!! Are you sure? ")) {
        let Save = {};
        localStorage.setItem("Save", JSON.stringify(Save));
        location.reload();
    }
}

//-------------------------------mute
function mute(){
    muteValue = isMuted(muteValue);
}
function isMuted(muteValue) {
    return (muteValue ? false : true);
  }
  