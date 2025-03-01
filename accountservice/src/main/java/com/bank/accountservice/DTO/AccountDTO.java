package com.bank.accountservice.DTO;



import com.bank.accountservice.model.AccountType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private Long id;
    private Double balance;
    private AccountType type;
    private Long clientId;
}
