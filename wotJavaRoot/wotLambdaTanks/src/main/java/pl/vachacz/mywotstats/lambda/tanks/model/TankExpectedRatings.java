package pl.vachacz.mywotstats.lambda.tanks.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TankExpectedRatings {

    @JsonProperty("IDNum")
    private Long IDNum;
    private Double expFrag;
    private Double expDamage;
    private Double expSpot;
    private Double expDef;
    private Double expWinRate;

    public Long getIDNum() {
        return IDNum;
    }

    public void setIDNum(Long IDNum) {
        this.IDNum = IDNum;
    }

    public Double getExpFrag() {
        return expFrag;
    }

    public void setExpFrag(Double expFrag) {
        this.expFrag = expFrag;
    }

    public Double getExpDamage() {
        return expDamage;
    }

    public void setExpDamage(Double expDamage) {
        this.expDamage = expDamage;
    }

    public Double getExpSpot() {
        return expSpot;
    }

    public void setExpSpot(Double expSpot) {
        this.expSpot = expSpot;
    }

    public Double getExpDef() {
        return expDef;
    }

    public void setExpDef(Double expDef) {
        this.expDef = expDef;
    }

    public Double getExpWinRate() {
        return expWinRate;
    }

    public void setExpWinRate(Double expWinRate) {
        this.expWinRate = expWinRate;
    }

}
