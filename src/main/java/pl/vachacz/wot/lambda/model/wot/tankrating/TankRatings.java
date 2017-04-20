package pl.vachacz.wot.lambda.model.wot.tankrating;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TankRatings {

    private Integer spotted;

    @JsonProperty("avg_damage_blocked")
    private Double avgDamageBlocked;

    @JsonProperty("capture_points")
    private Integer capturePoints;

    @JsonProperty("explosion_hits")
    private Integer explosionHits;
    private Integer piercings;
    private Integer xp;

    @JsonProperty("survived_battles")
    private Integer survivedBattles;

    @JsonProperty("dropped_capture_points")
    private Integer droppedCapturePoints;

    @JsonProperty("damage_dealt")
    private Integer damageDealt;

    @JsonProperty("hits_percents")
    private Double hitsPercents;
    private Integer draws;
    private Integer battles;

    @JsonProperty("damage_received")
    private Integer damageReceived;
    private Integer frags;

    @JsonProperty("direct_hits_received")
    private Integer directHitsReceived;
    private Integer hits;

    @JsonProperty("battle_avg_xp")
    private Double battleAvgXp;
    private Integer wins;
    private Integer losses;

    @JsonProperty("piercings_received")
    private Integer piercingsReceived;

    @JsonProperty("no_damage_direct_hits_received")
    private Integer noDamageDirectHitsReceived;
    private Integer shots;

    @JsonProperty("explosion_hits_received")
    private Integer explosionHitsReceived;

    @JsonProperty("tanking_factor")
    private Double tankingFactor;

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
}
