package pl.vachacz.wot.lambda.model.dynamo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "wot_player_stats")
public class PlayerStatsEntity {

    @DynamoDBHashKey(attributeName="key")
    private String key;

    @DynamoDBRangeKey(attributeName="import_uuid")
    private String importUuid;

    @DynamoDBAttribute(attributeName="account_id")
    private Long accountId;

    @DynamoDBAttribute(attributeName="stat")
    private String stat;

    @DynamoDBAttribute(attributeName="rank_delta")
    private Long rankDelta;

    @DynamoDBAttribute(attributeName="value")
    private Double value;

    @DynamoDBAttribute(attributeName="rank")
    private Long rank;

    public String getImportUuid() {
        return importUuid;
    }

    public void setImportUuid(String importUuid) {
        this.importUuid = importUuid;
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

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
