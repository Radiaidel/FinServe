package com.bank.accountservice.controller;

import com.bank.accountservice.DTO.AccountDTO;
import com.bank.accountservice.DTO.CreateAccountDTO;
import com.bank.accountservice.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AccountDTO> createAccount(@Valid @RequestBody CreateAccountDTO createAccountDTO) {
        return ResponseEntity.ok(service.createAccount(createAccountDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> getAccount(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAccountById(id));
    }

    @GetMapping
    public ResponseEntity<List<AccountDTO>> getAllAccount() {
        return ResponseEntity.ok(service.getAllAccount());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AccountDTO>> getAccountsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(service.getAccountsByCustomerId(customerId));
    }
}

