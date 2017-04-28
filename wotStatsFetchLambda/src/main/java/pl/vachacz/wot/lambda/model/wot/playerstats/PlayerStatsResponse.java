package pl.vachacz.wot.lambda.model.wot.playerstats;

import pl.vachacz.wot.lambda.model.wot.BaseResponse;

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
