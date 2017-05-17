package pl.vachacz.mywotstats.lambda.tanks;

import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import pl.vachacz.mywotstats.dynamo.WotDynamo;
import pl.vachacz.mywotstats.dynamo.model.PlayerEntity;
import pl.vachacz.mywotstats.dynamo.model.PlayerStatsEntity;
import pl.vachacz.mywotstats.dynamo.model.PlayerTankStatsEntity;
import pl.vachacz.mywotstats.dynamo.model.VehicleEntity;
import pl.vachacz.mywotstats.lambda.tanks.model.playerstats.PlayerStats;
import pl.vachacz.mywotstats.lambda.tanks.model.playerstats.PlayerStatsResponse;
import pl.vachacz.mywotstats.lambda.tanks.model.playertankstats.PlayerTankStats;
import pl.vachacz.mywotstats.lambda.tanks.model.playertankstats.PlayerTankStatsResponse;
import pl.vachacz.mywotstats.lambda.tanks.model.vehicle.Vehicle;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Calendar;
import java.util.Map;
import java.util.Optional;

public class StatsSyncLambdaHandler implements RequestHandler<Request, Response> {

    private WotClient wotClient = new WotClient();
    private WotDynamo wotDynamo = new WotDynamo();

    public Response handleRequest(Request input, Context context) {

        PaginatedScanList<PlayerEntity> players = wotDynamo.getAllPlayers();

        players.forEach(player -> {
            System.out.println("====> Processing player : " + player.getPlayer());
            long startTime = System.currentTimeMillis();

            if (player.getAccountId() == null) {
                Long accountId = wotClient.getAccountId(player.getPlayer());
                player.setAccountId(accountId);
                wotDynamo.save(player);
            }

            long timestamp = Calendar.getInstance().getTimeInMillis();
            savePlayerStats(timestamp, player.getAccountId());
            savePlayerTankStats(timestamp, player.getAccountId());

            System.out.println("====> Finished in " + ((System.currentTimeMillis() - startTime) / 1000) + " seconds");
        });

        return new Response();
    }

    private void savePlayerStats(long timestamp, Long accountId) {
        PlayerStatsResponse playerStats = wotClient.getPlayerStats(accountId);
        PlayerStats stats = playerStats.getStats();

        Optional<Integer> battles = wotDynamo.getBattleCountFromLastStat(accountId);
        if (battles.isPresent() && battles.get().equals(stats.getBattles())) {
            System.out.println("No new battles for player " + accountId + " found. Skipping.");
            return;
        }

        double battlesDouble = new Double(stats.getBattles());

        PlayerStatsEntity entity = new PlayerStatsEntity();
        entity.setAccountId(accountId);
        entity.setTimestamp(timestamp);

        entity.setBattles(stats.getBattles());

        entity.setWins(stats.getWins());
        entity.setWinsRatio(scale2(100 * stats.getWins() / battlesDouble));

        entity.setLosses(stats.getLosses());
        entity.setLossesRatio(scale2(100 * stats.getLosses() / battlesDouble));

        entity.setDraws(stats.getDraws());
        entity.setDrawsRatio(scale2(100 * stats.getDraws() / battlesDouble));

        entity.setFrags(stats.getFrags());
        entity.setAvgFrags(scale3(stats.getFrags() / battlesDouble));

        entity.setSpotted(stats.getSpotted());
        entity.setAvgSpotted(scale3(stats.getSpotted() / battlesDouble));

        entity.setShots(stats.getShots());
        entity.setAvgShots(scale3(stats.getShots() / battlesDouble));

        entity.setHits(stats.getHits());
        entity.setAvgHits(scale3(stats.getHits() / battlesDouble));
        entity.setHitsRatio(scale2(100 * stats.getHits() / new Double(stats.getShots())));

        entity.setPiercings(stats.getPiercings());
        entity.setAvgPiercings(scale3(stats.getPiercings() / battlesDouble));

        entity.setPiercingsReceived(stats.getPiercingsReceived());
        entity.setAvgPiercingsReceived(scale3(stats.getPiercingsReceived() / battlesDouble));

        entity.setSurvivedBattles(stats.getSurvivedBattles());
        entity.setSurvivedBattlesRatio(scale2(100 * stats.getSurvivedBattles() / battlesDouble));

        entity.setXp(stats.getXp());
        entity.setAvgBattleXp(stats.getAvgBattleXp());

        entity.setDamageDealt(stats.getDamageDealt());
        entity.setAvgDamageDealt(scale2(stats.getDamageDealt() / battlesDouble));

        entity.setDamageReceived(stats.getDamageReceived());
        entity.setAvgDamageReceived(scale2(stats.getDamageReceived() / battlesDouble));

        entity.setDirectHitsReceived(stats.getDirectHitsReceived());
        entity.setAvgDirectHitsReceived(scale3(stats.getDirectHitsReceived() / battlesDouble));

        entity.setExplosionHits(stats.getExplosionHits());
        entity.setAvgExplosionHits(scale3(stats.getExplosionHits() / battlesDouble));

        entity.setExplosionHitsReceived(stats.getExplosionHitsReceived());
        entity.setAvgExplosionHitsReceived(scale3(stats.getExplosionHitsReceived() / battlesDouble));

        entity.setAvgDamageBlocked(stats.getAvgDamageBlocked());
        entity.setAvgDamageAssisted(stats.getAvgDamageAssisted());
        entity.setAvgDamageAssistedRadio(stats.getAvgDamageAssistedRadio());
        entity.setAvgDamageAssistedTrack(stats.getAvgDamageAssistedTrack());

        entity.setCapturePoints(stats.getCapturePoints());
        entity.setAvgCapturePoints(scale2(stats.getCapturePoints() / battlesDouble));

        entity.setDroppedCapturePoints(stats.getDroppedCapturePoints());
        entity.setAvgDroppedCapturePoints(scale2(stats.getDroppedCapturePoints() / battlesDouble));

        entity.setMaxDamage(stats.getMaxDamage());
        entity.setMaxXp(stats.getMaxXp());
        entity.setMaxFrags(stats.getMaxFrags());

        wotDynamo.save(entity);
    }

