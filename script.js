
let shownHire = false
let shownPrestige = false
let Plimit = false
let A1 = false
let A2 = false
let interval = 1000
let gameData = {
  gold: 0,
  goldPerClick: 1,
  upgrade3:1,
  goldPerClickCost: 10,
  goldPerClickPurchased: 1,
  miner: 0.0,
  minerCost: 100,
  upgrade1Cost: 100,
  upgrade1Amount: 0,
  minerpower: 1,
  minerspurchased: 0,
  upgrade2Cost: 1000,
  upgrade2Amount: 0,
  upgrade3Cost: 15000,
  upgrade3Amount: 0,
  hirer: 0,
  hireCost: 1000,
  hirerpurchased: 0,
  hirePower: 1,
  A1: 1,
  A2: 1,
  drillBot: 0,
  drillBotCost: 2000,
  drillBotpurchased: 0,
  drillBotPower: 20,
  machine: 0,
  machineCost: 10000,
  machinepurchased: 0,
  machinePower: 1,
}

let prestigeData = {
  prestige: 0,
  prestigelimit: 100000,
  prestigeIncrease: 1,
  prestigeU1Cost: 1,
  prestigeU1Amount: 0,
  prestigeU2Cost: 1,
  prestigeU2Amount: 0,
  prestigeU3Cost: 2,
  prestigeU3Amount: 0,
  prestigeU4Cost: 10,
  prestigeU4Amount: 0,
}

function format(number, type) {
  let exponent = Math.floor(Math.log10(number))
  let mantissa = number / Math.pow(10, exponent)
  if (exponent < 5) return number.toFixed(1)
  if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
  if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}


function mineGold() {
  gameData.gold += gameData.goldPerClick * gameData.upgrade3
  document.getElementById("goldMined").innerHTML = format(gameData.gold, "scientific") + " Gold Mined"
}


function mineGoldTime() {
let mineg = ((gameData.minerpower * gameData.miner) * gameData.A1) 
let drillg = (gameData.drillBot * gameData.drillBotPower)
  gameData.gold += mineg + drillg
  document.getElementById("goldTime").innerHTML = format(mineg + drillg, "scientific") + " Gold Mined Per Second"
  document.getElementById("goldMined").innerHTML = format(gameData.gold, "scientific") + " Gold Mined"
}

function hireTime() {
  gameData.miner += gameData.hirer * gameData.hirePower
  document.getElementById("minersH").innerHTML = format((gameData.hirer * gameData.hirePower), "scientific") + " Miners hired Per Second"
  document.getElementById("miners").innerHTML = format(gameData.miner, "scientific") + " Miners"
}


function machineTime(){
  gameData.drillBot += gameData.machine * gameData.machinePower
  document.getElementById("drillBotM").innerHTML = format((gameData.machine * gameData.machinePower), "scientific") + " DrillBots built Per Second"
  document.getElementById("drillBot").innerHTML = format(gameData.drillBot, "scientific") + " drillBots"
}



function buyMiner() {
  if (gameData.gold >= gameData.minerCost) {
    gameData.gold -= gameData.minerCost
    gameData.miner += 1
    gameData.minerspurchased += 1
    gameData.minerCost += 100 * gameData.minerspurchased
    document.getElementById("goldTime").innerHTML = format((gameData.miner * gameData.minerpower) + (gameData.drillBot * gameData.drillBotPower), "scientific") + " Gold Mined Per Second"
    document.getElementById("goldTimeUpgrade").innerHTML = "Buy another Miner (currently Level " + gameData.minerspurchased + ") Cost: " + format(gameData.minerCost, "scientific") + " Gold"
    document.getElementById("miners").innerHTML = gameData.miner + " Miners"
  }
}


function buyHirer() {
  if (gameData.gold >= gameData.hireCost) {
    gameData.gold -= gameData.hireCost
    gameData.hirer += 1
    gameData.hirerpurchased += 1
    gameData.hireCost += 500 * gameData.hirerpurchased
    document.getElementById("minersH").innerHTML = (gameData.hirer * gameData.hirePower) + " Miners Hired Per Second"
    document.getElementById("buyHirer").innerHTML = "Buy another Hirer (Currently Level " + gameData.hirerpurchased + ") Cost: " + format(gameData.hireCost, "scientific") + " Gold"
  }
}

function buyDrillBot() {
  if (gameData.gold >= gameData.drillBotCost) {
    gameData.gold -= gameData.drillBotCost
    gameData.drillBot += 1
    gameData.drillBotpurchased += 1
    gameData.drillBotCost += 1500 * gameData.drillBotpurchased
    document.getElementById("buyDrillBot").innerHTML = "Buy Another DrillBot (Currently Level " + format(gameData.drillBotpurchased, "scientific") + ") Cost: " + format(gameData.drillBotCost, "scientific") + " Gold"
    document.getElementById("drillBot").innerHTML = gameData.drillBot + " DrillBots"
  }
}

