package com.bank.accountservice.DTO;

import com.bank.accountservice.model.AccountType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateAccountDTO {

    @NotNull(message = "Balance is required.")
    @Min(value = 0, message = "Balance must be at least 0.")
    private Double balance;

    @NotNull(message = "Account type is required.")
    private AccountType type;

    @NotNull(message = "Client ID is required.")
    private Long clientId;
}
