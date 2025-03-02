"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { ArrowBack, Add as AddIcon } from "@mui/icons-material"
import { getClientById, getAccountsByClientId } from "../../services/api"
import { useSnackbar } from "../../context/SnackbarContext"
import { type Client, type Account, AccountType } from "../../types"

export default function ClientDetails() {
  const { id } = useParams<{ id: string }>()
  const [client, setClient] = useState<Client | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchClientData = async () => {
      if (!id) return

      try {
        setLoading(true)
        const clientId = Number.parseInt(id, 10)
        const [clientData, accountsData] = await Promise.all([getClientById(clientId), getAccountsByClientId(clientId)])

        setClient(clientData)
        setAccounts(accountsData)
      } catch (error) {
        console.error("Error fetching client details:", error)
        showSnackbar("Failed to load client details", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchClientData()
  }, [id, showSnackbar])

  const handleCreateAccount = () => {
    navigate("/accounts/create", { state: { clientId: client?.id } })
  }

  const handleViewAccount = (accountId: number) => {
    navigate(`/accounts/${accountId}`)
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!client) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          Client not found
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate("/clients")} sx={{ mt: 2 }}>
          Back to Clients
        </Button>
      </Box>
    )
  }

  const hasCurrentAccount = accounts.some((account) => account.type === AccountType.CURRENT)
  const hasSavingsAccount = accounts.some((account) => account.type === AccountType.SAVINGS)
  const canCreateAccount = !hasCurrentAccount || !hasSavingsAccount

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate("/clients")} sx={{ mb: 3 }}>
        Back to Clients
      </Button>

      <Typography variant="h4" gutterBottom>
        Client Details
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Client ID
              </Typography>
              <Typography variant="body1">{client.id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">{client.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{client.email}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Client Accounts</Typography>
        {canCreateAccount && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateAccount}>
            Create Account
          </Button>
        )}
      </Box>

      {accounts.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.id}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell>€{account.balance.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" size="small" onClick={() => handleViewAccount(account.id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">No accounts found for this client</Typography>
          {canCreateAccount && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateAccount} sx={{ mt: 2 }}>
              Create Account
            </Button>
          )}
        </Paper>
      )}
    </Box>
  )
}

