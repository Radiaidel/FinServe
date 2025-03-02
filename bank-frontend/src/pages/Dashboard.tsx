"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress } from "@mui/material"
import { People as PeopleIcon, AccountBalance as AccountBalanceIcon } from "@mui/icons-material"
import { getClients, getAccounts } from "../services/api"
import { useSnackbar } from "../context/SnackbarContext"
import type { Client, Account } from "../types"

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [clientsData, accountsData] = await Promise.all([getClients(), getAccounts()])
        setClients(clientsData)
        setAccounts(accountsData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        showSnackbar("Failed to load dashboard data", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [showSnackbar])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                <Typography variant="h5">Clients</Typography>
              </Box>
              <Typography variant="h3" align="center" sx={{ my: 2 }}>
                {clients.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total number of registered clients
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/clients")}>
                View All Clients
              </Button>
              <Button size="small" onClick={() => navigate("/clients/add")}>
                Add New Client
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <AccountBalanceIcon sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                <Typography variant="h5">Accounts</Typography>
              </Box>
              <Typography variant="h3" align="center" sx={{ my: 2 }}>
                {accounts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total number of active accounts
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/accounts")}>
                View All Accounts
              </Button>
              <Button size="small" onClick={() => navigate("/accounts/create")}>
                Create New Account
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

