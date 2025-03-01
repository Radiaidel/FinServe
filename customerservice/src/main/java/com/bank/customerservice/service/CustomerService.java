package com.bank.customerservice.service;

import com.bank.customerservice.dto.CustomerDTO;
import com.bank.customerservice.entity.Customer;
import com.bank.customerservice.exception.CustomerAlreadyExistsException;
import com.bank.customerservice.exception.CustomerNotFoundException;
import com.bank.customerservice.mapper.CustomerMapper;
import com.bank.customerservice.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    
    @Transactional(readOnly = true)
    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customerMapper.toDTOList(customers);
    }
    
    @Transactional(readOnly = true)
    public CustomerDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Client non trouvé avec l'ID: " + id));
        return customerMapper.toDTO(customer);
    }
    
    @Transactional
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        if (customerRepository.existsByEmail(customerDTO.getEmail())) {
            throw new CustomerAlreadyExistsException("Un client avec cet email existe déjà");
        }
        
        Customer customer = customerMapper.toEntity(customerDTO);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toDTO(savedCustomer);
    }
    
    @Transactional
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        if (!customerRepository.existsById(id)) {
            throw new CustomerNotFoundException("Client non trouvé avec l'ID: " + id);
        }
        
        Customer customer = customerMapper.toEntity(customerDTO);
        customer.setId(id);
        Customer updatedCustomer = customerRepository.save(customer);
        return customerMapper.toDTO(updatedCustomer);
    }
    
    @Transactional
    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new CustomerNotFoundException("Client non trouvé avec l'ID: " + id);
        }
        customerRepository.deleteById(id);
    }
}

