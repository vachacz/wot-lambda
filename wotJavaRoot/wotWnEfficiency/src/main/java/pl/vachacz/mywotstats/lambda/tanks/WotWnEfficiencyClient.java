package pl.vachacz.mywotstats.lambda.tanks;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequest;
import pl.vachacz.mywotstats.lambda.tanks.model.TankExpectedRatings;
import pl.vachacz.mywotstats.lambda.tanks.model.TankExpectedRatingsResponse;

import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;

public class WotWnEfficiencyClient {

    public WotWnEfficiencyClient() {
        setObjectMapper();
    }

    public Map<Long, TankExpectedRatings> loadWnExpectedStats() {
        HttpRequest request = Unirest.get("http://www.wnefficiency.net/exp/expected_tank_values_30.json");
        TankExpectedRatingsResponse response = make(request, TankExpectedRatingsResponse.class);

        return response.getData().stream().collect(Collectors.toMap(TankExpectedRatings::getIDNum, item -> item));
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
