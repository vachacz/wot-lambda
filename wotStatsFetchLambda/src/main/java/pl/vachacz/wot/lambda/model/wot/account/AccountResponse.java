package pl.vachacz.wot.lambda.model.wot.account;

import pl.vachacz.wot.lambda.model.wot.BaseResponse;

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
