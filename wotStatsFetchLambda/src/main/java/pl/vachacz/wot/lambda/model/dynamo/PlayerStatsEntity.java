package pl.vachacz.wot.lambda.model.dynamo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fasterxml.jackson.annotation.JsonProperty;

@DynamoDBTable(tableName = "wot_player_stats")
public class PlayerStatsEntity {

    @DynamoDBHashKey(attributeName="account_id")
    private Long accountId;

    @DynamoDBRangeKey(attributeName="timestamp")
    private Long timestamp;

    private Boolean weeklyStat;
    private Boolean monthlyStat;

    // stats

    private Integer battles;
    private Integer wins;
    private Integer losses;
    private Integer draws;

    private Integer frags;
    private Integer spotted;
    private Integer shots;

    private Integer hits;
    private Integer piercings;

    private Integer piercingsReceived;
    private Integer survivedBattles;

    private Integer xp;
    private Integer explosionHits;
    private Integer explosionHitsReceived;

    private Integer directHitsReceived;
    private Integer damageDealt;
    private Integer damageReceived;

    private Double avgBattleXp;
    private Double avgDamageBlocked;
    private Double avgDamageAssisted;
    private Double avgDamageAssistedRadio;
    private Double avgDamageAssistedTrack;

    private Integer noDamageDirectHitsReceived;

    private Integer capturePoints;
    private Integer droppedCapturePoints;

    private Integer maxDamage;
    private Integer maxXp;
    private Integer maxFrags;

    // additional calculated fields

    private Double winsRatio;
    private Double lossesRatio;
    private Double drawsRatio;
    private Double avgFrags;
    private Double avgSpotted;
    private Double avgShots;
    private Double avgHits;
    private Double hitsRatio;
    private Double avgPiercings;
    private Double avgPiercingsReceived;
    private Double survivedBattlesRatio;
    private Double avgDamageDealt;
    private Double avgDirectHitsReceived;
    private Double avgDamageReceived;
    private Double avgExplosionHits;
    private Double avgExplosionHitsReceived;
    private Double avgCapturePoints;
    private Double avgDroppedCapturePoints;

    public Double getLossesRatio() {
        return lossesRatio;
    }

    public void setLossesRatio(Double lossesRatio) {
        this.lossesRatio = lossesRatio;
    }

    public Double getDrawsRatio() {
        return drawsRatio;
    }

    public void setDrawsRatio(Double drawsRatio) {
        this.drawsRatio = drawsRatio;
    }

    public Double getAvgFrags() {
        return avgFrags;
    }

