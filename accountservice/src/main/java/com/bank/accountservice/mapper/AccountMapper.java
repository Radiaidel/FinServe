package com.bank.accountservice.mapper;

import com.bank.accountservice.DTO.AccountDTO;
import com.bank.accountservice.DTO.CreateAccountDTO;
import com.bank.accountservice.model.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountDTO toDTO(Account account);

    @Mapping(target = "id", ignore = true)
    Account fromCreateDTO(CreateAccountDTO createAccountDTO);
}
