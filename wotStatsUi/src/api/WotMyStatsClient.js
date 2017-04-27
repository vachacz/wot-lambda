import axios from 'axios';

const url = "https://api.ipify.org?format=json";

export const getPlayerStats = (component, playerId) => {
  return axios.get("https://c5lu9mesih.execute-api.eu-central-1.amazonaws.com/prod/playerstats?player=" + playerId)
    .then(response => component.setState(response.data));
}

export const getPlayerTankStats = (tankId) => {
  return axios.get(url).then(response => {});
}

