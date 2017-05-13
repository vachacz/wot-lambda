package pl.vachacz.mywotstats.lambda.tanks.model.vehicle;

import pl.vachacz.mywotstats.lambda.tanks.model.BaseResponse;

import java.util.Collection;
import java.util.Map;

public class VehiclesResponse extends BaseResponse {

    private Map<Integer, Vehicle> data;

    public Map<Integer, Vehicle> getData() {
        return data;
    }

    public void setData(Map<Integer, Vehicle> data) {
        this.data = data;
    }

    public Collection<Vehicle> getVehicleList() {
        return getData().values();
    }

}
