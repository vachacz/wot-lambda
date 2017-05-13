package pl.vachacz.mywotstats.dynamo.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "wot_vehicles")
public class VehicleEntity {

    @DynamoDBHashKey(attributeName = "tank_id")
    private Long tankId;

    @DynamoDBAttribute
    private String name;

    @DynamoDBAttribute
    private String nation;

    @DynamoDBAttribute
    private String type;

    @DynamoDBAttribute
    private Integer level;

    @DynamoDBAttribute
    private Double expFrag;

    @DynamoDBAttribute
    private Double expDamage;

    @DynamoDBAttribute
    private Double expSpot;

    @DynamoDBAttribute
    private Double expDef;

    @DynamoDBAttribute
    private Double expWinRate;

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

    public Long getTankId() {
        return tankId;
    }

    public void setTankId(Long tankId) {
        this.tankId = tankId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Double getExpFrag() {
        return expFrag;
    }

    public void setExpFrag(Double expFrag) {
        this.expFrag = expFrag;
    }
}
