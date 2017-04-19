package pl.vachacz.wot.lambda.model.ratings;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Rating {

    @JsonProperty("rank_delta")
    private Integer rankDelta;

    @JsonProperty("value")
    private Double value;

    @JsonProperty("rank")
    private Integer rank;

    public Integer getRankDelta() {
        return rankDelta;
    }

    public void setRankDelta(Integer rankDelta) {
        this.rankDelta = rankDelta;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }
}
