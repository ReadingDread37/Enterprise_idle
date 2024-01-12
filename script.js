
let shownHire = false
let Plimit = false
let A1 = false
let interval = 1000
let gameData = {
  gold: 0.0,
  goldPerClick: 1,
  goldPerClickCost: 10,
  goldPerClickPurchased: 1,
  miner: 0.0,
  minerCost: 50,
  upgrade1Cost: 100,
  upgrade1Amount: 0,
  minerpower: 1,
  minerspurchased: 0,
  upgrade2Cost: 1000,
  upgrade2Amount: 0,
  upgrade3Cost: 15000,
  upgrade3Amount: 0,
  hirer: 0,
  hireCost: 500,
  hirerpurchased: 0,
  hirePower: 1,
  A1: 1,
  drillBot: 0,
  drillBotCost: 2000,
  drillBotpurchased: 0,
  drillBotPower: 20,

}

let prestigeData = {
  prestige: 0,
  prestigeU1Cost: 1,
  prestigeU1Amount: 0,
  prestigeU2Cost:1,
  prestigeU2Amount:0,
}

function format(number, type) {
  let exponent = Math.floor(Math.log10(number))
  let mantissa = number / Math.pow(10, exponent)
  if (exponent < 5) return number.toFixed(1)
  if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
  if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

//drill bot  Ui still doesnt update.


function mineGold() {
  gameData.gold += gameData.goldPerClick
  document.getElementById("goldMined").innerHTML = format(gameData.gold, "scientific") + " Gold Mined"
}


function mineGoldTime() {
  gameData.gold += ((gameData.minerpower * gameData.miner) * gameData.A1) + (gameData.drillBot * gameData.drillBotPower)
  document.getElementById("goldTime").innerHTML = format(((gameData.miner * gameData.minerpower) * gameData.A1) + (gameData.drillBot * gameData.drillBotPower), "scientific") + " Gold Mined Per Second"
  document.getElementById("goldMined").innerHTML = format(gameData.gold, "scientific") + " Gold Mined"
}

function hireTime() {
  gameData.miner += gameData.hirer * gameData.hirePower
  document.getElementById("minersH").innerHTML = format((gameData.hirer * gameData.hirePower), "scientific") + " Miners hired Per Second"
  document.getElementById("miners").innerHTML = format(gameData.miner, "scientific") + " Miners"
}

function buyMiner() {
  if (gameData.gold >= gameData.minerCost) {
    gameData.gold -= gameData.minerCost
    gameData.miner += 1
    gameData.minerspurchased += 1
    gameData.minerCost *= 4
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
    gameData.hireCost *= 8
    document.getElementById("minersH").innerHTML = (gameData.hirer * gameData.hirePower) + " Miners Hired Per Second"
    document.getElementById("buyHirer").innerHTML = "Buy another Hirer (Currently Level " + format(gameData.hirerpurchased, "scientific") + ") Cost: " + format(gameData.hireCost, "scientific") + " Gold"
  }
}




function buyGoldPerClick() {
  if (gameData.gold >= gameData.goldPerClickCost) {
    gameData.gold -= gameData.goldPerClickCost
    gameData.goldPerClick += 1
    gameData.goldPerClickPurchased += 1
    gameData.goldPerClickCost *= 2
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClickPurchased + ") Cost: " + format(gameData.goldPerClickCost, "scientific") + " Gold"
  }
}

function reset() {
  document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
 
  document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClickPurchased + ") Cost: " + gameData.goldPerClickCost + " Gold"
  
  document.getElementById("goldTime").innerHTML = (gameData.miner * gameData.minerpower) * gameData.A1 + (gameData.drillBot * gameData.drillBotPower) + " Gold Mined Per Second"
  

  document.getElementById("minersH").innerHTML = (gameData.hirer * gameData.hirePower) + " Miners hired Per Second"
  document.getElementById("miners").innerHTML = gameData.miner + " Miners"
  
  document.getElementById("goldTimeUpgrade").innerHTML = "Buy another Miner (currently Level " + gameData.minerspurchased + ") Cost: " + gameData.minerCost + " Gold"
  
  document.getElementById("miners").innerHTML = gameData.miner + " Miners"
  
  document.getElementById("upgrade1").innerHTML = "Better Minecarts- Doubles Power of Miners (Currently Level " + gameData.upgrade1Amount + ") Cost: " + gameData.upgrade1Cost + " Gold"
  
  document.getElementById("upgrade2").innerHTML = "Better Paper Work Filing- Doubles Power of Hirers (Currently Level " + gameData.upgrade2Amount + ") Cost: " + gameData.upgrade2Cost + " Gold"
  
  document.getElementById("upgrade3").innerHTML = "Buy An Exoskeleton Suit for you (Currently Level " + gameData.upgrade3Amount + ") Cost: " + gameData.upgrade3Cost + " Gold"

  document.getElementById("minersH").innerHTML = gameData.hirer + " Miners Hired Per Second"
  
  document.getElementById("buyHirer").innerHTML = "Buy another Hirer (Currently Level " + format(gameData.hirerpurchased, "scientific") + ") Cost: " + gameData.hireCost + " Gold"
}

function buyDrillBot() {
  if (gameData.gold >= gameData.drillBotCost) {
    gameData.gold -= gameData.drillBotCost
    gameData.drillBot += 1
    gameData.drillBotpurchased += 1
    gameData.drillBotCost *= 6
    document.getElementById("buyDrillBot").innerHTML = "Buy Another DrillBot (Currently Level " + format(gameData.drillBotpurchased, "scientific") + ") Cost: " + format(gameData.drillBotCost, "scientific") + " Gold"
    document.getElementById("drillBot").innerHTML = gameData.drillBot + " DrillBots"
  }
}


// let resetLoop = window.setInterval(function() {
//   reset()
// }, 1)


let mainGameLoop = window.setInterval(function() {

  mineGoldTime()
  hireTime()
  if (gameData.gold >= 10000) {
    A1 = true
    document.getElementById("AT").style.visibility = "visible";
    document.getElementById("AT").style.textAlign = "center";

  } else {
    document.getElementById("AT").style.visibility = "hidden";
  }

  if (A1 == true) {
    gameData.A1 = 1.5
    document.getElementById("A1").style.color = "Green"
    document.getElementById("AT").style.visibility = "visible";
    document.getElementById("AT").style.textAlign = "center";
  }
  if (gameData.gold >= 500) {
    document.getElementById("buyHirer").style.visibility = "visible";
    document.getElementById("buyHirer").style.textAlign = "center";
  }
  if (gameData.gold >= 100000) {
    Plimit = true
    document.getElementById("Pres").style.backgroundColor = "#d4c4f3"
  }else{
    document.getElementById("Pres").style.backgroundColor = "#ecce22"
  }
  // if(Plimit == true){
  //   document.getElementById("Prestige").style.display = "grid"
  // }
  if (prestigeData.prestigeU1Amount >= 1) {
    document.getElementById("buyDrillBot").style.visibility = "visible";
    document.getElementById("buyDrillBot").style.textAlign = "center";
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
    gameData.upgrade2Cost *= 17
    document.getElementById("upgrade2").innerHTML = "Better Paper Work Filing- Doubles Power of Hirers (Currently Level " + gameData.upgrade2Amount + ") Cost: " + format(gameData.upgrade2Cost, "scientific") + " Gold"
  }
}

//fix prestiging: tab stays purple dont let it do that
//on prestige numbers on buttons dont reset
function upgrade3() {
  if (gameData.gold >= gameData.upgrade3Cost) {
    gameData.gold -= gameData.upgrade3Cost
    gameData.upgrade3Amount += 1
    gameData.goldPerClick *= 10
    document.getElementById("upgrade3").style.visibility = "hidden"
    document.getElementById("upgrade3").innerHTML = "Buy An Exoskeleton Suit for you (Currently Level " + gameData.upgrade3Amount + ") Cost: " + format(gameData.upgrade3Cost, "scientific") + " Gold"
  }
}

function tab(tab) {
  // hide all your tabs, then show the one the user selected.
  document.getElementById("buttons").style.display = "none"
  document.getElementById("Upgrades").style.display = "none"
  document.getElementById("Achievements").style.display = "none"
  document.getElementById("Prestige").style.display = "none"
  document.getElementById(tab).style.display = "grid"
}
// go to a tab for the first time, so not all show
tab("buttons")

// var saveGameLoop = window.setInterval(function() {
//   localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
// }, 15000)


// let savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
// if(savegame !== null){
//   gameData = savegame
// }




function prestige() {
  // gameData.gold = 0
  // gameData.goldPerClick = 1,
  //   gameData.goldPerClickCost = 10,
  //   gameData.goldPerClickPurchased = 1,
  //   gameData.miner = 0,
  //   gameData.minerCost = 50,
  //   gameData.upgrade1Cost = 100,
  //   gameData.upgrade1Amount = 0,
  //   gameData.minerpower = 1,
  //   gameData.minerspurchased = 0,
  //   gameData.upgrade2Cost = 1000,
  //   gameData.upgrade2Amount = 0,
  //   gameData.upgrade3Cost = 15000,
  //   gameData.upgrade3Amount = 0,
  //   gameData.hirer = 0,
  //   gameData.hirerCost = 500,
  //   gameData.hirerpurchased = 0,
  //   gameData.hirePower = 1,
  //   gameData.A1 = 1,
  //   gameData.drillBot = 0,
  //   gameData.drillBotCost = 2000,
  //   gameData.drillBotpurchased = 0,
  //   gameData.drillBotPower = 20,

     

    gameData = {
      gold: 0.0,
      goldPerClick: 1,
      goldPerClickCost: 10,
      goldPerClickPurchased: 1,
      miner: 0.0,
      minerCost: 50,
      upgrade1Cost: 100,
      upgrade1Amount: 0,
      minerpower: 1,
      minerspurchased: 0,
      upgrade2Cost: 1000,
      upgrade2Amount: 0,
      upgrade3Cost: 15000,
      upgrade3Amount: 0,
      hirer: 0,
      hireCost: 500,
      hirerpurchased: 0,
      hirePower: 1,
      A1: 1,
      drillBot: 0,
      drillBotCost: 2000,
      drillBotpurchased: 0,
      drillBotPower: 20
    }
  document.getElementById("upgrade3").style.visibility = "visible"
  Plimit = false
  prestigeData.prestige += 1
  reset()
  //make it so buttons go back to defeault maybve using words rather than variables.
}

function prestigeU1() {
  if (prestigeData.prestige >= prestigeData.prestigeU1Cost) {
    prestigeData.prestige -= prestigeData.prestigeU1Cost
    prestigeData.prestigeU1Amount += 1
    document.getElementById("prestigeU1").style.visibility = "hidden"
    // one time purchase
    
  }
}


function prestigeU2() {
  if (prestigeData.prestige >= prestigeData.prestigeU2Cost) {
    prestigeData.prestige -= prestigeData.prestigeU2Cost
    prestigeData.prestigeU2Amount += 1
    prestigeData.prestigeU2Cost *= 2
    interval -= 10
    
  }
}

