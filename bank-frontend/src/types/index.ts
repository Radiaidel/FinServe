export interface Client {
    id: number
    name: string
    email: string
  }
  
  export enum AccountType {
    CURRENT = "COURANT",
    SAVINGS = "EPARGNE",
  }
  
  export interface Account {
    id: number
    balance: number
    type: AccountType
    clientId: number
    client?: Client
  }
  
  export interface ClientFormData {
    name: string
    email: string
  }
  
  export interface AccountFormData {
    balance: number
    type: AccountType
    clientId: number
  }
  
  