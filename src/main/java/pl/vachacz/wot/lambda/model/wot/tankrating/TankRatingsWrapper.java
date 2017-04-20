package pl.vachacz.wot.lambda.model.wot.tankrating;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TankRatingsWrapper {

    @JsonProperty("tank_id")
    private Long tankId;

    @JsonProperty("all")
    private TankRatings tankRatings;


    public Long getTankId() {
        return tankId;
    }

    public void setTankId(Long tankId) {
        this.tankId = tankId;
    }

    public TankRatings getTankRatings() {
        return tankRatings;
    }

    public void setTankRatings(TankRatings tankRatings) {
        this.tankRatings = tankRatings;
    }
}
