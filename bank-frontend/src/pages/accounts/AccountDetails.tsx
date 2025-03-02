"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Box, Typography, Card, CardContent, Grid, Button, CircularProgress, Chip } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { getAccountById, getClientById } from "../../services/api"
import { useSnackbar } from "../../context/SnackbarContext"
import { type Account, type Client, AccountType } from "../../types"

export default function AccountDetails() {
  const { id } = useParams<{ id: string }>()
  const [account, setAccount] = useState<Account | null>(null)
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!id) return

      try {
        setLoading(true)
        const accountId = Number.parseInt(id, 10)
        const accountData = await getAccountById(accountId)
        setAccount(accountData)

        // Fetch client data
        if (accountData.clientId) {
          const clientData = await getClientById(accountData.clientId)
          setClient(clientData)
        }
      } catch (error) {
        console.error("Error fetching account details:", error)
        showSnackbar("Failed to load account details", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchAccountData()
  }, [id, showSnackbar])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!account) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          Account not found
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate("/accounts")} sx={{ mt: 2 }}>
          Back to Accounts
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate("/accounts")} sx={{ mb: 3 }}>
        Back to Accounts
      </Button>

      <Typography variant="h4" gutterBottom>
        Account Details
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Account ID
              </Typography>
              <Typography variant="body1">{account.id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Account Type
              </Typography>
              <Chip label={account.type} color={account.type === AccountType.CURRENT ? "primary" : "secondary"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Balance
              </Typography>
              <Typography variant="h5">€{account.balance.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Client
              </Typography>
              {client ? (
                <Box>
                  <Typography variant="body1">{client.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {client.email}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate(`/clients/${client.id}`)}
                    sx={{ mt: 1, p: 0 }}
                  >
                    View Client Details
                  </Button>
                </Box>
              ) : (
                <Typography variant="body2" color="error">
                  Client information not available
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

