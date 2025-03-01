package com.bank.accountservice.service;

import com.bank.accountservice.DTO.AccountDTO;
import com.bank.accountservice.DTO.CreateAccountDTO;

import java.util.List;

public interface AccountService {

    AccountDTO createAccount(CreateAccountDTO createAccountDTO);

    AccountDTO getAccountById(Long id);

    List<AccountDTO> getAccountsByCustomerId(Long customerId);
}