    private void savePlayerTankStats(long timestamp, Long accountId) {
        Map<Long, VehicleEntity> vehiclesMap = wotDynamo.getAllVehiclesAsMap();
        PlayerTankStatsResponse playerTankStats = wotClient.getPlayerTankStats(accountId);
        playerTankStats.getPlayerStats(accountId).forEach(s -> {

            PlayerTankStatsEntity tankEntity = new PlayerTankStatsEntity();
            tankEntity.setTimestamp(timestamp);
            tankEntity.setAccountId(accountId);
            tankEntity.setTankId(s.getTankId());
            tankEntity.setKey(accountId + "|" + s.getTankId());

            PlayerTankStats tankStats = s.getTankRatings();

            Optional<Integer> battles = wotDynamo.getTankBattleCountFromLastStat(accountId, s.getTankId());
            if (battles.isPresent() && battles.get().equals(tankStats.getBattles())) {
                System.out.println("No new battles for [player:" + accountId + "] and [tank:" + s.getTankId() + "] found. Skipping.");
                return;
            }

            if (tankStats.getBattles().equals(0)) {
                System.out.println("Tank has no battles. [player: " + accountId + "] and [Tank: " + s.getTankId() + "]. Skipping.");
                return;
            }

            Double battlesDouble = new Double(tankStats.getBattles());

            tankEntity.setBattles(tankStats.getBattles());

            tankEntity.setDraws(tankStats.getDraws());
            tankEntity.setDrawsRatio(scale2(100 * tankStats.getDraws() / battlesDouble));

            tankEntity.setWins(tankStats.getWins());
            tankEntity.setWinsRatio(scale2(100 * tankStats.getWins() / battlesDouble));

            tankEntity.setLosses(tankStats.getLosses());
            tankEntity.setLossesRatio(scale2(100 * tankStats.getLosses() / battlesDouble));

            tankEntity.setSurvivedBattles(tankStats.getSurvivedBattles());
            tankEntity.setSurvivedBattlesRatio(scale2(100 * tankStats.getSurvivedBattles() / battlesDouble));

            tankEntity.setXp(tankStats.getXp());
            tankEntity.setAvgBattleXp(tankStats.getBattleAvgXp());

            tankEntity.setAvgDamageBlocked(tankStats.getAvgDamageBlocked());

            tankEntity.setDamageDealt(tankStats.getDamageDealt());
            tankEntity.setAvgDamageDealt(scale2(tankStats.getDamageDealt() / battlesDouble));

            tankEntity.setCapturePoints(tankStats.getCapturePoints());
            tankEntity.setAvgCapturePoints(scale2(tankStats.getCapturePoints() / battlesDouble));

            tankEntity.setDamageReceived(tankStats.getDamageReceived());
            tankEntity.setAvgDamageReceived(scale2(tankStats.getDamageReceived() / battlesDouble));

            tankEntity.setDirectHitsReceived(tankStats.getDirectHitsReceived());
            tankEntity.setAvgDirectHitsReceived(scale2(tankStats.getDirectHitsReceived() / battlesDouble));

            tankEntity.setDroppedCapturePoints(tankStats.getDroppedCapturePoints());
            tankEntity.setAvgDroppedCapturePoints(scale2(tankStats.getDroppedCapturePoints() / battlesDouble));

            tankEntity.setExplosionHits(tankStats.getExplosionHits());
            tankEntity.setAvgExplosionHits(scale3(tankStats.getExplosionHits() / battlesDouble));

            tankEntity.setExplosionHitsReceived(tankStats.getExplosionHitsReceived());
            tankEntity.setAvgExplosionHitsReceived(scale3(tankStats.getExplosionHitsReceived() / battlesDouble));

            tankEntity.setFrags(tankStats.getFrags());
            tankEntity.setAvgFrags(scale3(tankStats.getFrags() / battlesDouble));

            tankEntity.setHits(tankStats.getHits());
            tankEntity.setAvgHits(scale3(tankStats.getHits() / battlesDouble));
            tankEntity.setHitsRatio(scale2(100 * tankStats.getHits() / new Double(tankStats.getShots())));

            tankEntity.setSpotted(tankStats.getSpotted());
            tankEntity.setAvgSpotted(scale3(tankStats.getSpotted() / battlesDouble));

            tankEntity.setShots(tankStats.getShots());
            tankEntity.setAvgShots(scale3(tankStats.getShots() / battlesDouble));

            tankEntity.setPiercings(tankStats.getPiercings());
            tankEntity.setAvgPiercings(scale3(tankStats.getPiercings() / battlesDouble));

            tankEntity.setPiercingsReceived(tankStats.getPiercingsReceived());
            tankEntity.setAvgPiercingsReceived(scale3(tankStats.getPiercingsReceived() / battlesDouble));

            tankEntity.setWn8(scale2(computeWn8(tankEntity, vehiclesMap)));

            wotDynamo.save(tankEntity);
        });
    }