    public void setAvgFrags(Double avgFrags) {
        this.avgFrags = avgFrags;
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

    public Double getAvgHits() {
        return avgHits;
    }

    public void setAvgHits(Double avgHits) {
        this.avgHits = avgHits;
    }

    public Double getHitsRatio() {
        return hitsRatio;
    }

    public void setHitsRatio(Double hitsRatio) {
        this.hitsRatio = hitsRatio;
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

    public Double getAvgDirectHitsReceived() {
        return avgDirectHitsReceived;
    }

    public void setAvgDirectHitsReceived(Double avgDirectHitsReceived) {
        this.avgDirectHitsReceived = avgDirectHitsReceived;
    }

    public Double getAvgDamageReceived() {
        return avgDamageReceived;
    }

    public void setAvgDamageReceived(Double avgDamageReceived) {
        this.avgDamageReceived = avgDamageReceived;
    }

    public Double getAvgExplosionHitsReceived() {
        return avgExplosionHitsReceived;
    }

    public void setAvgExplosionHitsReceived(Double avgExplosionHitsReceived) {
        this.avgExplosionHitsReceived = avgExplosionHitsReceived;
    }

    public Double getAvgCapturePoints() {
        return avgCapturePoints;
    }

    public void setAvgCapturePoints(Double avgCapturePoints) {
        this.avgCapturePoints = avgCapturePoints;
    }

    public Double getAvgDroppedCapturePoints() {
        return avgDroppedCapturePoints;
    }

    public void setAvgDroppedCapturePoints(Double avgDroppedCapturePoints) {
        this.avgDroppedCapturePoints = avgDroppedCapturePoints;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
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

    public Integer getBattles() {
        return battles;
    }

    public void setBattles(Integer battles) {
        this.battles = battles;
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

    public Integer getDraws() {
        return draws;
    }

    public void setDraws(Integer draws) {
        this.draws = draws;
    }

    public Integer getFrags() {
        return frags;
    }

    public void setFrags(Integer frags) {
        this.frags = frags;
    }

    public Integer getSpotted() {
        return spotted;
    }

    public void setSpotted(Integer spotted) {
        this.spotted = spotted;
    }

    public Integer getShots() {
        return shots;
    }

    public void setShots(Integer shots) {
        this.shots = shots;
    }

    public Integer getHits() {
        return hits;
    }

    public void setHits(Integer hits) {
        this.hits = hits;
    }

    public Integer getPiercings() {
        return piercings;
    }

    public void setPiercings(Integer piercings) {
        this.piercings = piercings;
    }

    public Integer getPiercingsReceived() {
        return piercingsReceived;
    }

    public void setPiercingsReceived(Integer piercingsReceived) {
        this.piercingsReceived = piercingsReceived;
    }

    public Integer getSurvivedBattles() {
        return survivedBattles;
    }

    public void setSurvivedBattles(Integer survivedBattles) {
        this.survivedBattles = survivedBattles;
    }

    public Integer getXp() {
        return xp;
    }

    public void setXp(Integer xp) {
        this.xp = xp;
    }

    public Integer getExplosionHits() {
        return explosionHits;
    }

    public void setExplosionHits(Integer explosionHits) {
        this.explosionHits = explosionHits;
    }

    public Integer getExplosionHitsReceived() {
        return explosionHitsReceived;
    }

    public void setExplosionHitsReceived(Integer explosionHitsReceived) {
        this.explosionHitsReceived = explosionHitsReceived;
    }

    public Integer getDirectHitsReceived() {
        return directHitsReceived;
    }

    public void setDirectHitsReceived(Integer directHitsReceived) {
        this.directHitsReceived = directHitsReceived;
    }

    public Integer getDamageDealt() {
        return damageDealt;
    }

    public void setDamageDealt(Integer damageDealt) {
        this.damageDealt = damageDealt;
    }

    public Integer getDamageReceived() {
        return damageReceived;
    }

    public void setDamageReceived(Integer damageReceived) {
        this.damageReceived = damageReceived;
    }

    public Double getAvgBattleXp() {
        return avgBattleXp;
    }

    public void setAvgBattleXp(Double avgBattleXp) {
        this.avgBattleXp = avgBattleXp;
    }

    public Double getAvgDamageBlocked() {
        return avgDamageBlocked;
    }

    public void setAvgDamageBlocked(Double avgDamageBlocked) {
        this.avgDamageBlocked = avgDamageBlocked;
    }

    public Double getAvgDamageAssisted() {
        return avgDamageAssisted;
    }

    public void setAvgDamageAssisted(Double avgDamageAssisted) {
        this.avgDamageAssisted = avgDamageAssisted;
    }

    public Double getAvgDamageAssistedRadio() {
        return avgDamageAssistedRadio;
    }

    public void setAvgDamageAssistedRadio(Double avgDamageAssistedRadio) {
        this.avgDamageAssistedRadio = avgDamageAssistedRadio;
    }

    public Double getAvgDamageAssistedTrack() {
        return avgDamageAssistedTrack;
    }

    public void setAvgDamageAssistedTrack(Double avgDamageAssistedTrack) {
        this.avgDamageAssistedTrack = avgDamageAssistedTrack;
    }

    public Integer getNoDamageDirectHitsReceived() {
        return noDamageDirectHitsReceived;
    }

    public void setNoDamageDirectHitsReceived(Integer noDamageDirectHitsReceived) {
        this.noDamageDirectHitsReceived = noDamageDirectHitsReceived;
    }

    public Integer getCapturePoints() {
        return capturePoints;
    }

    public void setCapturePoints(Integer capturePoints) {
        this.capturePoints = capturePoints;
    }

    public Integer getDroppedCapturePoints() {
        return droppedCapturePoints;
    }

    public void setDroppedCapturePoints(Integer droppedCapturePoints) {
        this.droppedCapturePoints = droppedCapturePoints;
    }

    public Integer getMaxDamage() {
        return maxDamage;
    }

    public void setMaxDamage(Integer maxDamage) {
        this.maxDamage = maxDamage;
    }

    public Integer getMaxXp() {
        return maxXp;
    }

    public void setMaxXp(Integer maxXp) {
        this.maxXp = maxXp;
    }

    public Integer getMaxFrags() {
        return maxFrags;
    }

    public void setMaxFrags(Integer maxFrags) {
        this.maxFrags = maxFrags;
    }

    public Double getWinsRatio() {
        return winsRatio;
    }

    public void setWinsRatio(Double winsRatio) {
        this.winsRatio = winsRatio;
    }

    public Double getAvgExplosionHits() {
        return avgExplosionHits;
    }

    public void setAvgExplosionHits(Double avgExplosionHits) {
        this.avgExplosionHits = avgExplosionHits;
    }
}
