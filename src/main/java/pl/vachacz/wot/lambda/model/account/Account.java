package pl.vachacz.wot.lambda.model.account;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Account {

    private String nickname;

    @JsonProperty("account_id")
    private String accountId;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

}
