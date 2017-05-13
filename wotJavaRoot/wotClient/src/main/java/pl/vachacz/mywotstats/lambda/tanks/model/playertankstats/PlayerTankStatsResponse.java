package pl.vachacz.mywotstats.lambda.tanks.model.playertankstats;

import java.util.List;
import java.util.Map;

public class PlayerTankStatsResponse {

    private Map<String, List<PlayerTankStatsWrapper>> data;

    public Map<String, List<PlayerTankStatsWrapper>> getData() {
        return data;
    }

    public void setData(Map<String, List<PlayerTankStatsWrapper>> data) {
        this.data = data;
    }

    public List<PlayerTankStatsWrapper> getPlayerStats(Long accountId) {
        return data.get(accountId.toString());
    }
}
