package pl.vachacz.wot.lambda.model.wot.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Vehicle {

    @JsonProperty("tank_id")
    private Long tankId;

    @JsonProperty("name_i18n")
    private String name;

    private String nation;
    private String type;
    private Integer level;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTankId() {
        return tankId;
    }

    public void setTankId(Long tankId) {
        this.tankId = tankId;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
