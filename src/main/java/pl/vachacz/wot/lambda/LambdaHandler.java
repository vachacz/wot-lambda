package pl.vachacz.wot.lambda;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import pl.vachacz.wot.lambda.model.dynamo.PlayerStatsEntity;
import pl.vachacz.wot.lambda.model.dynamo.VehicleEntity;
import pl.vachacz.wot.lambda.model.dynamo.WotImportEntity;
import pl.vachacz.wot.lambda.model.wot.ratings.RatingsResponse;

import java.util.Calendar;
import java.util.UUID;

public class LambdaHandler implements RequestHandler<Request, Response> {

    private AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
        .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("http://localhost:8000", "us-west-2"))
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

//        TankRatingsResponse playerTankStats = client.getPlayerTankStats(accountId);

        return new Response();
    }

    public static void main(String[] args) {
        new LambdaHandler().handleRequest(null, null);
    }

}