function buyMachine() {
  if (gameData.gold >= gameData.machineCost) {
    gameData.gold -= gameData.machineCost
    gameData.machine += 1
    gameData.machinepurchased += 1
    gameData.machineCost += (5000 * gameData.machinepurchased)
    document.getElementById("drillBotM").innerHTML = (gameData.machine * gameData.machinePower) + " DrillBots built Per Second"
    document.getElementById("buyMachine").innerHTML = "Buy another Machine (Currently Level " + gameData.machinepurchased + ") Cost: " + format(gameData.machineCost, "scientific") + " Gold"
  }
}

function buyGoldPerClick() {
  if (gameData.gold >= gameData.goldPerClickCost) {
    gameData.gold -= gameData.goldPerClickCost
    gameData.goldPerClick += 1
    gameData.goldPerClickPurchased += 1
    gameData.goldPerClickCost *= 2
    document.getElementById("goldPerClick").innerHTML = gameData.goldPerClick + " Gold Per Click"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClickPurchased + ") Cost: " + format(gameData.goldPerClickCost, "scientific") + " Gold"

  }
}

function reset() {
  document.getElementById("goldMined").innerHTML = "0 Gold Mined"
  document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level 0) Cost: 10 Gold"
  document.getElementById("goldTime").innerHTML = "0 Gold Mined Per Second"
  document.getElementById("minersH").innerHTML = "0 Miners hired Per Second"
  document.getElementById("miners").innerHTML = "0 Miners"
  document.getElementById("goldTimeUpgrade").innerHTML = "Buy another Miner (currently Level 0) Cost: 100 Gold"
  document.getElementById("miners").innerHTML = "0 Miners"
  document.getElementById("upgrade1").innerHTML = "Better Minecarts- Doubles Power of Miners (Currently Level 0) Cost: 100 Gold"
  document.getElementById("upgrade2").innerHTML = "Better Paper Work Filing- Doubles Power of Hirers (Currently Level 0) Cost: 1000 Gold"
  document.getElementById("upgrade3").innerHTML = "Buy An Exoskeleton Suit for you (Currently Level 0) Cost: 15000 Gold"
  document.getElementById("minersH").innerHTML = "0 Miners Hired Per Second"
  document.getElementById("buyHirer").innerHTML = "Buy Hiring staff to hire miners for you (Currently Level 0) Cost: 1000 Gold"
  document.getElementById("buyDrillBot").innerHTML = "Buy a DrillBot (Currently Level 0) Cost: 2000 Gold"
  document.getElementById("goldPerClick").innerHTML = "1 Gold Per Click"
}




// let resetLoop = window.setInterval(function() {
//   reset()
// }, 1)


let slowGameLoop = window.setInterval(function(){
  machineTime()

},interval*5)



let mainGameLoop = window.setInterval(function () {

  mineGoldTime()
  hireTime()
  if (gameData.gold >= 100000) {
    A1 = true
    document.getElementById("AT").style.visibility = "visible";
    document.getElementById("AT").style.textAlign = "center";
  }

  if (A1 == true) {
    gameData.A1 = 1.5
    document.getElementById("A1").style.color = "Green"
    document.getElementById("AT").style.visibility = "visible";
    document.getElementById("AT").style.textAlign = "center";
  }

  if (gameData.hirerpurchased >= 20) {
    A2 = true
  }

  if (A2 == true) {
    gameData.A2 = 2
    document.getElementById("A2").style.color = "Green"
  }

  if(gameData.gold>= 100000){
shownPrestige = true
  }

if(shownPrestige == true){
  document.getElementById("Pres").style.visibility = "visible";
  document.getElementById("Pres").style.textAlign = "center";
}


  if (gameData.gold >= 500 || shownHire == true) {
    document.getElementById("buyHirer").style.visibility = "visible";
    document.getElementById("buyHirer").style.textAlign = "center";
    shownHire = true
  }
  if (gameData.gold >= prestigeData.prestigelimit) {
    Plimit = true
    document.getElementById("Pres").style.backgroundColor = "#d4c4f3"
  } else {
    document.getElementById("Pres").style.backgroundColor = "#ecce22"
  }
  if (prestigeData.prestigeU1Amount >= 1) {
    document.getElementById("buyDrillBot").style.visibility = "visible";
    document.getElementById("buyDrillBot").style.textAlign = "center";
  }
  if (prestigeData.prestigeU3Amount >= 1) {
    document.getElementById("buyMachine").style.visibility = "visible";
    document.getElementById("buyMachine").style.textAlign = "center";
  }


}, interval)


