package pl.vachacz.wot.lambda.model.dynamo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "wot_player_tank_stats")
public class PlayerTankStatsEntity {

    @DynamoDBHashKey(attributeName="composite_key")
    private String key;

    @DynamoDBRangeKey(attributeName="timestamp")
    private Long timestamp;

    private Boolean weeklyStat;
    private Boolean monthlyStat;

    private Long tankId;
    private Long accountId;
    private Integer spotted;
    private Double avgDamageBlocked;
    private Integer capturePoints;
    private Integer explosionHits;
    private Integer piercings;
    private Integer xp;
    private Integer survivedBattles;
    private Integer droppedCapturePoints;
    private Integer damageDealt;
    private Double hitsPercents;
    private Integer draws;
    private Integer battles;
    private Integer damageReceived;
    private Integer frags;
    private Integer directHitsReceived;
    private Integer hits;
    private Double battleAvgXp;
    private Integer wins;
    private Integer losses;
    private Integer piercingsReceived;
    private Integer noDamageDirectHitsReceived;
    private Integer shots;
    private Integer explosionHitsReceived;
    private Double tankingFactor;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Integer getSpotted() {
        return spotted;
    }

    public void setSpotted(Integer spotted) {
        this.spotted = spotted;
    }

    public Double getAvgDamageBlocked() {
        return avgDamageBlocked;
    }

    public void setAvgDamageBlocked(Double avgDamageBlocked) {
        this.avgDamageBlocked = avgDamageBlocked;
    }

    public Integer getCapturePoints() {
        return capturePoints;
    }

    public void setCapturePoints(Integer capturePoints) {
        this.capturePoints = capturePoints;
    }

    public Integer getExplosionHits() {
        return explosionHits;
    }

    public void setExplosionHits(Integer explosionHits) {
        this.explosionHits = explosionHits;
    }

    public Integer getPiercings() {
        return piercings;
    }

    public void setPiercings(Integer piercings) {
        this.piercings = piercings;
    }

    public Integer getXp() {
        return xp;
    }

    public void setXp(Integer xp) {
        this.xp = xp;
    }

    public Integer getSurvivedBattles() {
        return survivedBattles;
    }

    public void setSurvivedBattles(Integer survivedBattles) {
        this.survivedBattles = survivedBattles;
    }

    public Integer getDroppedCapturePoints() {
        return droppedCapturePoints;
    }

    public void setDroppedCapturePoints(Integer droppedCapturePoints) {
        this.droppedCapturePoints = droppedCapturePoints;
    }

    public Integer getDamageDealt() {
        return damageDealt;
    }

    public void setDamageDealt(Integer damageDealt) {
        this.damageDealt = damageDealt;
    }

    public Double getHitsPercents() {
        return hitsPercents;
    }

    public void setHitsPercents(Double hitsPercents) {
        this.hitsPercents = hitsPercents;
    }

    public Integer getDraws() {
        return draws;
    }

    public void setDraws(Integer draws) {
        this.draws = draws;
    }

    public Integer getBattles() {
        return battles;
    }

    public void setBattles(Integer battles) {
        this.battles = battles;
    }

    public Integer getDamageReceived() {
        return damageReceived;
    }

    public void setDamageReceived(Integer damageReceived) {
        this.damageReceived = damageReceived;
    }

    public Integer getFrags() {
        return frags;
    }

    public void setFrags(Integer frags) {
        this.frags = frags;
    }

    public Integer getDirectHitsReceived() {
        return directHitsReceived;
    }

    public void setDirectHitsReceived(Integer directHitsReceived) {
        this.directHitsReceived = directHitsReceived;
    }

    public Integer getHits() {
        return hits;
    }

    public void setHits(Integer hits) {
        this.hits = hits;
    }

    public Double getBattleAvgXp() {
        return battleAvgXp;
    }

    public void setBattleAvgXp(Double battleAvgXp) {
        this.battleAvgXp = battleAvgXp;
    }

    public Integer getWins() {
        return wins;
    }

    public void setWins(Integer wins) {
        this.wins = wins;
    }

    public Integer getLosses() {
        return losses;
    }

    public void setLosses(Integer losses) {
        this.losses = losses;
    }

    public Integer getPiercingsReceived() {
        return piercingsReceived;
    }

    public void setPiercingsReceived(Integer piercingsReceived) {
        this.piercingsReceived = piercingsReceived;
    }

    public Integer getNoDamageDirectHitsReceived() {
        return noDamageDirectHitsReceived;
    }

    public void setNoDamageDirectHitsReceived(Integer noDamageDirectHitsReceived) {
        this.noDamageDirectHitsReceived = noDamageDirectHitsReceived;
    }

    public Integer getShots() {
        return shots;
    }

    public void setShots(Integer shots) {
        this.shots = shots;
    }

    public Integer getExplosionHitsReceived() {
        return explosionHitsReceived;
    }

    public void setExplosionHitsReceived(Integer explosionHitsReceived) {
        this.explosionHitsReceived = explosionHitsReceived;
    }

    public Double getTankingFactor() {
        return tankingFactor;
    }

    public void setTankingFactor(Double tankingFactor) {
        this.tankingFactor = tankingFactor;
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

    public Boolean getWeeklyStat() {
        return weeklyStat;
    }

    public void setWeeklyStat(Boolean weeklyStat) {
        this.weeklyStat = weeklyStat;
    }

    public Boolean getMonthlyStat() {
        return monthlyStat;
    }

    public void setMonthlyStat(Boolean monthlyStat) {
        this.monthlyStat = monthlyStat;
    }
}
