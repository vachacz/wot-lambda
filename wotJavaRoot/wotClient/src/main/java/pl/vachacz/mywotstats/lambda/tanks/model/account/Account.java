package pl.vachacz.mywotstats.lambda.tanks.model.account;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Account {

    private String nickname;

    @JsonProperty("account_id")
    private Long accountId;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

}
