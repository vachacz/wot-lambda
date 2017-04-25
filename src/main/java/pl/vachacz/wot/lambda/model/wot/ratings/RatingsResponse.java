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

    public Long findLongStatValue(String stat) {
        return ratings.stream()
                .filter(r -> r.getStat().equals(stat))
                .map(r -> r.getValue())
                .map(r -> r.longValue())
                .findFirst()
                .get();
    }

    public Double findDoubleStatValue(String stat) {
        return ratings.stream()
                .filter(r -> r.getStat().equals(stat))
                .map(r -> r.getValue())
                .findFirst()
                .get();
    }
}
