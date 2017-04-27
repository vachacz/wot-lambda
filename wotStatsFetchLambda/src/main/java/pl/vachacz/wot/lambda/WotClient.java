package pl.vachacz.wot.lambda;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequest;
import org.json.JSONObject;
import pl.vachacz.wot.lambda.model.wot.account.AccountResponse;
import pl.vachacz.wot.lambda.model.wot.ratings.Rating;
import pl.vachacz.wot.lambda.model.wot.ratings.RatingsResponse;
import pl.vachacz.wot.lambda.model.wot.tankrating.TankRatingsResponse;
import pl.vachacz.wot.lambda.model.wot.vehicle.VehiclesResponse;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class WotClient {

    private static final String WOT_BASE_URL = "https://api.worldoftanks.eu/wot";

    private static final String WOT_API_ACCOUNT = WOT_BASE_URL + "/account/list/";
    private static final String WOT_API_TANKS = WOT_BASE_URL + "/encyclopedia/tanks/";
    private static final String WOT_API_RATINGS = WOT_BASE_URL + "/ratings/accounts/";
    private static final String WOT_API_TANK_STATS = WOT_BASE_URL + "/tanks/stats/";

    public WotClient() {
        setObjectMapper();
    }

    public Long getAccountId(String player) {
        HttpRequest request = Unirest.get(WOT_API_ACCOUNT)
                .queryString("application_id", "demo")
                .queryString("search", player)
                .queryString("type", "exact");
        AccountResponse accResponse = make(request, AccountResponse.class);
        return accResponse.getData().get(0).getAccountId();
    }

    public VehiclesResponse getVehicles() {
        HttpRequest request = Unirest.get(WOT_API_TANKS)
                .queryString("application_id", "demo")
                .queryString("language", "en")
                .queryString("fields", "tank_id,name_i18n,level,nation,type");

        return make(request, VehiclesResponse.class);
    }

    public TankRatingsResponse getPlayerTankStats(Long accountId) {
        HttpRequest request = Unirest.get(WOT_API_TANK_STATS)
                .queryString("application_id", "demo")
                .queryString("account_id", accountId)
                .queryString("fields", "tank_id,all");

        return make(request, TankRatingsResponse.class);
    }

    public RatingsResponse getPlayerStats(Long accountId) {
        HttpRequest request = Unirest.get(WOT_API_RATINGS)
                .queryString("application_id", "demo")
                .queryString("type", "all")
                .queryString("account_id", accountId);

        JsonNode json = makeJson(request).getBody();
        JSONObject data = json.getObject().getJSONObject("data").getJSONObject(accountId.toString());

        List<Rating> ratings = data.keySet().stream()
                .filter(key -> {
                    JSONObject object = data.optJSONObject(key);
                    return object != null && !object.isNull("value");
                })
                .map(key -> {
                    JSONObject object = data.optJSONObject(key);
                    return new Rating(key, object.optDouble("value"));
                })
                .collect(Collectors.toList());

        RatingsResponse response = new RatingsResponse();
        response.setRatings(ratings);
        return response;
    }

    public <T> T make(HttpRequest request, Class<T> responseType) {
        try {
            System.out.println(request.getUrl());
            HttpResponse<T> response = request.asObject(responseType);
            System.out.println(response.getStatus());
            return response.getBody();
        } catch (UnirestException e) {
            throw new RuntimeException(e);
        }
    }

    public HttpResponse<JsonNode> makeJson(HttpRequest request) {
        try {
            System.out.println(request.getUrl());
            HttpResponse<JsonNode> response = request.asJson();
            System.out.println(response.getStatus());
            return response;
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
