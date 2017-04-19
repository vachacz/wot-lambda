package pl.vachacz.wot.lambda.model.account;

import pl.vachacz.wot.lambda.model.BaseResponse;
import pl.vachacz.wot.lambda.model.vehicle.Vehicle;

import java.util.List;
import java.util.Map;

public class AccountResponse extends BaseResponse {

    private List<Account> data;

    public List<Account> getData() {
        return data;
    }

    public void setData(List<Account> data) {
        this.data = data;
    }

}
