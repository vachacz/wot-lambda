package pl.vachacz.wot.lambda;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import pl.vachacz.wot.lambda.model.dynamo.PlayerEntity;
import pl.vachacz.wot.lambda.model.dynamo.PlayerStatsEntity;
import pl.vachacz.wot.lambda.model.dynamo.PlayerTankStatsEntity;
import pl.vachacz.wot.lambda.model.dynamo.VehicleEntity;
import pl.vachacz.wot.lambda.model.wot.playerstats.PlayerStats;
import pl.vachacz.wot.lambda.model.wot.playerstats.PlayerStatsResponse;
import pl.vachacz.wot.lambda.model.wot.playertankstats.PlayerTankStats;
import pl.vachacz.wot.lambda.model.wot.playertankstats.PlayerTankStatsResponse;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

public class WotSyncLambdaHandler implements RequestHandler<Request, Response> {

    private AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
        .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("http://dynamodb.eu-central-1.amazonaws.com", "eu-central-1"))
        .build();

    private DynamoDBMapper mapper = new DynamoDBMapper(client);

    public Response handleRequest(Request input, Context context) {

        WotClient wotClient = new WotClient();

        wotClient.getVehicles().getVehicleList().forEach(s -> {
            VehicleEntity loaded = mapper.load(VehicleEntity.class, s.getTankId());
            if (loaded == null) {
                VehicleEntity entity = new VehicleEntity();
                entity.setTankId(s.getTankId());
                entity.setLevel(s.getLevel());
                entity.setName(s.getName());
                entity.setType(s.getType());

                mapper.save(entity);
            }
        });

        DynamoDBScanExpression scan = new DynamoDBScanExpression();
        PaginatedScanList<PlayerEntity> players = mapper.scan(PlayerEntity.class, scan);

        players.forEach(player -> {
            System.out.println("====> Processing player : " + player.getPlayer());
            long startTime = System.currentTimeMillis();

            if (player.getAccountId() == null) {
                Long accountId = wotClient.getAccountId(player.getPlayer());
                player.setAccountId(accountId);
                mapper.save(player);
            }

            long timestamp = Calendar.getInstance().getTimeInMillis();
            savePlayerStats(wotClient, timestamp, player.getAccountId());
            savePlayerTankStats(wotClient, timestamp, player.getAccountId());

            long endTime = System.currentTimeMillis();
            System.out.println("====> Finished in " + ((System.currentTimeMillis() - startTime) / 1000) + " seconds");
        });

        return new Response();
    }

    private void savePlayerStats(WotClient wotClient, long timestamp, Long accountId) {
        PlayerStatsResponse playerStats = wotClient.getPlayerStats(accountId);
        PlayerStats stats = playerStats.getStats();

        Optional<Integer> battles = getBattleCountFromLastStat(accountId);
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
        entity.setWinsRatio(scale(100 * stats.getWins() / battlesDouble));

        entity.setLosses(stats.getLosses());
        entity.setLossesRatio(scale(100 * stats.getLosses() / battlesDouble));

        entity.setDraws(stats.getDraws());
        entity.setDrawsRatio(scale(100 * stats.getDraws() / battlesDouble));

        entity.setFrags(stats.getFrags());
        entity.setAvgFrags(scale(stats.getFrags() / battlesDouble));

        entity.setSpotted(stats.getSpotted());
        entity.setAvgSpotted(scale(stats.getSpotted() / battlesDouble));

        entity.setShots(stats.getShots());
        entity.setAvgShots(scale(stats.getShots() / battlesDouble));

        entity.setHits(stats.getHits());
        entity.setAvgHits(scale(stats.getHits() / battlesDouble));
        entity.setHitsRatio(scale(100 * stats.getHits() / new Double(stats.getShots())));

        entity.setPiercings(stats.getPiercings());
        entity.setAvgPiercings(scale(stats.getPiercings() / battlesDouble));

        entity.setPiercingsReceived(stats.getPiercingsReceived());
        entity.setAvgPiercingsReceived(scale(stats.getPiercingsReceived() / battlesDouble));

        entity.setSurvivedBattles(stats.getSurvivedBattles());
        entity.setSurvivedBattlesRatio(scale(100 * stats.getSurvivedBattles() / battlesDouble));

        entity.setXp(stats.getXp());
        entity.setAvgBattleXp(stats.getAvgBattleXp());

        entity.setDamageDealt(stats.getDamageDealt());
        entity.setAvgDamageDealt(scale(stats.getDamageDealt() / battlesDouble));

        entity.setDamageReceived(stats.getDamageReceived());
        entity.setAvgDamageReceived(scale(stats.getDamageReceived() / battlesDouble));

        entity.setDirectHitsReceived(stats.getDirectHitsReceived());
        entity.setAvgDirectHitsReceived(scale(stats.getDirectHitsReceived() / battlesDouble));

        entity.setExplosionHits(stats.getExplosionHits());
        entity.setAvgExplosionHits(scale(stats.getExplosionHits() / battlesDouble));

        entity.setExplosionHitsReceived(stats.getExplosionHitsReceived());
        entity.setAvgExplosionHitsReceived(scale(stats.getExplosionHitsReceived() / battlesDouble));

        entity.setAvgDamageBlocked(stats.getAvgDamageBlocked());
        entity.setAvgDamageAssisted(stats.getAvgDamageAssisted());
        entity.setAvgDamageAssistedRadio(stats.getAvgDamageAssistedRadio());
        entity.setAvgDamageAssistedTrack(stats.getAvgDamageAssistedTrack());

        entity.setCapturePoints(stats.getCapturePoints());
        entity.setAvgCapturePoints(scale(stats.getCapturePoints() / battlesDouble));

        entity.setDroppedCapturePoints(stats.getDroppedCapturePoints());
        entity.setAvgDroppedCapturePoints(scale(stats.getDroppedCapturePoints() / battlesDouble));

        entity.setMaxDamage(stats.getMaxDamage());
        entity.setMaxXp(stats.getMaxXp());
        entity.setMaxFrags(stats.getMaxFrags());

        mapper.save(entity);
    }

    private Double scale(Double toBeTruncated) {
        if (toBeTruncated == null || Double.isNaN(toBeTruncated)) {
            return null;
        }
        return BigDecimal.valueOf(toBeTruncated).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    private Optional<Integer> getBattleCountFromLastStat(Long accountId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":val", new AttributeValue().withN(accountId + ""));

        DynamoDBQueryExpression<PlayerStatsEntity> query = new DynamoDBQueryExpression<PlayerStatsEntity>()
                .withLimit(1)
                .withKeyConditionExpression("account_id = :val")
                .withConsistentRead(false)
                .withProjectionExpression("battles")
                .withExpressionAttributeValues(eav)
                .withScanIndexForward(false);
        PaginatedQueryList<PlayerStatsEntity> res = mapper.query(PlayerStatsEntity.class, query);
        return res.stream().map(PlayerStatsEntity::getBattles).findFirst();
    }

    private void savePlayerTankStats(WotClient wotClient, long timestamp, Long accountId) {
        PlayerTankStatsResponse playerTankStats = wotClient.getPlayerTankStats(accountId);
        playerTankStats.getPlayerStats(accountId).forEach(s -> {

            PlayerTankStatsEntity tankEntity = new PlayerTankStatsEntity();
            tankEntity.setTimestamp(timestamp);
            tankEntity.setAccountId(accountId);
            tankEntity.setTankId(s.getTankId());
            tankEntity.setKey(accountId + "|" + s.getTankId());

            PlayerTankStats tankStats = s.getTankRatings();

            Optional<Integer> battles = getTankBattleCountFromLastStat(accountId, s.getTankId());
            if (battles.isPresent() && battles.get().equals(tankStats.getBattles())) {
                System.out.println("No new battles for player " + accountId + " and tank " + s.getTankId() + " found. Skipping.");
                return;
            }

            Double battlesDouble = new Double(tankStats.getBattles());

            tankEntity.setBattles(tankStats.getBattles());

            tankEntity.setDraws(tankStats.getDraws());
            tankEntity.setDrawsRatio(scale(100 * tankStats.getDraws() / battlesDouble));

            tankEntity.setWins(tankStats.getWins());
            tankEntity.setWinsRatio(scale(100 * tankStats.getWins() / battlesDouble));

            tankEntity.setLosses(tankStats.getLosses());
            tankEntity.setLossesRatio(scale(100 * tankStats.getLosses() / battlesDouble));

            tankEntity.setSurvivedBattles(tankStats.getSurvivedBattles());
            tankEntity.setSurvivedBattlesRatio(scale(100 * tankStats.getSurvivedBattles() / battlesDouble));

            tankEntity.setXp(tankStats.getXp());
            tankEntity.setAvgBattleXp(tankStats.getBattleAvgXp());

            tankEntity.setAvgDamageBlocked(tankStats.getAvgDamageBlocked());

            tankEntity.setDamageDealt(tankStats.getDamageDealt());
            tankEntity.setAvgDamageDealt(scale(tankStats.getDamageDealt() / battlesDouble));

            tankEntity.setCapturePoints(tankStats.getCapturePoints());
            tankEntity.setAvgCapturePoints(scale(tankStats.getCapturePoints() / battlesDouble));

            tankEntity.setDamageReceived(tankStats.getDamageReceived());
            tankEntity.setAvgDamageReceived(scale(tankStats.getDamageReceived() / battlesDouble));

            tankEntity.setDirectHitsReceived(tankStats.getDirectHitsReceived());
            tankEntity.setAvgDirectHitsReceived(scale(tankStats.getDirectHitsReceived() / battlesDouble));

            tankEntity.setDroppedCapturePoints(tankStats.getDroppedCapturePoints());
            tankEntity.setAvgDroppedCapturePoints(scale(tankStats.getDroppedCapturePoints() / battlesDouble));

            tankEntity.setExplosionHits(tankStats.getExplosionHits());
            tankEntity.setAvgExplosionHits(scale(tankStats.getExplosionHits() / battlesDouble));

            tankEntity.setExplosionHitsReceived(tankStats.getExplosionHitsReceived());
            tankEntity.setAvgExplosionHitsReceived(scale(tankStats.getExplosionHitsReceived() / battlesDouble));

            tankEntity.setFrags(tankStats.getFrags());
            tankEntity.setAvgFrags(scale(tankStats.getFrags() / battlesDouble));

            tankEntity.setHits(tankStats.getHits());
            tankEntity.setAvgHits(scale(tankStats.getHits() / battlesDouble));

            tankEntity.setSpotted(tankStats.getSpotted());
            tankEntity.setAvgSpotted(scale(tankStats.getSpotted() / battlesDouble));

            tankEntity.setShots(tankStats.getShots());
            tankEntity.setAvgShots(scale(tankStats.getShots() / battlesDouble));

            tankEntity.setPiercings(tankStats.getPiercings());
            tankEntity.setAvgPiercings(scale(tankStats.getPiercings() / battlesDouble));

            tankEntity.setPiercingsReceived(tankStats.getPiercingsReceived());
            tankEntity.setAvgPiercingsReceived(scale(tankStats.getPiercingsReceived() / battlesDouble));

            mapper.save(tankEntity);
        });
    }

    private Optional<Integer> getTankBattleCountFromLastStat(Long accountId, Long tankId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":val", new AttributeValue().withS(accountId + "|" + tankId));

        DynamoDBQueryExpression<PlayerTankStatsEntity> query = new DynamoDBQueryExpression<PlayerTankStatsEntity>()
                .withLimit(1)
                .withKeyConditionExpression("composite_key = :val")
                .withExpressionAttributeValues(eav)
                .withProjectionExpression("battles")
                .withConsistentRead(false)
                .withScanIndexForward(false);
        PaginatedQueryList<PlayerTankStatsEntity> res = mapper.query(PlayerTankStatsEntity.class, query);
        return res.stream().map(PlayerTankStatsEntity::getBattles).findFirst();
    }

    public static void main(String[] args) {
        new WotSyncLambdaHandler().handleRequest(null, null);
    }

}
