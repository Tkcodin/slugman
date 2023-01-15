let unForGame = "";
let mypw = "";
let running = false;
let lBOX2 = document.getElementById("logInBox2");
let lBOX =document.getElementById("logInBox");
let gBOX = document.getElementById("gameBox");
let reloading = false;
let cBOX = document.getElementById("cab");
let BOXES = document.getElementById("boxes");
let secondTime = false;
let hsBOX = document.getElementById("hsb");
const gameBox = document.querySelector("#gameBox");
let stopping = false;
let mykills = 0;
let eBOX = document.getElementById("entryBox");
const colours =  ["red", "blue"];

const pickupValues =  ["b", "h"];
let hh = "";
// let bMoves = 1;

let moveOkay = true;

let playerLocations = [];

let pickupLocations = [];

let currentPickups = 0;

// let shootTimer = -1;
    let bulletCount = 1;
  //my id
  let playerId;
  //ref to player's fb
  let playerReference;
  //ref to all players' fb
  let playerElements = {};

  let explosionElements = {};
  //local list of players
  let players = {};
  const allPlayersReference = firebase.database().ref(`players`);
  const allPickupsReference = firebase.database().ref(`pickups`);
  const allBulletsReference = firebase.database().ref(`bullets`);
  const allAccountsReference = firebase.database().ref(`accounts`);
  const allExplosionsReference = firebase.database().ref(`explosions`);
  let pickups = [];
  let pickupElements = {};
  let bullets={};
    let bulletElements={};

const gameBoxData = {
    minX: 0,
    maxX: 41,
    minY: 0,
    maxY: 27,
}

function randomArray(array){
    return array[Math.floor(Math.random()*array.length)];
}

function canMoveTo(x,y){
    return(        
        x >= gameBoxData.maxX ||
        x < gameBoxData.minX ||
        y >= gameBoxData.maxY ||
        y < gameBoxData.minY
    )

    //functionality for bullets and obstacles and ammo/health here? VHANGE
}


function goEntryBox(){
    cBOX.style.visibility = "hidden";
    lBOX.style.visibility="hidden";
    gBOX.style.visibility="hidden";
    lBOX2.style.visibility="hidden";
    hsBOX.style.visibility="hidden";
    eBOX.style.visibility="visible";
    hh="";
    makeHS();
}


document.getElementById("logOut").addEventListener("click", function(){
    cBOX.style.visibility = "hidden";
    lBOX.style.visibility="visible";
    gBOX.style.visibility="hidden";
    lBOX2.style.visibility="hidden";
    eBOX.style.visibility = "hidden";
    hsBOX.style.visibility="hidden";
  
   
    // document.getElementById("logInBox").style.visibility="hidden";
    // document.getElementById("logInBox").style.top="1000px";
    // document.getElementById("gameBox").style.top="0px";
    // document.getElementById("gameBox").style.visibility="visible";
   
});


document.getElementById("toCreate").addEventListener("click", function(){
    cBOX.style.visibility = "visible";
    lBOX.style.visibility="hidden";
    gBOX.style.visibility="hidden";
    lBOX2.style.visibility="hidden";
    eBOX.style.visibility = "hidden";
    hsBOX.style.visibility="hidden";
  
   
    // document.getElementById("logInBox").style.visibility="hidden";
    // document.getElementById("logInBox").style.top="1000px";
    // document.getElementById("gameBox").style.top="0px";
    // document.getElementById("gameBox").style.visibility="visible";
   
});


document.getElementById("logIn").addEventListener("click", function(){
    cBOX.style.visibility = "hidden";
    lBOX.style.visibility="hidden";
    gBOX.style.visibility="hidden";
    lBOX2.style.visibility="visible";eBOX.style.visibility = "hidden";
    hsBOX.style.visibility="hidden";
  
   
    // document.getElementById("logInBox").style.visibility="hidden";
    // document.getElementById("logInBox").style.top="1000px";
    // document.getElementById("gameBox").style.top="0px";
    // document.getElementById("gameBox").style.visibility="visible";
   
});

