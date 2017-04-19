package pl.vachacz.wot.lambda.model.tankrating;

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
}
