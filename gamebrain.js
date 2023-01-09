const colours =  ["red", "blue"];

let bMoves = 1;

let playerLocations = [];

// let shootTimer = -1;
    let bulletCount = 1;
  //my id
  let playerId;
  //ref to player's fb
  let playerReference;
  //ref to all players' fb
  let playerElements = {};
  //local list of players
  let players = {};
  const allPlayersReference = firebase.database().ref(`players`);
  const allPickupsReference = firebase.database().ref(`pickups`);
  const allBulletsReference = firebase.database().ref(`bullets`);
  let pickups = {};
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

    //functionality for bullets and obstacles and ammo/health here?
}

function spawnPickups(){
    const xSpawn = Math.floor(Math.random()*(gameBoxData.maxX-1));
    const ySpawn = Math.floor(Math.random()*(gameBoxData.maxY-1));
    const pickupId = xSpawn + "_" + ySpawn;
    console.log("pickup id: " + pickupId);
    const pickupReference = firebase.database().ref(`pickups/${pickupId}`);
    pickupReference.set({
        xSpawn,
        ySpawn,
    })

    setTimeout(() =>{
        spawnPickups();
    }, 20000
    )
}


// function reload(){
//     if(shootTimer>0){
//         shootTimer=-1;
//     }
//     // setTimeout(() =>{
//     //     reload();
//     // }, 700
//     // )
// }





async function moveBullets(){
    
       
    
if(firebase.database().ref(`bullets`)){
    for(let i = bulletCount; i>0; i--){
        try{
        let id = i;
        const nextBulletReference = firebase.database().ref(`bullets/${id}`);
        
        let d = await getBD(id)
        let x = await getBX(id)
        let y = await getBY(id)
        let j = await getBI(id)

        console.log("bD: " + d + "bX: " + x + "bY: " + y);

        if(d==="down" && y< gameBoxData.maxY){
            nextBulletReference.set({
                bD: d,
                bX: x,
                bY: y + 1,
                bI: j,
            })
            checkForPlayers(x, y+1);
        }
        else if(d==="up"&& y> gameBoxData.minY){
            nextBulletReference.set({
                bD: d,
                bX: x,
                bY: y - 1,
                bI: j,
            })
            checkForPlayers(x, y-1);
        }
        else if(d==="left"&& x > gameBoxData.minX){
            nextBulletReference.set({
                bD: d,
                bX: x - 1,
                bY: y,
                bI: j,
            })
            checkForPlayers(x-1, y);
        }
        else if(d==="right"&&  x< gameBoxData.maxX){
            nextBulletReference.set({
                bD: d,
                bX: x + 1,
                bY: y,
                bI: j,
            })
            checkForPlayers(x+1, y);
        }
        else{
            nextBulletReference.remove();
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

async function shoot(){
    if(players[playerId].bullets>0){
        
    const bulletId = bulletCount;
    const bulletReference = firebase.database().ref(`bullets/${bulletId}`);
    bX =players[playerId].x;
    bY =players[playerId].y;
    bD = players[playerId].direction;
    bI = bulletId;
    bulletReference.set({
      bX,
      bY,
      bD,
      bI,
    })
    playerReference.update({
        bullets: players[playerId].bullets -1,
    })
    bullets[bulletId] = bulletReference;
    console.log(bullets);
    
}
}

          


function checkForPlayers(x,y){
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
        if(string.includes(s)){
            playerLocations.splice(count, 1);
            z = string.substring(c, string.length);
            damagePlayers(z);
            console.log("ID SPLICE: " + z);
        }
        count++;
    })
}


// bullets
// :
// 10
// colour
// :
// "blue"
// direction
// :
// "down"
// health
// :
// 5
// id
// :
// "CsSYnCnPkLUxQfYOultvQ76tTXo2"
// name
// :
// "placeholdname"
// x
// :
// 14
// y
// :
// 25


async function damagePlayers(z){
    let h = await getPlayerHealth(z);
    let b = await getPlayerBullets(z);
    let c = await getPlayerColour(z);
    let d = await getPlayerDirection(z);
    let i = await getPlayerId(z);
    let n = await getPlayerName(z);
    let xs = await getPlayerX(z);
    let ys = await getPlayerY(z);
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
    })
    if(h===1){
        killPlayer(i);
    }
}

function killPlayer(id){
    const nextPlayerReference = firebase.database().ref(`players/${id}`);
    nextPlayerReference.remove();
}

function grabAmmo(x,y){
    const key = x + "_" + y;
    if(pickups[key]){
        firebase.database().ref(`pickups/${key}`).remove();
        playerReference.update({
            bullets: players[playerId].bullets + 3,
        })
        pickups[key]=false;
    }
}





// document.addEventListener

//should run as main method
(function (){
    
     
    
    
        
    

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
                name:"placeholdname",
                direction: "down",
                //change this color selection
                colour: randomArray(colours),
                x: xSpawn,
                y: ySpawn,
                bullets: 10,
                health: 5,
            })

            //remove from FB when disconnect
            playerReference.onDisconnect().remove();


            //BAD but how to remove properly?
            allPickupsReference.onDisconnect().remove();
            allBulletsReference.onDisconnect().remove();
            
            
             joinGame();
        }
        else{

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
        let x = players[playerId].bullets;
        grabAmmo(destX, destY); 
        let y = players[playerId].bullets;
        
        console.log("removing: " + destX + " " + destY);
    }


   
  

    const gameBox = document.querySelector(".gameBox");

    function joinGame(){
    
        document.addEventListener('keyup', (event) =>{
            var name = event.key;
            if(name === 'w' || name === 'W'){
                movementMan(0, -1);
            }
            if(name === 's'|| name === 'S'){
                movementMan(0, 1);
            }
            if(name === 'a'|| name === 'A'){
                movementMan(-1, 0);
            }
            if(name === 'd'|| name === 'D'){
                movementMan(1, 0);
            }
            



        })
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
            const oldPlayer = snapshot.val(); 
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
            
            pickupElement.classList.add("pickup", "grid-cell");
            pickupElement.innerHTML = (`
                <div class="pickupSprite grid-cell"></div>
            `);
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

       
        

        //working?
        allPickupsReference.on("child_removed", (snapshot) => {
            const pickup = snapshot.val();
            let s = pickup.xSpawn + "_" + pickup.ySpawn;
            gameBox.removeChild(pickupElements[s]);
            delete pickupElements[s];
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
                    <span class="playerName"></span>
                    <span class="playerHealth"></span>
                    <span class="playerBullets"></span>
                </div>
                `);
            playerElements[newPlayer.id] = playerElement;

            playerElement.querySelector(".playerName").innerText=newPlayer.name;
            playerElement.querySelector(".playerHealth").innerText="H: " + newPlayer.health;
            playerElement.querySelector(".playerBullets").innerText="B: " + newPlayer.bullets;
            playerElement.setAttribute("playerColour", newPlayer.colour);
            playerElement.setAttribute("playerDirection", newPlayer.direction);

            //changes here
            const left = 32 *newPlayer.x + "px";
            const top = 32 * newPlayer.y + "px";
            playerElement.style.transform = `translate3d(${left}, ${top}, 0)`;
            gameBox.appendChild(playerElement);
        })
        
    }        

    

    
})();