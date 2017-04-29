import axios from 'axios';

const baseurl = "https://c5lu9mesih.execute-api.eu-central-1.amazonaws.com/prod";

export const getPlayers = (callback) => {
  return axios.get(baseurl + "/players").then(response => callback(response.data));
}

export const getPlayerStats = (playerId, callback) => {
  return axios.get(baseurl + "/playerstats/" + playerId).then(response => callback(response.data));
}

export var initialVisibleColumnGroups = [ "avgs", "ratios" ];

