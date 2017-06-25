package pl.vachacz.mywotstats.lambda.tanks;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequest;
import pl.vachacz.mywotstats.lambda.tanks.model.account.AccountResponse;
import pl.vachacz.mywotstats.lambda.tanks.model.playerstats.PlayerStatsResponse;
import pl.vachacz.mywotstats.lambda.tanks.model.playertankstats.PlayerTankStatsResponse;
import pl.vachacz.mywotstats.lambda.tanks.model.vehicle.VehiclesResponse;

import java.io.IOException;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

public class WotClient {

    private static final String WOT_BASE_URL = "https://api.worldoftanks.eu/wot";

    private static final String WOT_API_PLAYER = WOT_BASE_URL + "/account/list/";
    private static final String WOT_API_TANKS = WOT_BASE_URL + "/encyclopedia/tanks/";
    private static final String WOT_API_PLAYER_STATS = WOT_BASE_URL + "/account/info/";
    private static final String WOT_API_PLAYER_TANK_STATS = WOT_BASE_URL + "/tanks/stats/";

    private Properties properties;

    public WotClient() {
        setObjectMapper();

        try {
            properties = new Properties();
            properties.load(WotClient.class.getResourceAsStream("/wot.properties"));
        } catch (IOException e) {
            System.out.println("Properties not loaded");
            e.printStackTrace();
        }
    }

    public Long getAccountId(String player) {
        HttpRequest request = Unirest.get(WOT_API_PLAYER)
                .queryString("application_id", getApplicationId())
                .queryString("search", player)
                .queryString("type", "exact");
        AccountResponse accResponse = make(request, AccountResponse.class);
        return accResponse.getData().get(0).getAccountId();
    }

    public VehiclesResponse getVehicles() {
        HttpRequest request = Unirest.get(WOT_API_TANKS)
                .queryString("application_id", getApplicationId())
                .queryString("language", "en")
                .queryString("fields", "tank_id,name_i18n,level,nation,type");

        return make(request, VehiclesResponse.class);
    }

    public PlayerTankStatsResponse getPlayerTankStats(List<Long> accountIds) {
        String ids = accountIds.stream().map(Object::toString).collect(Collectors.joining(","));
        HttpRequest request = Unirest.get(WOT_API_PLAYER_TANK_STATS)
                .queryString("application_id", properties.getProperty("wotApplicationId"))
                .queryString("account_id", ids)
                .queryString("fields", "tank_id,all");

        return make(request, PlayerTankStatsResponse.class);
    }

    public PlayerStatsResponse getPlayerStats(List<Long> accountIds) {
        String ids = accountIds.stream().map(Object::toString).collect(Collectors.joining(","));
        HttpRequest request = Unirest.get(WOT_API_PLAYER_STATS)
                .queryString("application_id", getApplicationId())
                .queryString("fields", "statistics.all")
                .queryString("account_id", ids);

        return make(request, PlayerStatsResponse.class);
    }

    private String getApplicationId() {
        String appId = properties.getProperty("wotApplicationId");
        System.out.println(appId);
        return appId;
    }

    public <T> T make(HttpRequest request, Class<T> responseType) {
        try {
            System.out.println(request.getUrl());
            HttpResponse<T> response = request.asObject(responseType);
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