document.getElementById("joinGame").addEventListener("click", function(){
    cBOX.style.visibility = "hidden";
    lBOX.style.visibility="hidden";
    gBOX.style.visibility="visible";
    lBOX2.style.visibility="hidden";eBOX.style.visibility = "hidden";
    hsBOX.style.visibility="hidden";
    running = true;
    if(secondTime){
        console.log("yeah g im reloaind");
            //if add objects check this random spawn
            let xSpawn = Math.floor(Math.random()*(gameBoxData.maxX-1));
            let ySpawn = Math.floor(Math.random()*(gameBoxData.maxY-1));
            console.log(xSpawn + " " + ySpawn);
            //listen for auth change
            
            playerReference = firebase.database().ref(`players/${playerId}`);

            playerReference.set({
                id: playerId,
                name: unForGame,
                direction: "down",
                //change this color selection
                colour: randomArray(colours),
                x: xSpawn,
                y: ySpawn,
                bullets: 10,
                health: 5,
                kills: 0,
            })

            //remove from FB when disconnect
            playerReference.onDisconnect().remove();
            
            

            

            //BAD but how to remove properly?
            allPickupsReference.onDisconnect().remove();
            // allBulletsReference.onDisconnect().remove();

            
             joinGame();
            
    }
    else{
        start2();
    }
    // start2();
    // document.getElementById("logInBox").style.visibility="hidden";
    // document.getElementById("logInBox").style.top="1000px";
    // document.getElementById("gameBox").style.top="0px";
    // document.getElementById("gameBox").style.visibility="visible";
   
});


let scores = {};

function fuckArray(s){
    hh = s + "<br>" + hh;
    // scores.push(s);
}

function getZ(z){
    return z;
}

async function makeHS(){
    list = await firebase.database().ref("accounts").orderByChild("hs").once("value");
    // firebase.database().ref("accounts").orderByChild("hs").once("value").then((list) => {
        list.forEach((acc) => {
        let s = acc.val().userName + ":    " + acc.val().hs;
            // z = s + z;
            fuckArray(s);
    //     })
      })
}

document.getElementById("highScores").addEventListener("click", function(){
    cBOX.style.visibility = "hidden";
    lBOX.style.visibility="hidden";
    gBOX.style.visibility="hidden";
    lBOX2.style.visibility="hidden";eBOX.style.visibility = "hidden";
    hsBOX.style.visibility="visible";


  
//WORKING HERE

   z = "Username: Highscore <br>";
   z = z + hh;

    console.log(z);

    hsBOX.innerHTML=(`
        <div id="hsDiv>
        <label id="hsTable">
            ` +  getZ(z) + `
        </lable>
        </div>
        <button id="return2" onclick="goEntryBox()" >
        Return
        </button>
          `)
    
  
   
});


async function logIn(){
    event.preventDefault();
    let ok = false;
    z ="I cant log you in w those details";

    let badpw = true;
    let badun = true;
    let userName = document.getElementById('loginUN').value;
    let password = document.getElementById('loginPW').value;
    let inst = document.getElementById('li2Instructions');

    let pw = await getAccountPassword(userName);
    let un = await getAccountUserName(userName);
    
    console.log(userName + " = " + un);
    console.log(password + " = " + pw);
    try{
        if(un===userName){

            badun = false;
        }
        if(pw===password){
            badpw = false;
        }
    }catch{}

    if(badun){
        z = z + " that username doesnt exist";
        inst.innerHTML = z;
    }
    else if(badpw){
        z = z + " that username's password is different";
        inst.innerHTML = z;
    }
    else{
        ok = true;
        console.log("i made to else");
      
    }

    console.log(ok);

    console.log(badpw + " " + badun);
    if(ok===true ){goEntryBox();
        unForGame = userName;
        mypw = pw;
    }
    

}


