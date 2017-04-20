package pl.vachacz.wot.lambda.model.dynamo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "wot_tanks")
public class VehicleEntity {

    @DynamoDBHashKey(attributeName="tank_id")
    private Long tankId;

    @DynamoDBAttribute(attributeName="name")
    private String name;

    @DynamoDBAttribute(attributeName="nation")
    private String nation;

    @DynamoDBAttribute(attributeName="type")
    private String type;

    @DynamoDBAttribute(attributeName="level")
    private Integer level;

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
}
