package pl.vachacz.mywotstats.lambda.tanks;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequest;
import pl.vachacz.mywotstats.dynamo.model.VehicleEntity;
import pl.vachacz.mywotstats.lambda.tanks.model.TankExpectedRatings;
import pl.vachacz.mywotstats.lambda.tanks.model.TankExpectedRatingsResponse;
import pl.vachacz.mywotstats.lambda.tanks.model.vehicle.VehiclesResponse;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TankSyncLambdaHandler implements RequestHandler<Request, Response> {

    private AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard()
            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("http://dynamodb.eu-central-1.amazonaws.com", "eu-central-1"))
            .build();

    private DynamoDBMapper mapper = new DynamoDBMapper(client);
    private WotClient wotClient = new WotClient();

    private TankSyncLambdaHandler() {
        setObjectMapper();
    }

    @Override
    public Response handleRequest(Request input, Context context) {

        HttpRequest request = Unirest.get("http://www.wnefficiency.net/exp/expected_tank_values_30.json");
        TankExpectedRatingsResponse response = make(request, TankExpectedRatingsResponse.class);

        Map<Long, TankExpectedRatings> tankMap =
                response.getData().stream().collect(Collectors.toMap(TankExpectedRatings::getIDNum, item -> item));

        VehiclesResponse vehicles = wotClient.getVehicles();

        vehicles.getVehicleList().forEach(tank -> {
            VehicleEntity loaded = mapper.load(VehicleEntity.class, tank.getTankId());
            if (loaded == null) {
                VehicleEntity entity = new VehicleEntity();
                entity.setTankId(tank.getTankId());
                entity.setLevel(tank.getLevel());
                entity.setName(tank.getName());
                entity.setNation(tank.getNation());
                entity.setType(tank.getType());

                TankExpectedRatings ratings = tankMap.get(tank.getTankId());

                if (ratings != null) {
                    entity.setExpDamage(ratings.getExpDamage());
                    entity.setExpDef(ratings.getExpDef());
                    entity.setExpFrag(ratings.getExpFrag());
                    entity.setExpSpot(ratings.getExpSpot());
                    entity.setExpWinRate(ratings.getExpWinRate());
                }
                mapper.save(entity);
            }
        });

        return new Response();
    }

    public static void main(String[] args) {
        new TankSyncLambdaHandler().handleRequest(null, null);
    }

    private <T> T make(HttpRequest request, Class<T> responseType) {
        try {
            System.out.println(request.getUrl());
            HttpResponse<T> response = request.asObject(responseType);
            System.out.println(response.getStatus());
            return response.getBody();
        } catch (UnirestException e) {
            throw new RuntimeException(e);
        }
    }

    private void setObjectMapper() {
        Unirest.setObjectMapper(new ObjectMapper() {
            private com.fasterxml.jackson.databind.ObjectMapper jacksonObjectMapper
                    = new com.fasterxml.jackson.databind.ObjectMapper()
                    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

            public <T> T readValue(String value, Class<T> valueType) {
                try {
                    return jacksonObjectMapper.readValue(value, valueType);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            public String writeValue(Object value) {
                try {
                    return jacksonObjectMapper.writeValueAsString(value);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

}
