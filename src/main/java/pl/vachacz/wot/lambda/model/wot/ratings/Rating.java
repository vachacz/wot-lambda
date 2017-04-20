package pl.vachacz.wot.lambda.model.wot.ratings;

public class Rating {

    private String stat;
    private Long rankDelta;
    private Double value;
    private Long rank;

    public Rating(String stat, double value) {
        this.stat = stat;
        this.value = value;
    }

    public String getStat() {
        return stat;
    }

    public void setStat(String stat) {
        this.stat = stat;
    }

    public Long getRankDelta() {
        return rankDelta;
    }

    public void setRankDelta(Long rankDelta) {
        this.rankDelta = rankDelta;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Long getRank() {
        return rank;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }
}
