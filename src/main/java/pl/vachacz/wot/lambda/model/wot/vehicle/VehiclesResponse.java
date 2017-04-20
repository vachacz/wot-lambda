package pl.vachacz.wot.lambda.model.wot.vehicle;

import pl.vachacz.wot.lambda.model.wot.BaseResponse;

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
