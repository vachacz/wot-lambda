package pl.vachacz.wot.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import pl.vachacz.wot.lambda.model.ratings.RatingsResponse;
import pl.vachacz.wot.lambda.model.tankrating.TankRatingsResponse;

public class LambdaHandler implements RequestHandler<Request, Response> {

    public Response handleRequest(Request input, Context context) {

        WotClient client = new WotClient();

        client.getVehicles();
        String hawtankId = client.getAccountId("hawtank");
        RatingsResponse playerStats = client.getPlayerStats(hawtankId);
        TankRatingsResponse playerTankStats = client.getPlayerTankStats(hawtankId);

        return new Response();
    }

    public static void main(String[] args) {
        new LambdaHandler().handleRequest(null, null);
    }

}
