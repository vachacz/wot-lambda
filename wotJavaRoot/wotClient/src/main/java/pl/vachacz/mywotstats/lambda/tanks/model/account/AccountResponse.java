package pl.vachacz.mywotstats.lambda.tanks.model.account;

import pl.vachacz.mywotstats.lambda.tanks.model.BaseResponse;

import java.util.List;

public class AccountResponse extends BaseResponse {

    private List<Account> data;

    public List<Account> getData() {
        return data;
    }

    public void setData(List<Account> data) {
        this.data = data;
    }

}
