import axios from "axios"
import type { Client, Account, ClientFormData, AccountFormData } from "../types"

// Base URLs for different services
const CUSTOMER_SERVICE_URL = "http://localhost:8083"
const ACCOUNT_SERVICE_URL = "http://localhost:8082"

// Create separate axios instances for each service
const customerApi = axios.create({
  baseURL: CUSTOMER_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const accountApi = axios.create({
  baseURL: ACCOUNT_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Client API calls
export const getClients = async (): Promise<Client[]> => {
  const response = await customerApi.get<Client[]>("/customers")
  return response.data
}

export const getClientById = async (id: number): Promise<Client> => {
  const response = await customerApi.get<Client>(`/customers/${id}`)
  return response.data
}

export const createClient = async (clientData: ClientFormData): Promise<Client> => {
  const response = await customerApi.post<Client>("/customers", clientData)
  return response.data
}

// Account API calls
export const getAccounts = async (): Promise<Account[]> => {
  const response = await accountApi.get<Account[]>("/accounts")
  return response.data
}

export const getAccountById = async (id: number): Promise<Account> => {
  const response = await accountApi.get<Account>(`/accounts/${id}`)
  return response.data
}

export const getAccountsByClientId = async (clientId: number): Promise<Account[]> => {
  const response = await accountApi.get<Account[]>(`/accounts/customer/${clientId}`)
  return response.data
}

export const createAccount = async (accountData: AccountFormData): Promise<Account> => {
  const response = await accountApi.post<Account>("/accounts", accountData)
  return response.data
}

export { customerApi, accountApi }

