package pl.vachacz.wot.lambda.model.wot.ratings;

import pl.vachacz.wot.lambda.model.wot.BaseResponse;

import java.util.List;

public class RatingsResponse extends BaseResponse {

    private List<Rating> ratings;

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

}
