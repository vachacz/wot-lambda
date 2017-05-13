package pl.vachacz.mywotstats.lambda.tanks.model.playertankstats;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PlayerTankStatsWrapper {

    @JsonProperty("tank_id")
    private Long tankId;

    @JsonProperty("all")
    private PlayerTankStats tankRatings;


    public Long getTankId() {
        return tankId;
    }

    public void setTankId(Long tankId) {
        this.tankId = tankId;
    }

    public PlayerTankStats getTankRatings() {
        return tankRatings;
    }

    public void setTankRatings(PlayerTankStats tankRatings) {
        this.tankRatings = tankRatings;
    }
}
