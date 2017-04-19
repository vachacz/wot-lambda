package pl.vachacz.wot.lambda.model.ratings;

import pl.vachacz.wot.lambda.model.BaseResponse;

import java.util.List;
import java.util.Map;

public class RatingsResponse extends BaseResponse {

    private List<Rating> ratings;

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

}
