package pl.vachacz.mywotstats.lambda.tanks.model;

import java.util.List;

public class TankExpectedRatingsResponse {

    private List<TankExpectedRatings> data;

    public List<TankExpectedRatings> getData() {
        return data;
    }

    public void setData(List<TankExpectedRatings> data) {
        this.data = data;
    }
}
