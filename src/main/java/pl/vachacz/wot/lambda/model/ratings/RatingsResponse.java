package pl.vachacz.wot.lambda.model.ratings;

import pl.vachacz.wot.lambda.model.BaseResponse;

import java.util.Map;

public class RatingsResponse extends BaseResponse {

    private Map<String, Map<String, Rating>> data;

    public Map<String, Map<String, Rating>> getData() {
        return data;
    }

    public void setData(Map<String, Map<String, Rating>> data) {
        this.data = data;
    }

    public Map<String, Rating> getPlayerRatings() {
        return data.values().iterator().next();
    }

}