function upgrade1() {
  if (gameData.gold >= gameData.upgrade1Cost) {
    gameData.gold -= gameData.upgrade1Cost
    gameData.upgrade1Amount += 1
    gameData.minerpower *= 2
    gameData.upgrade1Cost *= 10
    document.getElementById("upgrade1").innerHTML = "Better Minecarts- Doubles Power of Miners (Currently Level " + gameData.upgrade1Amount + ") Cost: " + format(gameData.upgrade1Cost, "scientific") + " Gold"
  }
}


function upgrade2() {
  if (gameData.gold >= gameData.upgrade2Cost) {
    gameData.gold -= gameData.upgrade2Cost
    gameData.upgrade2Amount += 1
    gameData.hirePower *= 2
    gameData.upgrade2Cost *= 15
    document.getElementById("upgrade2").innerHTML = "Better Paper Work Filing- Doubles Power of Hirers (Currently Level " + gameData.upgrade2Amount + ") Cost: " + format(gameData.upgrade2Cost, "scientific") + " Gold"
  }
}

//fix prestiging: tab stays purple dont let it do that
//on prestige numbers on buttons dont reset
function upgrade3() {
  if (gameData.gold >= gameData.upgrade3Cost) {
    gameData.gold -= gameData.upgrade3Cost
    gameData.upgrade3Amount += 1
    gameData.upgrade3 = 50
    document.getElementById("goldPerClick").innerHTML = gameData.goldPerClick + " Gold Per Click"
    document.getElementById("upgrade3").style.visibility = "hidden"
    document.getElementById("upgrade3").innerHTML = "Buy An Exoskeleton - multiplies click power by 100 (Currently Level " + gameData.upgrade3Amount + ") Cost: " + format(gameData.upgrade3Cost, "scientific") + " Gold"
  }
}

function tab(tab) {
  // hide all your tabs, then show the one the user selected.
  document.getElementById("buttons").style.display = "none"
  document.getElementById("Upgrades").style.display = "none"
  document.getElementById("Achievements").style.display = "none"
  document.getElementById("Prestige").style.display = "none"
  document.getElementById("settings").style.display = "none"
  document.getElementById(tab).style.display = "grid"
}
// go to a tab for the first time, so not all show
tab("buttons")

var saveGameLoop = window.setInterval(function () {
  localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
}, 15000)


let savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
if (savegame !== null) {
  gameData = savegame
}

function deleteSaveData() {
  localStorage.removeItem("goldMinerSave");
}


function prestige() {
  if (gameData.gold >= 100000 && gameData.gold < 1000000000) {

      gameData.gold = 0,
      gameData.goldPerClick = 1,
      gameData.goldPerClickCost = 10,
      gameData.goldPerClickPurchased = 1,
      gameData.miner = 0,
      gameData.minerCost = 100,
      gameData.upgrade1Cost = 100,
      gameData.upgrade1Amount = 0,
      gameData.minerpower = 1,
      gameData.minerspurchased = 0,
      gameData.upgrade2Cost = 1000,
      gameData.upgrade2Amount = 0,
      gameData.upgrade3Cost = 15000,
      gameData.upgrade3Amount = 0,
      gameData.hirer = 0,
      gameData.hireCost = 1000,
      gameData.hirerpurchased = 0,
      gameData.hirePower = 1,
      gameData.drillBot = 0,
      gameData.drillBotCost = 2000,
      gameData.drillBotpurchased = 0,
      gameData.drillBotPower = 20,
      gameData.machine = 0,
      gameData.machineCost = 10000,
      gameData.machinepurchased = 0,
      gameData.machinePower = 1,
      gameData.upgrade3 = 1,


      document.getElementById("upgrade3").style.visibility = "visible"
    prestigeData.prestige += 1
    document.getElementById("prestigePoints").innerHTML = prestigeData.prestige + " Prestige Points"
    reset()
  } else if (gameData.gold >= 1000000000) {
    gameData.gold = 0,
    gameData.goldPerClick = 1,
    gameData.goldPerClickCost = 10,
    gameData.goldPerClickPurchased = 1,
    gameData.miner = 0,
    gameData.minerCost = 100,
    gameData.upgrade1Cost = 100,
    gameData.upgrade1Amount = 0,
    gameData.minerpower = 1,
    gameData.minerspurchased = 0,
    gameData.upgrade2Cost = 1000,
    gameData.upgrade2Amount = 0,
    gameData.upgrade3Cost = 15000,
    gameData.upgrade3Amount = 0,
    gameData.hirer = 0,
    gameData.hireCost = 1000,
    gameData.hirerpurchased = 0,
    gameData.hirePower = 1,
    gameData.drillBot = 0,
    gameData.drillBotCost = 2000,
    gameData.drillBotpurchased = 0,
    gameData.drillBotPower = 20,
    gameData.machine = 0,
    gameData.machineCost = 10000,
    gameData.machinepurchased = 0,
    gameData.machinePower = 1,
    gameData.upgrade3 = 1,


    document.getElementById("upgrade3").style.visibility = "visible"
    prestigeData.prestige += 10
    document.getElementById("prestigePoints").innerHTML = prestigeData.prestige + " Prestige Points"
    reset()

  } else {
    // document.getElementById("prestige").innerHTML = "You don't have enough gold to prestige."
  }

  // if (gameData.gold >= 1000) {

  //   gameData.gold = 0,
  //     gameData.goldPerClick = 1,
  //     gameData.goldPerClickCost = 10,
  //     gameData.goldPerClickPurchased = 1,
  //     gameData.miner = 0.0,
  //     gameData.minerCost = 100,
  //     gameData.upgrade1Cost = 100,
  //     gameData.upgrade1Amount = 0,
  //     gameData.minerpower = 1,
  //     gameData.minerspurchased = 0,
  //     gameData.upgrade2Cost = 1000,
  //     gameData.upgrade2Amount = 0,
  //     gameData.upgrade3Cost = 15000,
  //     gameData.upgrade3Amount = 0,
  //     gameData.hirer = 0,
  //     gameData.hireCost = 1000,
  //     gameData.hirerpurchased = 0,
  //     gameData.hirePower = 1,
  //     gameData.drillBot = 0,
  //     gameData.drillBotCost = 2000,
  //     gameData.drillBotpurchased = 0,
  //     gameData.drillBotPower = 20,
  //     gameData.machine = 0,
  //     gameData.machineCost = 10000,
  //     gameData.machinepurchased = 0,
  //     gameData.machinePower = 1,

  //     document.getElementById("upgrade3").style.visibility = "visible"
  //   prestigeData.prestige += 1
  //   document.getElementById("prestigePoints").innerHTML = prestigeData.prestige + " Prestige Points"
  //   reset()

  // }


}

