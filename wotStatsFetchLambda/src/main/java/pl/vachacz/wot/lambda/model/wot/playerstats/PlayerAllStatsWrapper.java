package pl.vachacz.wot.lambda.model.wot.playerstats;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PlayerAllStatsWrapper {

    @JsonProperty("all")
    private PlayerStats playerStats;

    public PlayerStats getPlayerStats() {
        return playerStats;
    }

    public void setPlayerStats(PlayerStats playerStats) {
        this.playerStats = playerStats;
    }

}