async function createAccount(){
    event.preventDefault();
    let ok = false;
    let z= "I couldn't make that account\n";
    let badpw = true;
    let badun = false;
    let noun=false;
    let nopw=false;
    
    let userName = document.getElementById('newUserName').value;
    let password = document.getElementById('newPW1').value;
    let p2 = document.getElementById('newPW2').value;
    let lab = document.getElementById("cabInstructions");

    console.log(userName);
    let userNameComp = await getAccountUserName(userName);
    
    let hs = 0;
    
    console.log(userNameComp);


    try{
    if(userNameComp===userName){
        badun = true;
    }
    }catch{}


    console.log(password + " = " + p2);
    if(password===p2){
        badpw = false;
    }
   
    if(userName.length<1){
       
        badun=true;
        noun=true;
    }
    
    if(password.length<1){
        badpw=true;
        nopw=true;
    }

    if(badpw === false && badun === false){
    const accountReference = firebase.database().ref(`accounts/${userName}`);
            accountReference.set({
            userName,
            password,
            hs,
        })
        z2 = "Hello " + userName + " your account has been created ";
        lab.innerHTML = z2;
        ok = true;
    }
    else if( badpw===true && badun===false){
        if(nopw===true){
            z = z + "Please enter a password";
        }
        else{
        z = z + "Your passwords didnt match ";
        }
        lab.innerHTML = z;
        
    }
    else if(badun===true && badpw===false){
        if(noun===true){
            z=z + "please enter a username";
        }
        else{
        z = z + "That username is taken ";
        }
        lab.innerHTML = z;
    }
    else{
        z = z + "Your passwords didnt match AND that username is taken";
        lab.innerHTML = z;
    }

    if(ok===true){goEntryBox();unForGame = userName;}mypw =password;
}

document.getElementById("createAccount").addEventListener("click", function(){
    // start2();
    cBOX.style.visibility = "visible";
    lBOX.style.visibility="hidden";
    gBOX.style.visibility="hidden";
    lBOX2.style.visibility="hidden";
    eBOX.style.visibility="hidden";
    console.log(cBOX);
    console.log(lBOX);

    

});

function spawnPickups(){
    const xSpawn = Math.floor(Math.random()*(gameBoxData.maxX-1));
    const ySpawn = Math.floor(Math.random()*(gameBoxData.maxY-1));
    const pickupId = xSpawn + "_" + ySpawn;
    const p = playerId;
    const v = randomArray(pickupValues);
    
    const pickupReference = firebase.database().ref(`pickups/${pickupId}`);
    pickupReference.set({
        xSpawn,
        ySpawn,
        p,
        v,
    })
    pickupLocations.push(xSpawn + "_" + ySpawn);
    currentPickups++;
    console.log(currentPickups + ": " + pickupId + " just spawned");
    setTimeout(() =>{
        spawnPickups();
    }, 20000
    )
}

function killPickups(){

    if(currentPickups>2){
            
                    s = pickupLocations[0];
                    const pickupReference = firebase.database().ref(`pickups/${s}`);
                    pickupReference.remove();
                    console.log("removing: " + s);
                    pickupLocations.shift();
                    currentPickups--;
                    
                
    }
    setTimeout(() =>{
        killPickups();
    }, 5000
    )
}


async function meDie(){
    console.log("I am dying");
    //update my highscore
    let me = firebase.database().ref(`accounts/${unForGame}`);
    let prev = await getAccountHS(unForGame);
    let current = mykills;
    

    console.log("prev: "+ prev + " current: " + current);

    let bigger = 0;
    if(current>prev){
        bigger = current;
    }
    else{
        bigger = prev;
    }

    me.set({
        password: mypw,
        userName: unForGame,
        hs: bigger,
    })
    // allBulletsReference.remove();
    // allPickupsReference.remove();
    playerReference.remove();

    setTimeout(() =>{
    //             lmoveOkay = true;
    
    //     playerLocations = [];
    
    //     pickupLocations = [];
    
    //     currentPickups = 0;
    
    
    //     bulletCount = 1;
    
      
    //   //ref to all players' fb
    //   playerElements = {}; 
    
    //   explosionElements = {};
    //   //local list of players
    //   players = {};
    
    //   pickups = [];
    //   pickupElements = {};
    //   bullets={};
    //   bulletElements={};
    //   goEntryBox();
        goEntryBox(); 
    }, 500
    )

    
    
}


