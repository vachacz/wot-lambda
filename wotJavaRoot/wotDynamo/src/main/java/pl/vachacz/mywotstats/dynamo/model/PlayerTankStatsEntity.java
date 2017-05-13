package pl.vachacz.mywotstats.dynamo.model;

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
    private Double avgBattleXp;
    private Integer wins;
    private Integer losses;
    private Integer piercingsReceived;
    private Integer shots;
    private Integer explosionHitsReceived;
    private Double tankingFactor;

    // calculated fields

    private Double wn8;
    private Double drawsRatio;
    private Double winsRatio;
    private Double hitsRatio;
    private Double lossesRatio;
    private Double survivedBattlesRatio;
    private Double avgDamageDealt;
    private Double avgCapturePoints;
    private Double avgDamageReceived;
    private Double avgDirectHitsReceived;
    private Double avgDroppedCapturePoints;
    private Double avgExplosionHits;
    private Double avgExplosionHitsReceived;
    private Double avgFrags;
    private Double avgHits;
    private Double avgSpotted;
    private Double avgShots;
    private Double avgPiercings;
    private Double avgPiercingsReceived;

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

    public Double getAvgBattleXp() {
        return avgBattleXp;
    }

    public void setAvgBattleXp(Double avgBattleXp) {
        this.avgBattleXp = avgBattleXp;
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

    public Double getDrawsRatio() {
        return drawsRatio;
    }

    public void setDrawsRatio(Double drawsRatio) {
        this.drawsRatio = drawsRatio;
    }

    public Double getWinsRatio() {
        return winsRatio;
    }

    public void setWinsRatio(Double winsRatio) {
        this.winsRatio = winsRatio;
    }

    public Double getLossesRatio() {
        return lossesRatio;
    }

    public void setLossesRatio(Double lossesRatio) {
        this.lossesRatio = lossesRatio;
    }

    public Double getSurvivedBattlesRatio() {
        return survivedBattlesRatio;
    }

    public void setSurvivedBattlesRatio(Double survivedBattlesRatio) {
        this.survivedBattlesRatio = survivedBattlesRatio;
    }

    public Double getAvgDamageDealt() {
        return avgDamageDealt;
    }

    public void setAvgDamageDealt(Double avgDamageDealt) {
        this.avgDamageDealt = avgDamageDealt;
    }

    public Double getAvgCapturePoints() {
        return avgCapturePoints;
    }

    public void setAvgCapturePoints(Double avgCapturePoints) {
        this.avgCapturePoints = avgCapturePoints;
    }

    public Double getAvgDamageReceived() {
        return avgDamageReceived;
    }

    public void setAvgDamageReceived(Double avgDamageReceived) {
        this.avgDamageReceived = avgDamageReceived;
    }

    public Double getAvgDirectHitsReceived() {
        return avgDirectHitsReceived;
    }

    public void setAvgDirectHitsReceived(Double avgDirectHitsReceived) {
        this.avgDirectHitsReceived = avgDirectHitsReceived;
    }

    public Double getAvgDroppedCapturePoints() {
        return avgDroppedCapturePoints;
    }

    public void setAvgDroppedCapturePoints(Double avgDroppedCapturePoints) {
        this.avgDroppedCapturePoints = avgDroppedCapturePoints;
    }

    public Double getAvgExplosionHits() {
        return avgExplosionHits;
    }

    public void setAvgExplosionHits(Double avgExplosionHits) {
        this.avgExplosionHits = avgExplosionHits;
    }

    public Double getAvgExplosionHitsReceived() {
        return avgExplosionHitsReceived;
    }

    public void setAvgExplosionHitsReceived(Double avgExplosionHitsReceived) {
        this.avgExplosionHitsReceived = avgExplosionHitsReceived;
    }

    public Double getAvgFrags() {
        return avgFrags;
    }

    public void setAvgFrags(Double avgFrags) {
        this.avgFrags = avgFrags;
    }

    public Double getAvgHits() {
        return avgHits;
    }

    public void setAvgHits(Double avgHits) {
        this.avgHits = avgHits;
    }

    public Double getAvgSpotted() {
        return avgSpotted;
    }

    public void setAvgSpotted(Double avgSpotted) {
        this.avgSpotted = avgSpotted;
    }

    public Double getAvgShots() {
        return avgShots;
    }

    public void setAvgShots(Double avgShots) {
        this.avgShots = avgShots;
    }

    public Double getAvgPiercings() {
        return avgPiercings;
    }

    public void setAvgPiercings(Double avgPiercings) {
        this.avgPiercings = avgPiercings;
    }

    public Double getAvgPiercingsReceived() {
        return avgPiercingsReceived;
    }

    public void setAvgPiercingsReceived(Double avgPiercingsReceived) {
        this.avgPiercingsReceived = avgPiercingsReceived;
    }

    public Double getHitsRatio() {
        return hitsRatio;
    }

    public void setHitsRatio(Double hitsRatio) {
        this.hitsRatio = hitsRatio;
    }

    public Double getWn8() {
        return wn8;
    }

    public void setWn8(Double wn8) {
        this.wn8 = wn8;
    }
}
