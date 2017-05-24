package pl.vachacz.mywotstats.lambda.tanks;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import pl.vachacz.mywotstats.dynamo.WotDynamo;
import pl.vachacz.mywotstats.dynamo.model.VehicleEntity;
import pl.vachacz.mywotstats.lambda.tanks.model.TankExpectedRatings;
import pl.vachacz.mywotstats.lambda.tanks.model.vehicle.VehiclesResponse;

import java.util.Map;

public class TankSyncLambdaHandler implements RequestHandler<Object, Object> {

    private WotDynamo wotDynamo = new WotDynamo();
    private WotClient wotClient = new WotClient();
    private WotWnEfficiencyClient wotWnEfficiencyClient = new WotWnEfficiencyClient();

    @Override
    public Object handleRequest(Object input, Context context) {

        Map<Long, TankExpectedRatings> tankMap = wotWnEfficiencyClient.loadWnExpectedStats();

        VehiclesResponse vehicles = wotClient.getVehicles();

        vehicles.getVehicleList().forEach(tank -> {
            VehicleEntity loaded = wotDynamo.findVehicleById(tank.getTankId());
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

                System.out.println("REQ[" + context.getAwsRequestId() + "] TANK[" + tank.getTankId() + "] saving new tank " + tank.getName());
                wotDynamo.save(entity);
            }
        });

        return null;
    }

    public static void main(String[] args) {
        new TankSyncLambdaHandler().handleRequest(null, null);
    }

}
