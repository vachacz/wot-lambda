package pl.vachacz.mywotstats.dynamo;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import pl.vachacz.mywotstats.dynamo.model.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class WotDynamo {

    private AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("http://dynamodb.eu-central-1.amazonaws.com", "eu-central-1"))
            .build();

    private DynamoDBMapper mapper = new DynamoDBMapper(client);

    public PaginatedScanList<PlayerEntity> getAllPlayers() {
        DynamoDBScanExpression scan = new DynamoDBScanExpression();
        return mapper.scan(PlayerEntity.class, scan);
    }

    private PaginatedScanList<VehicleEntity> getAllVehicles() {
        DynamoDBScanExpression scan = new DynamoDBScanExpression();
        return mapper.scan(VehicleEntity.class, scan);
    }

    public Map<Long, VehicleEntity> getAllVehiclesAsMap() {
        return getAllVehicles().stream().collect(Collectors.toMap(VehicleEntity::getTankId, item -> item));
    }

    public Map<Long, PlayerTankEntity> getPlayerTanksAsMap(Long accountId) {
        return getPlayerTanks(accountId).stream().collect(Collectors.toMap(PlayerTankEntity::getTankId, item -> item));
    }

    private PaginatedQueryList<PlayerTankEntity> getPlayerTanks(Long accountId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":val", new AttributeValue().withN(accountId + ""));

        DynamoDBQueryExpression<PlayerTankEntity> query = new DynamoDBQueryExpression<PlayerTankEntity>()
                .withKeyConditionExpression("account_id = :val")
                .withConsistentRead(false)
                .withExpressionAttributeValues(eav);
        return mapper.query(PlayerTankEntity.class, query);
    }

    public PaginatedScanList<PlayerTankStatsEntity> getAllPlayerTankStats() {
        DynamoDBScanExpression scan = new DynamoDBScanExpression();
        return mapper.scan(PlayerTankStatsEntity.class, scan);
    }

    public void save(PlayerEntity player) {
        mapper.save(player);
    }

    public void save(PlayerStatsEntity playerStat) {
        mapper.save(playerStat);
    }

    public void save(PlayerTankEntity playerTank) {
        mapper.save(playerTank);
    }

    public void save(PlayerTankStatsEntity tankStatEntity) {
        mapper.save(tankStatEntity);
    }

    public void save(VehicleEntity vehicle) {
        mapper.save(vehicle);
    }

    public VehicleEntity findVehicleById(Long tankId) {
        return mapper.load(VehicleEntity.class, tankId);
    }

    public Optional<Integer> getBattleCountFromLastStat(Long accountId) {
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

}
