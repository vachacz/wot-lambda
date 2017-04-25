import axios from 'axios';

const url = "https://api.ipify.org?format=json";

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomArray = () => {
  var array = new Array()
  for (var i = 0; i < getRandomInt(3, 10); i += 1) {
      array.push({
          amountXp: getRandomInt(100, 200), damageDealt: getRandomInt(100, 200),
          averageXp: getRandomInt(100, 200), averageFrags: getRandomInt(100, 200),
          averageDamage: getRandomInt(100, 200), battlesCount: getRandomInt(100, 200),
          hitsRatio: getRandomInt(100, 200), winsRatio: getRandomInt(100, 200),
          survivedRatio: getRandomInt(100, 200), globalRating: getRandomInt(100, 200),
          fragsCount: getRandomInt(100, 200), maxXp: getRandomInt(100, 200)
      });
  }
  return array;
}

export const getPlayerStats = () => {
  // return axios.get(url).then(response => response.data);
  return {
    playerStats: {
      accountId: 12345,
      stats: randomArray()
    }
  }
}

export const getPlayerTankStats = (tankId) => {
  return axios.get(url).then(response => {});
}

