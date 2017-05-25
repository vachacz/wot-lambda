package pl.vachacz.mywotstats.dynamo.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "wot_player_tanks")
public class PlayerTankEntity {

    @DynamoDBHashKey(attributeName="account_id")
    private Long accountId;

    @DynamoDBRangeKey(attributeName = "tank_id")
    private Long tankId;

    private Long timestamp;
    private Integer battles;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getTankId() {
        return tankId;
    }

    public void setTankId(Long tankId) {
        this.tankId = tankId;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getBattles() {
        return battles;
    }

    public void setBattles(Integer battles) {
        this.battles = battles;
    }
}
