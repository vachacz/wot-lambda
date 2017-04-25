package pl.vachacz.wot.lambda.model.wot.tankrating;

import java.util.List;
import java.util.Map;

public class TankRatingsResponse {

    private Map<String, List<TankRatingsWrapper>> data;

    public Map<String, List<TankRatingsWrapper>> getData() {
        return data;
    }

    public void setData(Map<String, List<TankRatingsWrapper>> data) {
        this.data = data;
    }

    public List<TankRatingsWrapper> getPlayerStats(Long accountId) {
        return data.get(accountId.toString());
    }
}
