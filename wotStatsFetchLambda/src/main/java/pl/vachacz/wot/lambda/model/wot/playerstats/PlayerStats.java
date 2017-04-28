package pl.vachacz.wot.lambda.model.wot.playerstats;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PlayerStats {

    private Integer battles;
    private Integer wins;
    private Integer losses;
    private Integer draws;

    private Integer frags;
    private Integer spotted;
    private Integer shots;

    private Integer hits;
    private Integer piercings;

    @JsonProperty("piercings_received")
    private Integer piercingsReceived;

    @JsonProperty("survived_battles")
    private Integer survivedBattles;

    private Integer xp;

    // hits

    @JsonProperty("explosion_hits")
    private Integer explosionHits;

    @JsonProperty("explosion_hits_received")
    private Integer explosionHitsReceived;

    @JsonProperty("direct_hits_received")
    private Integer directHitsReceived;

    // damage

    @JsonProperty("damage_dealt")
    private Integer damageDealt;

    @JsonProperty("damage_received")
    private Integer damageReceived;

    // averages

    @JsonProperty("battle_avg_xp")
    private Double avgBattleXp;

    @JsonProperty("avg_damage_blocked")
    private Double avgDamageBlocked;

    @JsonProperty("avg_damage_assisted")
    private Double avgDamageAssisted;

    @JsonProperty("avg_damage_assisted_radio")
    private Double avgDamageAssistedRadio;

    @JsonProperty("avg_damage_assisted_track")
    private Double avgDamageAssistedTrack;


    // percentage

    @JsonProperty("hits_percents")
    private Double hitsPercents;

    @JsonProperty("no_damage_direct_hits_received")
    private Integer noDamageDirectHitsReceived;

    // capture

    @JsonProperty("capture_points")
    private Integer capturePoints;

    @JsonProperty("dropped_capture_points")
    private Integer droppedCapturePoints;

    // max values

    @JsonProperty("max_damage")
    private Integer maxDamage;

    @JsonProperty("max_xp")
    private Integer maxXp;

    @JsonProperty("max_frags")
    private Integer maxFrags;

    // other

    @JsonProperty("tanking_factor")
    private Double tankingFactor;

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

    public Double getHitsPercents() {
        return hitsPercents;
    }

    public void setHitsPercents(Double hitsPercents) {
        this.hitsPercents = hitsPercents;
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

    public Double getTankingFactor() {
        return tankingFactor;
    }

    public void setTankingFactor(Double tankingFactor) {
        this.tankingFactor = tankingFactor;
    }

}
