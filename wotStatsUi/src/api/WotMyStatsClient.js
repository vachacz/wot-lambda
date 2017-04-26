import axios from 'axios';

const url = "https://api.ipify.org?format=json";

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomArray = () => {
  var array = new Array()
  var stat = {
    amountXp: getRandomInt(10000, 11000),
    damageDealt: getRandomInt(20000, 20000),
    fragsCount: getRandomInt(1200, 1800),
    battlesCount: getRandomInt(600, 1000),
  };
  for (var i = 0; i < getRandomInt(3, 10); i += 1) {
      stat = {
          amountXp: stat.amountXp - getRandomInt(1000, 1100),
          damageDealt: stat.damageDealt - getRandomInt(1000, 2000),
          fragsCount: stat.fragsCount - getRandomInt(100, 150),
          averageXp: getRandomInt(100, 110),
          averageFrags: getRandomInt(100, 200),
          averageDamage: getRandomInt(100, 110),
          battlesCount: stat.battlesCount - getRandomInt(50, 100),
          hitsRatio: getRandomInt(100, 111),
          winsRatio: getRandomInt(100, 200),
          survivedRatio: getRandomInt(100, 110),
          globalRating: getRandomInt(100, 200),
          maxXp: 1402
      }
      array.push(stat);
  }
  return array;
}

export const getPlayerStats = (component) => {
  return axios.get("https://c5lu9mesih.execute-api.eu-central-1.amazonaws.com/prod/playerstats")
    .then(response => component.setState(response.data));
//  return {
//    playerStats: randomArray()
//  }
}

export const getPlayerTankStats = (tankId) => {
  return axios.get(url).then(response => {});
}