// function killAllPickups(){
//     for(let i = 0; i<pickupLocations.length; i++){
//         s = pickupLocations[i];
//         const pickupReference = firebase.database().ref(`pickups/${s}`);
//         pickupReference.remove();
//         console.log("removing: " + s);
//         pickupLocations.shift();
//     }
// }


// function reload(){
//     if(shootTimer>0){
//         shootTimer=-1;
//     }
//     // setTimeout(() =>{
//     //     reload();
//     // }, 700
//     // )
// }

function explodeBullet(x, y){
    id = x+"_"+y;
    const explodeRef = firebase.database().ref(`explosions/${id}`);
    explodeRef.set({
        eX: x,
        eY: y,
    })

    setTimeout(() =>{
        removeExplode(x,y);
    }, 2000
    )
}

function removeExplode(x,y){
    id=x+"_"+y;
    const explodeRef = firebase.database().ref(`explosions/${id}`);
    explodeRef.remove(); 
}



async function moveBullets(){
    
       
    
if(firebase.database().ref(`bullets`)){
    for(let i = bulletCount; i>0; i--){
        try{
        let id = i;
        const nextBulletReference = firebase.database().ref(`bullets/${id}`);
        
        // console.log("i got here!");

        let d = await getBD(id)
        let x = await getBX(id)
        let y = await getBY(id)
        let j = await getBI(id)
        let p = await getBP(id)

        // console.log("but not here!");

        // console.log("bD: " + d + "bX: " + x + "bY: " + y);
        
        // console.log("p: " + p + "playerId:" + playerId);

        if(p===playerId){

        if(d==="down" && y< gameBoxData.maxY){
            nextBulletReference.set({
                bD: d,
                bX: x,
                bY: y + 1,
                bI: j,
                bP: p,
            })

            if(checkForPlayers(x, y+1)){
                nextBulletReference.remove();
                explodeBullet(x, y+1);
            }
        }
        else if(d==="up"&& y> gameBoxData.minY){
            nextBulletReference.set({
                bD: d,
                bX: x,
                bY: y - 1,
                bI: j,
                bP: p,
            })
            if(checkForPlayers(x, y-1)){
                nextBulletReference.remove();
                explodeBullet(x, y-1);
            }
        }
        else if(d==="left"&& x > gameBoxData.minX){
            nextBulletReference.set({
                bD: d,
                bX: x - 1,
                bY: y,
                bI: j,
                bP: p,
            })
            if(checkForPlayers(x-1, y)){
                nextBulletReference.remove();
                explodeBullet(x-1, y);
            }
        }
        else if(d==="right"&&  x< gameBoxData.maxX){
            nextBulletReference.set({
                bD: d,
                bX: x + 1,
                bY: y,
                bI: j,
                bP: p,
            })
            if(checkForPlayers(x+1, y)){
                nextBulletReference.remove();
                explodeBullet(x+1, y);
            }
        }
        else{
            nextBulletReference.remove();
            explodeBullet(x, y);
        }
    }
    }
    catch(error){}
    }
    // bMoves = bMoves ;
}

    setTimeout(() =>{
        moveBullets();
    }, 30
    )
    

}

async function getAccountHS(id){
    try{
    const nextplayerReference = firebase.database().ref(`accounts/${id}`);
    
    let s = await nextplayerReference.once('value');

    return s.val().hs;
    }catch{}
}
async function getAccountPassword(id){
    try{
    const nextplayerReference = firebase.database().ref(`accounts/${id}`);
    
    let s = await nextplayerReference.once('value');

    return s.val().password;
    }catch{}
}

async function getAccountUserName(id){
    try{
    const nextplayerReference = firebase.database().ref(`accounts/${id}`);
    
    let s = await nextplayerReference.once('value');

    return s.val().userName;
}catch{}

}

