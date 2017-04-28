import axios from 'axios';

const baseurl = "https://c5lu9mesih.execute-api.eu-central-1.amazonaws.com/prod";

export const getPlayers = (component) => {
  return axios.get(baseurl + "/players")
    .then(response => component.setState(response.data));
}

export const getPlayerStats = (component, playerId) => {
  return axios.get(baseurl + "/playerstats/" + playerId)
    .then(response => component.setState(response.data));
}

export var initialVisibleColumnGroups = [ "avgs", "ratios" ];

