"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material"
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material"
import { getAccounts, getClients } from "../../services/api"
import { useSnackbar } from "../../context/SnackbarContext"
import { type Account, type Client, AccountType } from "../../types"

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([])
  const [clients, setClients] = useState<Record<number, Client>>({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [accountsData, clientsData] = await Promise.all([getAccounts(), getClients()])

        // Create a map of clients by ID for quick lookup
        const clientsMap: Record<number, Client> = {}
        clientsData.forEach((client) => {
          clientsMap[client.id] = client
        })

        setClients(clientsMap)
        setAccounts(accountsData)
        setFilteredAccounts(accountsData)
      } catch (error) {
        console.error("Error fetching accounts:", error)
        showSnackbar("Failed to load accounts", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [showSnackbar])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAccounts(accounts)
    } else {
      const filtered = accounts.filter((account) => {
        const clientName = clients[account.clientId]?.name.toLowerCase() || ""
        return (
          account.id.toString().includes(searchTerm.toLowerCase()) ||
          clientName.includes(searchTerm.toLowerCase()) ||
          account.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
      setFilteredAccounts(filtered)
    }
  }, [searchTerm, accounts, clients])

  const handleViewAccount = (id: number) => {
    navigate(`/accounts/${id}`)
  }

  const getAccountTypeChip = (type: AccountType) => {
    return <Chip label={type} color={type === AccountType.CURRENT ? "primary" : "secondary"} size="small" />
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Accounts</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/accounts/create")}>
          Create Account
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search accounts by ID, client name, or type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Client</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.id}</TableCell>
                  <TableCell>{getAccountTypeChip(account.type)}</TableCell>
                  <TableCell>€{account.balance.toFixed(2)}</TableCell>
                  <TableCell>{clients[account.clientId]?.name || "Unknown"}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" size="small" onClick={() => handleViewAccount(account.id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No accounts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