    private Double computeWn8(PlayerTankStatsEntity tankEntity, Map<Long, VehicleEntity> vehiclesMap) {

        VehicleEntity vehicle = vehiclesMap.get(tankEntity.getTankId());

        Double rDAMAGE = tankEntity.getAvgDamageDealt() / vehicle.getExpDamage();
        Double rSPOT   = tankEntity.getAvgSpotted() / vehicle.getExpSpot();
        Double rFRAG   = tankEntity.getAvgFrags() / vehicle.getExpFrag();
        Double rDEF    = tankEntity.getAvgDroppedCapturePoints() / vehicle.getExpDef();
        Double rWIN    = tankEntity.getWinsRatio() / vehicle.getExpWinRate();

        Double rWINc    = Math.max(0,                     (rWIN    - 0.71) / (1 - 0.71) );
        Double rDAMAGEc = Math.max(0,                     (rDAMAGE - 0.22) / (1 - 0.22) );
        Double rFRAGc   = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG   - 0.12) / (1 - 0.12)));
        Double rSPOTc   = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT   - 0.38) / (1 - 0.38)));
        Double rDEFc    = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF    - 0.10) / (1 - 0.10)));

        return 980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145 * Math.min(1.8, rWINc);
    }

    private Double scale2(Double toBeTruncated) {
        if (toBeTruncated == null || Double.isNaN(toBeTruncated)) {
            return null;
        }
        return BigDecimal.valueOf(toBeTruncated).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    private Double scale3(Double toBeTruncated) {
        if (toBeTruncated == null || Double.isNaN(toBeTruncated)) {
            return null;
        }
        return BigDecimal.valueOf(toBeTruncated).setScale(3, RoundingMode.HALF_UP).doubleValue();
    }

    public static void main(String[] args) {
        new StatsSyncLambdaHandler().handleRequest(null, null);
    }

}
