package pl.vachacz.wot.lambda;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import pl.vachacz.wot.lambda.model.dynamo.PlayerStatsEntity;
import pl.vachacz.wot.lambda.model.dynamo.PlayerTankStatsEntity;
import pl.vachacz.wot.lambda.model.dynamo.VehicleEntity;
import pl.vachacz.wot.lambda.model.dynamo.WotImportEntity;
import pl.vachacz.wot.lambda.model.wot.ratings.RatingsResponse;
import pl.vachacz.wot.lambda.model.wot.tankrating.TankRatings;
import pl.vachacz.wot.lambda.model.wot.tankrating.TankRatingsResponse;

import java.util.Calendar;
import java.util.UUID;

public class LambdaHandler implements RequestHandler<Request, Response> {

    private AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
        .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("http://dynamodb.eu-central-1.amazonaws.com", "eu-central-1"))
        .build();

    private DynamoDB dynamoDB = new DynamoDB(client);
    private DynamoDBMapper mapper = new DynamoDBMapper(client);

    public Response handleRequest(Request input, Context context) {

        WotClient wotClient = new WotClient();

        wotClient.getVehicles().getVehicleList().stream().forEach(s -> {
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

        String uuid = UUID.randomUUID().toString();

        WotImportEntity wotImport = new WotImportEntity();
        wotImport.setUuid(uuid);
        wotImport.setTimestamp(Calendar.getInstance().getTimeInMillis());

        mapper.save(wotImport);

        Long accountId = wotClient.getAccountId("hawtank");

        RatingsResponse playerStats = wotClient.getPlayerStats(accountId);
        playerStats.getRatings().stream().forEach(s -> {
            PlayerStatsEntity entity = new PlayerStatsEntity();
            entity.setKey(accountId + "|" + s.getStat());
            entity.setImportUuid(uuid);
            entity.setAccountId(accountId);
            entity.setStat(s.getStat());
            entity.setValue(s.getValue());
            entity.setRank(s.getRank());
            entity.setRankDelta(s.getRankDelta());

            mapper.save(entity);
        });

        TankRatingsResponse playerTankStats = wotClient.getPlayerTankStats(accountId);
        playerTankStats.getPlayerStats(accountId).stream().forEach(s -> {
            PlayerTankStatsEntity entity = new PlayerTankStatsEntity();
            entity.setImportUuid(uuid);
            entity.setAccountId(accountId);
            entity.setTankId(s.getTankId());
            entity.setKey(accountId + "|" + s.getTankId());

            TankRatings tankRatings = s.getTankRatings();

            entity.setAvgDamageBlocked(tankRatings.getAvgDamageBlocked());
            entity.setBattleAvgXp(tankRatings.getBattleAvgXp());
            entity.setBattles(tankRatings.getBattles());
            entity.setBattleAvgXp(tankRatings.getBattleAvgXp());
            entity.setCapturePoints(tankRatings.getCapturePoints());
            entity.setDamageDealt(tankRatings.getDamageDealt());
            entity.setDamageReceived(tankRatings.getDamageReceived());
            entity.setDirectHitsReceived(tankRatings.getDirectHitsReceived());
            entity.setDraws(tankRatings.getDraws());
            entity.setDroppedCapturePoints(tankRatings.getDroppedCapturePoints());
            entity.setExplosionHits(tankRatings.getExplosionHits());
            entity.setExplosionHitsReceived(tankRatings.getExplosionHitsReceived());
            entity.setFrags(tankRatings.getFrags());
            entity.setHits(tankRatings.getHits());
            entity.setHitsPercents(tankRatings.getHitsPercents());
            entity.setLosses(tankRatings.getLosses());
            entity.setWins(tankRatings.getWins());
            entity.setSpotted(tankRatings.getSpotted());
            entity.setShots(tankRatings.getShots());
            entity.setXp(tankRatings.getXp());
            entity.setPiercings(tankRatings.getPiercings());
            entity.setSurvivedBattles(tankRatings.getSurvivedBattles());
            entity.setPiercingsReceived(tankRatings.getPiercingsReceived());
            entity.setNoDamageDirectHitsReceived(tankRatings.getNoDamageDirectHitsReceived());
            entity.setTankingFactor(tankRatings.getTankingFactor());

            mapper.save(entity);
        });

        return new Response();
    }

    public static void main(String[] args) {
        new LambdaHandler().handleRequest(null, null);
    }

}
