package pl.vachacz.mywotstats.lambda.tanks.model.playerstats;

import pl.vachacz.mywotstats.lambda.tanks.model.BaseResponse;

import java.util.Map;

public class PlayerStatsResponse extends BaseResponse {

    private Map<String, PlayerStatsWrapper> data;

    public Map<String, PlayerStatsWrapper> getData() {
        return data;
    }

    public void setData(Map<String, PlayerStatsWrapper> data) {
        this.data = data;
    }

    public PlayerStats getStats() {
        return data.values().iterator().next().getStatistics().getPlayerStats();
    }
}
