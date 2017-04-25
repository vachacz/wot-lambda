package pl.vachacz.wot.lambda.model.dynamo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "wot_player_stats")
public class PlayerStatsEntity {

    @DynamoDBHashKey(attributeName="account_id")
    private Long accountId;

    @DynamoDBRangeKey(attributeName="import_uuid")
    private String importUuid;

    private Long amountXp;
    private Long damageDealt;
    private Double averageXp;
    private Double averageFrags;
    private Double averageDamage;
    private Long battlesCount;
    private Double hitsRatio;
    private Double winsRatio;
    private Double survivedRatio;
    private Double globalRating;
    private Long fragsCount;
    private Long maxXp;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getImportUuid() {
        return importUuid;
    }

    public void setImportUuid(String importUuid) {
        this.importUuid = importUuid;
    }

    public Long getAmountXp() {
        return amountXp;
    }

    public void setAmountXp(Long amountXp) {
        this.amountXp = amountXp;
    }

    public Long getDamageDealt() {
        return damageDealt;
    }

    public void setDamageDealt(Long damageDealt) {
        this.damageDealt = damageDealt;
    }

    public Double getAverageXp() {
        return averageXp;
    }

    public void setAverageXp(Double averageXp) {
        this.averageXp = averageXp;
    }

    public Double getAverageFrags() {
        return averageFrags;
    }

    public void setAverageFrags(Double averageFrags) {
        this.averageFrags = averageFrags;
    }

    public Double getAverageDamage() {
        return averageDamage;
    }

    public void setAverageDamage(Double averageDamage) {
        this.averageDamage = averageDamage;
    }

    public Long getBattlesCount() {
        return battlesCount;
    }

    public void setBattlesCount(Long battlesCount) {
        this.battlesCount = battlesCount;
    }

    public Double getHitsRatio() {
        return hitsRatio;
    }

    public void setHitsRatio(Double hitsRatio) {
        this.hitsRatio = hitsRatio;
    }

    public Double getWinsRatio() {
        return winsRatio;
    }

    public void setWinsRatio(Double winsRatio) {
        this.winsRatio = winsRatio;
    }

    public Double getSurvivedRatio() {
        return survivedRatio;
    }

    public void setSurvivedRatio(Double survivedRatio) {
        this.survivedRatio = survivedRatio;
    }

    public Double getGlobalRating() {
        return globalRating;
    }

    public void setGlobalRating(Double globalRating) {
        this.globalRating = globalRating;
    }

    public Long getFragsCount() {
        return fragsCount;
    }

    public void setFragsCount(Long fragsCount) {
        this.fragsCount = fragsCount;
    }

    public Long getMaxXp() {
        return maxXp;
    }

    public void setMaxXp(Long maxXp) {
        this.maxXp = maxXp;
    }

}
