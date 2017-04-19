package pl.vachacz.wot.lambda.model.vehicle;

import pl.vachacz.wot.lambda.model.BaseResponse;

import java.util.Map;

public class VehiclesResponse extends BaseResponse {

    private Map<Integer, Vehicle> data;

    public Map<Integer, Vehicle> getData() {
        return data;
    }

    public void setData(Map<Integer, Vehicle> data) {
        this.data = data;
    }

}
