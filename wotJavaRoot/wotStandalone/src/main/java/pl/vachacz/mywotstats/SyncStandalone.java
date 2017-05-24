package pl.vachacz.mywotstats;

import pl.vachacz.mywotstats.dynamo.WotDynamo;
import pl.vachacz.mywotstats.lambda.player.PlayerStatsSyncLambdaHandler;

public class SyncStandalone {

    private WotDynamo wotDynamo = new WotDynamo();

    private SyncStandalone() {
        wotDynamo.getAllPlayers().forEach((player) -> {
            new PlayerStatsSyncLambdaHandler().syncPlayer(player.getAccountId(), "dummy");
        });
    }

    public static void main(String[] args) {
        new SyncStandalone();
    }

}
