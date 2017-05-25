package pl.vachacz.mywotstats.lambda;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.lambda.runtime.*;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.PublishRequest;
import pl.vachacz.mywotstats.dynamo.WotDynamo;
import pl.vachacz.mywotstats.dynamo.model.PlayerEntity;
import pl.vachacz.mywotstats.lambda.tanks.WotClient;

public class StatsSyncSchedulerLambdaHandler implements RequestHandler<Object, Object> {

    private AmazonSNS snsClient;

    private WotClient wotClient = new WotClient();
    private WotDynamo wotDynamo = new WotDynamo();

    public StatsSyncSchedulerLambdaHandler() {
        snsClient = AmazonSNSClientBuilder.standard()
                .withRegion(Regions.EU_CENTRAL_1)
                .build();
    }

    public Object handleRequest(Object input, Context context) {
        String requestId = context.getAwsRequestId();
        System.out.println("REQ[" + requestId + "] starting ... ");
        PaginatedScanList<PlayerEntity> players = wotDynamo.getAllPlayers();


        players.forEach(player -> {
            System.out.println("REQ[" + requestId + "] PLAYER[" + player.getPlayer() + "] processing ...");

            if (player.getAccountId() == null) {
                System.out.println("REQ[" + requestId + "] PLAYER[" + player.getPlayer() + "] fetching accountId");

                Long accountId = wotClient.getAccountId(player.getPlayer());
                player.setAccountId(accountId);
                wotDynamo.save(player);
            }

            System.out.println("REQ[" + requestId + "] PLAYER[" + player.getAccountId() + "] sending SNS event");

            PublishRequest publishRequest =
                    new PublishRequest("arn:aws:sns:eu-central-1:592294659655:wot_player_stat_sync_request_topic", player.getAccountId().toString());
            snsClient.publish(publishRequest);
        });

        return null;
    }

    public static void main(String[] args) {
        Context ctx = new Context() {
            @Override
            public String getAwsRequestId() {
                return "123";
            }

            @Override
            public String getLogGroupName() {
                return null;
            }

            @Override
            public String getLogStreamName() {
                return null;
            }

            @Override
            public String getFunctionName() {
                return null;
            }

            @Override
            public String getFunctionVersion() {
                return null;
            }

            @Override
            public String getInvokedFunctionArn() {
                return null;
            }

            @Override
            public CognitoIdentity getIdentity() {
                return null;
            }

            @Override
            public ClientContext getClientContext() {
                return null;
            }

            @Override
            public int getRemainingTimeInMillis() {
                return 0;
            }

            @Override
            public int getMemoryLimitInMB() {
                return 0;
            }

            @Override
            public LambdaLogger getLogger() {
                return null;
            }
        };
        new StatsSyncSchedulerLambdaHandler().handleRequest(null, ctx);
    }

}

