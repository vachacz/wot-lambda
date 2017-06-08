package pl.vachacz.mywotstats;

import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import pl.vachacz.mywotstats.dynamo.WotDynamo;
import pl.vachacz.mywotstats.dynamo.model.PlayerTankStatsEntity;
import pl.vachacz.mywotstats.dynamo.model.VehicleEntity;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

public class Wn8Updater {

    public static void main(String[] args) {
        WotDynamo wotDynamo = new WotDynamo();

        Map<Long, VehicleEntity> vehiclesMap = wotDynamo.getAllVehiclesAsMap();
        PaginatedScanList<PlayerTankStatsEntity> allPlayerTankStats = wotDynamo.getAllPlayerTankStats();

        System.out.println("Total rows : " + allPlayerTankStats.size());

        allPlayerTankStats.forEach(stat -> {
            if (stat.getWn8() == null && stat.getBattles() > 0) {
                try {
                    stat.setWn8(scale2(computeWn8(stat, vehiclesMap)));
                } catch (Exception e) {
                    e.printStackTrace();
                }

                wotDynamo.save(stat);
            }
        });
    }

    private static Double computeWn8(PlayerTankStatsEntity tankEntity, Map<Long, VehicleEntity> vehiclesMap) {

        VehicleEntity vehicle = vehiclesMap.get(tankEntity.getTankId());

        if (vehicle == null) {
            System.out.println("vehicle not found : " + tankEntity.getTankId());
            return null;
        }

        Double rDAMAGE = tankEntity.getAvgDamageDealt() / vehicle.getExpDamage();
        Double rSPOT   = tankEntity.getAvgSpotted() / vehicle.getExpSpot();
        Double rFRAG   = tankEntity.getAvgFrags() / vehicle.getExpFrag();
        Double rDEF    = tankEntity.getAvgDroppedCapturePoints() / vehicle.getExpDef();
        Double rWIN    = tankEntity.getWinsRatio() / vehicle.getExpWinRate();

        Double rWINc    = Math.max(0,                     (rWIN    - 0.71) / (1 - 0.71) );
        Double rDAMAGEc = Math.max(0,                     (rDAMAGE - 0.22) / (1 - 0.22) );
        Double rFRAGc   = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG   - 0.12) / (1 - 0.12)));
        Double rSPOTc   = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT   - 0.38) / (1 - 0.38)));
        Double rDEFc    = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF    - 0.10) / (1 - 0.10)));

        return 980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145 * Math.min(1.8, rWINc);
    }

    private static Double scale2(Double toBeTruncated) {
        if (toBeTruncated == null || Double.isNaN(toBeTruncated)) {
            return null;
        }
        return BigDecimal.valueOf(toBeTruncated).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

}
