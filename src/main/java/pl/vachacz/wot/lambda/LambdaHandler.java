package pl.vachacz.wot.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequest;
import pl.vachacz.wot.lambda.model.account.AccountResponse;
import pl.vachacz.wot.lambda.model.ratings.RatingsResponse;
import pl.vachacz.wot.lambda.model.vehicle.Vehicle;
import pl.vachacz.wot.lambda.model.vehicle.VehiclesResponse;

import java.io.IOException;

public class LambdaHandler implements RequestHandler<Request, Response> {

    private static final String WOT_BASE_URL = "https://api.worldoftanks.eu/wot";

    private static final String WOT_API_ACCOUNT = WOT_BASE_URL + "/account/list/";
    private static final String WOT_API_TANKS = WOT_BASE_URL + "/encyclopedia/tanks/";
    private static final String WOT_API_RATINGS = WOT_BASE_URL + "/ratings/types/";

    public Response handleRequest(Request input, Context context) {

        setObjectMapper();

        try {
            HttpRequest accountRequest = Unirest.get(WOT_API_ACCOUNT)
                    .queryString("application_id", "demo")
                    .queryString("search", "hawtank")
                    .queryString("type", "exact");
            HttpResponse<AccountResponse> accResponse = accountRequest.asObject(AccountResponse.class);

            String accountId = accResponse.getBody().getData().get(0).getAccountId();

            HttpRequest tanksRequest = Unirest.get(WOT_API_TANKS)
                    .queryString("application_id", "demo")
                    .queryString("language", "en")
                    .queryString("fields", "tank_id,name_i18n,level,nation,type");
            HttpResponse<VehiclesResponse> tanksResponse = tanksRequest.asObject(VehiclesResponse.class);

            HttpRequest ratingsRequest = Unirest.get(WOT_API_RATINGS)
                    .queryString("application_id", "demo")
                    .queryString("type", "all")
                    .queryString("account_id", accountId);
            HttpResponse<RatingsResponse> ratingsResponse = ratingsRequest.asObject(RatingsResponse.class);

            System.out.print("");

        } catch (UnirestException e) {
            e.printStackTrace();
        }

        return new Response();
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

    public static void main(String[] args) {
        new LambdaHandler().handleRequest(null, null);
    }

}