function prestigeU1() {
  if (prestigeData.prestige >= prestigeData.prestigeU1Cost) {
    prestigeData.prestige -= prestigeData.prestigeU1Cost
    prestigeData.prestigeU1Amount += 1
    document.getElementById("prestigeU1").style.visibility = "hidden"
    document.getElementById("prestigePoints").innerHTML = prestigeData.prestige + " Prestige Points"
    // one time purchase
  }
}


function prestigeU2() {
  if (prestigeData.prestigeU2Amount >= 10) {

  } else if (prestigeData.prestige >= prestigeData.prestigeU2Cost) {
    prestigeData.prestige -= prestigeData.prestigeU2Cost
    prestigeData.prestigeU2Amount += 1
    prestigeData.prestigeU2Cost *= 2
    interval -= 10
    document.getElementById("prestigeU2").innerHTML = "Decreases the tickspeed interval by 10%: " + prestigeData.prestigeU2Cost + " Prestige Points (" + prestigeData.prestigeU2Amount + "/10)"
    document.getElementById("tickspeedT").innerHTML = "Tickspeed: " + interval
    document.getElementById("prestigePoints").innerHTML = prestigeData.prestige + " Prestige Points"
  }
}

function prestigeU3() {
  if (prestigeData.prestige >= prestigeData.prestigeU3Cost) {
    prestigeData.prestige -= prestigeData.prestigeU3Cost
    prestigeData.prestigeU3Amount += 1
    document.getElementById("prestigeU3").style.visibility = "hidden"
    document.getElementById("prestigePoints").innerHTML = prestigeData.prestige + " Prestige Points"
    // one time purchase

  }
}



function prestigeU4() {
  if (prestigeData.prestige >= prestigeData.prestigeU4Cost) {
    prestigeData.prestige -= prestigeData.prestigeU4Cost
    prestigeData.prestigeU4Amount += 1
    prestigeData.prestigeU4Cost *=100
    prestigeData.prestigelimit = 1000000000
    document.getElementById("prestigePoints").innerHTML = prestigeData.prestige + " Prestige Points"
  }
}


document.addEventListener('keydown', function (event) {
  if (event.key === "1") {
    move1();
  } else if (event.key === "2") {
    move2()
  } else if (event.key === "3" && document.getElementById("AT").style.visibility == "visible") {
    move3()
  } else if (event.key === "4") {
    move4()

    // && document.getElementById("Pres").style.visibility == "visible" doesnt work in the else if but it does in move3
  }
});
function move1() {
  document.getElementById("buttons").style.display = "grid"
  tab("buttons")
}
function move2() {
  document.getElementById("Upgrades").style.display = "grid"
  tab("Upgrades")
}
function move3() {
  document.getElementById("Achievements").style.display = "grid"
  tab("Achievements")
}
function move4() {
  document.getElementById("Prestige").style.display = "grid"
  tab("Prestige")
}