async function getPickupPlayer(id){
    const nextplayerReference = firebase.database().ref(`pickups/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().p;
}

async function getPickupValue(id){
    const nextplayerReference = firebase.database().ref(`pickups/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().v;
}



async function getPlayerId(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().id;
}

async function getPlayerY(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().y;
}

async function getPlayerX(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().x;
}

async function getPlayerName(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().name;
}

async function getPlayerDirection(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().direction;
}

async function getPlayerColour(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().colour;
}

async function getPlayerKills(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().kills;
}

async function getPlayerBullets(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().bullets;
}

async function getPlayerHealth(id){
    const nextplayerReference = firebase.database().ref(`players/${id}`);
    let s = await nextplayerReference.once('value');
    return s.val().health;
}

//holy fuck
async function getBD(id){
    const nextBulletReference = firebase.database().ref(`bullets/${id}`);
    let s = await nextBulletReference.once('value');
    return s.val().bD;
}

async function getBX(id){
    const nextBulletReference = firebase.database().ref(`bullets/${id}`);
    let s = await nextBulletReference.once('value');
    return s.val().bX;
}

async function getBY(id){
    const nextBulletReference = firebase.database().ref(`bullets/${id}`);
    let s = await nextBulletReference.once('value');
    return s.val().bY;
}

async function getBI(id){
    const nextBulletReference = firebase.database().ref(`bullets/${id}`);
    let s = await nextBulletReference.once('value');
    return s.val().bI;
}

async function getBP(id){
    const nextBulletReference = firebase.database().ref(`bullets/${id}`);
    let s = await nextBulletReference.once('value');
    return s.val().bP;
}

async function shoot(){
    if(players[playerId].bullets>0){
        
    const bulletId = bulletCount;
    const bulletReference = firebase.database().ref(`bullets/${bulletId}`);
    bX =players[playerId].x;
    bY =players[playerId].y;
    bD = players[playerId].direction;
    bI = bulletId;
    bP = playerId;
    bulletReference.set({
      bX,
      bY,
      bD,
      bI,
      bP,
    })
    playerReference.update({
        bullets: players[playerId].bullets -1,
    })
    bullets[bulletId] = bulletReference;
    console.log(bullets);
    
}
}

          


function checkForPlayers(x,y){
    hit = false;
    count = 0;
    s = x+"_"+y;
    c = 0;
    if(x>9 && y >9){
        c = 6;
    }
    else if(x>9 || y>9){
        c = 5;
    }
    else{
        c=4;
    }
    playerLocations.forEach((element) => {
        string = String(element)
        if(string.includes(s) && !(string.includes(playerId))){
            playerLocations.splice(count, 1);
            z = string.substring(c, string.length); 
            damagePlayers(z);
            console.log("ID SPLICE: " +string + " to: " + z + " c= " + c);
            hit = true;
        }
        count++;
    })
    return hit;
}





async function damagePlayers(z){
    let h = await getPlayerHealth(z);
    let b = await getPlayerBullets(z);
    let c = await getPlayerColour(z);
    let d = await getPlayerDirection(z);
    let i = await getPlayerId(z);
    let n = await getPlayerName(z);
    let xs = await getPlayerX(z);
    let ys = await getPlayerY(z);
    let k = await getPlayerKills(z);
    const nextPlayerReference = firebase.database().ref(`players/${z}`);
    nextPlayerReference.set({
        bullets: b,
        colour: c,
        direction: d,
        health: h-1,
        id: i,
        name: n,
        x: xs,
        y: ys,
        kills: k,
    })
    if(h===1){
        killPlayer(i);
    }
}

async function killPlayer(id){

    
    
    const nextPlayerReference = firebase.database().ref(`players/${id}`);
    
    nextPlayerReference.remove();
    const nextPlayerReference2 = firebase.database().ref(`players/${playerId}`);

    let h = await getPlayerHealth(playerId);
    let b = await getPlayerBullets(playerId);
    let c = await getPlayerColour(playerId);
    let d = await getPlayerDirection(playerId);
    let i = await getPlayerId(playerId);
    let n = await getPlayerName(playerId);
    let xs = await getPlayerX(playerId);
    let ys = await getPlayerY(playerId);
    let k = await getPlayerKills(playerId);
    
    nextPlayerReference2.set({
        bullets: b,
        colour: c,
        direction: d,
        health: h,
        id: i,
        name: n,
        x: xs,
        y: ys,
        kills: k + 1,

    })

    mykills++;
    
}

async function grabAmmo(x,y){
    const key = x + "_" + y;
    
    if(pickups[key]){
        let v = await getPickupValue(key);
        console.log("value: " + v);
        
        if(v==="b"){
            playerReference.update({
                bullets: players[playerId].bullets + 3,
            })
        }
        if(v==="h"){
            playerReference.update({
                health: players[playerId].health + 1,
            })
        }
        firebase.database().ref(`pickups/${key}`).remove();
        pickups[key]=false;
    }
}


function makeMoveOkay(){
    moveOkay = true;
    setTimeout(() =>{
        makeMoveOkay();
    }, 100
    )
}


// document.addEventListener

//should run as main method
function start2(){
    console.log("reloading: " + reloading + " 2ndtime: " + secondTime + "running : " + running + "stopping: "+ stopping);
    if(running){
    
    
        killPickups();
    
    
    
    makeMoveOkay();    
    
  


    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if(user){
            //if add objects check this random spawn
            let xSpawn = Math.floor(Math.random()*(gameBoxData.maxX-1));
            let ySpawn = Math.floor(Math.random()*(gameBoxData.maxY-1));
            console.log(xSpawn + " " + ySpawn);
            //listen for auth change
            playerId = user.uid;
            playerReference = firebase.database().ref(`players/${playerId}`);

            playerReference.set({
                id: playerId,
                name: unForGame,
                direction: "down",
                //change this color selection
                colour: randomArray(colours),
                x: xSpawn,
                y: ySpawn,
                bullets: 10,
                health: 5,
                kills: 0,
            })

            //remove from FB when disconnect
            playerReference.onDisconnect().remove();
            
            secondTime=true;

            

            //BAD but how to remove properly?
            // allPickupsReference.onDisconnect().remove();
            // allBulletsReference.onDisconnect().remove();

            
             joinGame();
        }
      
    })

    //make auth change
    firebase.auth().signInAnonymously().catch((error) =>{
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
    });



    
      
   

    //default is zero
    function movementMan(xChange=0, yChange=0){
        const destX = players[playerId].x + xChange;
        const destY = players[playerId].y + yChange;
        if(!canMoveTo(destX, destY)){
            players[playerId].x = destX;
            players[playerId].y = destY;
        }
        if(xChange === 1 ){
            players[playerId].direction = "right";
        }
        if(xChange === -1 ){
            players[playerId].direction = "left";
        }
        if(yChange === -1 ){
            players[playerId].direction = "up";
        }
        if(yChange === 1 ){
            players[playerId].direction = "down";
        }
        playerReference.set(players[playerId]);
        // let x = players[playerId].bullets;

        //try cause it will fail 95% of time and only succeed if pickup under person. must be a smarter way
       
        grabAmmo(destX, destY); 
        
        
        console.log("removing: " + destX + " " + destY);
    }


   
  

    

    function joinGame(){

    //     if(stopping){
              
    //         console.log("im in stopping");
    
    //   return;
        
    //   } 
        
        //THIS MUST BE MADE WORK FOR PICKUPS
        window.addEventListener('beforeunload', function (killAllPickups) {
            killAllPickups.preventDefault();
        });

        document.addEventListener('keydown', (event) =>{
            var name = event.key;
            if(name === 'w' || name === 'W'){
                if(moveOkay){
                    movementMan(0, -1);
                    moveOkay=false;
                }
            }
            if(name === 's'|| name === 'S'){
                if(moveOkay){
                    movementMan(0, 1);
                    moveOkay=false;
                }
            }
            if(name === 'a'|| name === 'A'){
                if(moveOkay){
                    movementMan(-1, 0);
                    moveOkay=false;
                }
            }
            if(name === 'd'|| name === 'D'){
                if(moveOkay){
                    movementMan(1, 0);
                    moveOkay=false;
                }
            }
            
            


        })
        

        // document.addEventListener('keyup', (event) =>{
        //     var name = event.key;
        //     if(name === 'w' || name === 'W'){
        //         movementMan(0, -1);
        //     }
        //     if(name === 's'|| name === 'S'){
        //         movementMan(0, 1);
        //     }
        //     if(name === 'a'|| name === 'A'){
        //         movementMan(-1, 0);
        //     }
        //     if(name === 'd'|| name === 'D'){
        //         movementMan(1, 0);
        //     }
            



        // })
        document.addEventListener('keyup', (event) =>{
            var name = event.key;
            
            if(name === 'q'|| name === 'Q'){
                // if(shootTimer<0){
                    shoot();
                //     shootTimer = 1;
                // }  
            }

           

        })

        // reload();
        moveBullets();
        spawnPickups();
        
    
        //listen to change in any player info
        allPlayersReference.on("value", (snapshot) => {
          
            players = snapshot.val(); //|| {};
            Object.keys(players).forEach((key) => {
                const playerState = players[key];
                let playerElement2 = playerElements[key];
                playerElement2.querySelector(".playerName").innerText=playerState.name;
                playerElement2.querySelector(".playerHealth").innerText="H: " + playerState.health;
                playerElement2.querySelector(".playerBullets").innerText="B: " + playerState.bullets;
                playerElement2.querySelector(".playerKills").innerText="K: " + playerState.kills;
                playerElement2.setAttribute("playerColour", playerState.colour);
                playerElement2.setAttribute("playerDirection", playerState.direction);
                //changes needed here
                const left = 32 *playerState.x + "px";
                const top = 32 * playerState.y + "px";
                playerElement2.style.transform = `translate3d(${left}, ${top}, 0)`;
                
                count = 0;
                playerLocations.forEach((element) => {
                    string = String(element)
                    if (string.includes(key)){
                        playerLocations.splice(count, 1);
                    }
                    count++;
                }
                )
                playerLocations.push(playerState.x + "_" + playerState.y + "_" + key);
                console.log(playerLocations);
            })


        })

        allPlayersReference.on("child_removed", (snapshot) =>{
            console.log("REMOVING PLAYER");
            const oldPlayer = snapshot.val(); 
            if(oldPlayer.id===playerId){
                meDie();
                console.log("its a me");
            }
            gameBox.removeChild(playerElements[oldPlayer.id]);
            delete playerElements[oldPlayer.id];
         })

        allBulletsReference.on("child_removed", (snapshot) => {

            //REMOVE FIRST BULLET AS SHOULD ALWAYS BE FIRST TO LEAVE SCREEN 
            //HOW CHANGE IF SOMEONE MOVES INTO SECOND BULLET ???? WHILE FIRST BULLET STILL TRAVELLING???
            const bullet = snapshot.val();
            gameBox.removeChild(bulletElements[bullet.bI]);
            delete bulletElements[bullet.bI];
            
            
            // reload();
        })

        allBulletsReference.on("value", (snapshot) => {
            bullets = snapshot.val() || {};
            Object.keys(bullets).forEach((key) => {
                const bulletState = bullets[key];
                // console.log(bullets[key]);
                
                    let bulletElement = bulletElements[key];
                    const left = 32 *bulletState.bX + "px";
                    const top = 32 * bulletState.bY + "px";
                    if(bulletElement != undefined){
                        bulletElement.style.transform = `translate3d(${left}, ${top}, 0)`;
                    }
                    else{
                        bulletElements[key] = false;
                    }

                
            })
        })
       


        //LISSEN for player leaving

        

        allPickupsReference.on("child_added", (snapshot) => {
            const pickup = snapshot.val();
            const pickupElement = document.createElement("div");
            

            const value = pickup.v;
            console.log("value: " + value);


            pickupElement.classList.add("pickup", "grid-cell");
            if(value === "b"){
                pickupElement.innerHTML = (`
                    <div class="pickupSprite grid-cell"></div>
                `);
            }
            if(value === "h"){
                pickupElement.innerHTML = (`
                    <div class="pickupSprite2 grid-cell"></div>
                `);
            }
            const left = 32 *pickup.xSpawn + "px";
            const top = 32 * pickup.ySpawn + "px";
            
            let key = pickup.xSpawn + "_" + pickup.ySpawn;


            

            pickupElements[key] = pickupElement;
            pickups[key] = true;
            pickupElement.style.transform = `translate3d(${left}, ${top}, 0)`;
            gameBox.appendChild(pickupElement);
        })


        allBulletsReference.on("child_added", (snapshot) => {
        
            const bullet = snapshot.val();
            const bulletElement = document.createElement("div");
            
            bulletElement.classList.add("bullet", "grid-cell");
            bulletElement.innerHTML = (`
                <div class="bulletSprite grid-cell"></div>
            `);
            const left = 32 *bullet.bX + "px";
            const top = 32 * bullet.bY + "px";

            //when to iterate this?
            let key = bullet.bI;
            bulletElements[key] = bulletElement;
            bullets[key] = bullet;
            bulletElement.style.transform = `translate3d(${left}, ${top}, 0)`;
            gameBox.appendChild(bulletElement);
            bulletCount = bulletCount+1;
        })

        allExplosionsReference.on("child_added", (snapshot) => {
            const explo = snapshot.val();
            const exploElement = document.createElement("div");
            
            exploElement.classList.add("explo", "grid-cell");
            exploElement.innerHTML = (`
                <div class="explodeSmallSprite grid-cell"></div>
            `);
            const left = 32 *explo.eX + "px";
            const top = 32 * explo.eY + "px";
            let key = explo.eX + "_" + explo.eY;


            

            explosionElements[key] = exploElement;
            // pickups[key] = true;
            exploElement.style.transform = `translate3d(${left}, ${top}, 0)`;
            gameBox.appendChild(exploElement);
        })
        allExplosionsReference.on("child_removed", (snapshot) => {
            const explo = snapshot.val();
            let s = explo.eX+"_"+explo.eY;
            gameBox.removeChild(explosionElements[s]);
            delete explosionElements[s];
        })

        //working?
        allPickupsReference.on("child_removed", (snapshot) => {
            const pickup = snapshot.val();
            let s = pickup.xSpawn + "_" + pickup.ySpawn;
            gameBox.removeChild(pickupElements[s]);
            delete pickupElements[s];
            pickups[s] = false;
        })

        //listen for any player entering /existant players on me join
        allPlayersReference.on("child_added", (snapshot) => {
            const newPlayer = snapshot.val();
            const playerElement = document.createElement("div");
            playerElement.classList.add("player", "grid-cell");

            if(newPlayer.id === playerId){
                playerElement.classList.add("me");
            }

            playerElement.innerHTML = (`
                <div class="playerSprite grid-cell"></div>
                <div class="playerInfo grid-cell">
                    <label class="playerName"></label>
                    <br>
                    <span class="playerHealth"></span>
                    <span class="playerBullets"></span>
                    <span class="playerKills"></span>
                    </label>
                </div>
                `);
            playerElements[newPlayer.id] = playerElement;

            playerElement.querySelector(".playerName").innerText=newPlayer.name;
            playerElement.querySelector(".playerHealth").innerText="H: " + newPlayer.health;
            playerElement.querySelector(".playerBullets").innerText="B: " + newPlayer.bullets;
            playerElement.querySelector(".playerKills").innerText="K: " + newPlayer.kills;
            playerElement.setAttribute("playerColour", newPlayer.colour);
            playerElement.setAttribute("playerDirection", newPlayer.direction);

            //changes here
            const left = 32 *newPlayer.x + "px";
            const top = 32 * newPlayer.y + "px";
            playerElement.style.transform = `translate3d(${left}, ${top}, 0)`;
            gameBox.appendChild(playerElement);
        })
        // if (stopping){
        //     console.log("im in stopping");
            
        //     stopping = false;
            
        //     running = false;
             
        // }
        
              
              
              }
    }        

} 


    

