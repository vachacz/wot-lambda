package pl.vachacz.wot.lambda;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import pl.vachacz.wot.lambda.model.dynamo.PlayerStatsEntity;
import pl.vachacz.wot.lambda.model.dynamo.PlayerTankStatsEntity;
import pl.vachacz.wot.lambda.model.dynamo.VehicleEntity;
import pl.vachacz.wot.lambda.model.wot.ratings.RatingsResponse;
import pl.vachacz.wot.lambda.model.wot.tankrating.TankRatings;
import pl.vachacz.wot.lambda.model.wot.tankrating.TankRatingsResponse;

import java.util.Calendar;
import java.util.UUID;

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

        long timestamp = Calendar.getInstance().getTimeInMillis();

        Long accountId = wotClient.getAccountId("hawtank");

        RatingsResponse playerStats = wotClient.getPlayerStats(accountId);

        PlayerStatsEntity entity = new PlayerStatsEntity();
        entity.setAccountId(accountId);
        entity.setTimestamp(timestamp);
        entity.setAmountXp(playerStats.findLongStatValue("xp_amount"));
        entity.setAverageDamage(playerStats.findDoubleStatValue("damage_avg"));
        entity.setAverageFrags(playerStats.findDoubleStatValue("frags_avg"));
        entity.setAverageXp(playerStats.findDoubleStatValue("xp_avg"));
        entity.setBattlesCount(playerStats.findLongStatValue("battles_count"));
        entity.setFragsCount(playerStats.findLongStatValue("frags_count"));
        entity.setGlobalRating(playerStats.findDoubleStatValue("global_rating"));
        entity.setDamageDealt(playerStats.findLongStatValue("damage_dealt"));
        entity.setMaxXp(playerStats.findLongStatValue("xp_max"));
        entity.setWinsRatio(playerStats.findDoubleStatValue("wins_ratio"));
        entity.setHitsRatio(playerStats.findDoubleStatValue("hits_ratio"));
        entity.setSurvivedRatio(playerStats.findDoubleStatValue("survived_ratio"));

        mapper.save(entity);

        TankRatingsResponse playerTankStats = wotClient.getPlayerTankStats(accountId);
        playerTankStats.getPlayerStats(accountId).forEach(s -> {
            PlayerTankStatsEntity tankEntity = new PlayerTankStatsEntity();
            tankEntity.setTimestamp(timestamp);
            tankEntity.setAccountId(accountId);
            tankEntity.setTankId(s.getTankId());
            tankEntity.setKey(accountId + "|" + s.getTankId());

            TankRatings tankRatings = s.getTankRatings();

            tankEntity.setAvgDamageBlocked(tankRatings.getAvgDamageBlocked());
            tankEntity.setBattleAvgXp(tankRatings.getBattleAvgXp());
            tankEntity.setBattles(tankRatings.getBattles());
            tankEntity.setBattleAvgXp(tankRatings.getBattleAvgXp());
            tankEntity.setCapturePoints(tankRatings.getCapturePoints());
            tankEntity.setDamageDealt(tankRatings.getDamageDealt());
            tankEntity.setDamageReceived(tankRatings.getDamageReceived());
            tankEntity.setDirectHitsReceived(tankRatings.getDirectHitsReceived());
            tankEntity.setDraws(tankRatings.getDraws());
            tankEntity.setDroppedCapturePoints(tankRatings.getDroppedCapturePoints());
            tankEntity.setExplosionHits(tankRatings.getExplosionHits());
            tankEntity.setExplosionHitsReceived(tankRatings.getExplosionHitsReceived());
            tankEntity.setFrags(tankRatings.getFrags());
            tankEntity.setHits(tankRatings.getHits());
            tankEntity.setHitsPercents(tankRatings.getHitsPercents());
            tankEntity.setLosses(tankRatings.getLosses());
            tankEntity.setWins(tankRatings.getWins());
            tankEntity.setSpotted(tankRatings.getSpotted());
            tankEntity.setShots(tankRatings.getShots());
            tankEntity.setXp(tankRatings.getXp());
            tankEntity.setPiercings(tankRatings.getPiercings());
            tankEntity.setSurvivedBattles(tankRatings.getSurvivedBattles());
            tankEntity.setPiercingsReceived(tankRatings.getPiercingsReceived());
            tankEntity.setNoDamageDirectHitsReceived(tankRatings.getNoDamageDirectHitsReceived());
            tankEntity.setTankingFactor(tankRatings.getTankingFactor());

            mapper.save(tankEntity);
        });

        return new Response();
    }

    public static void main(String[] args) {
        new WotSyncLambdaHandler().handleRequest(null, null);
    }

}
