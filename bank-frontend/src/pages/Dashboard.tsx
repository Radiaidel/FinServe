"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
} from "@mui/material"
import {
  People as PeopleIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { getClients, getAccounts } from "../services/api"
import type { Client, Account } from "../types"

const Dashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const theme = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsData, accountsData] = await Promise.all([getClients(), getAccounts()])
        setClients(clientsData)
        setAccounts(accountsData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      }
    }
    fetchData()
  }, [])

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const averageBalance = accounts.length > 0 ? totalBalance / accounts.length : 0

  const accountTypeData = [
    { name: "Current", value: accounts.filter((a) => a.type === "COURANT").length },
    { name: "Savings", value: accounts.filter((a) => a.type === "EPARGNE").length },
  ]

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main]

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}>
            <Typography variant="h6" gutterBottom>
              Total Clients
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <PeopleIcon sx={{ fontSize: 40, mr: 1, color: theme.palette.primary.main }} />
              {clients.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}>
            <Typography variant="h6" gutterBottom>
              Total Accounts
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <AccountBalanceIcon sx={{ fontSize: 40, mr: 1, color: theme.palette.secondary.main }} />
              {accounts.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}>
            <Typography variant="h6" gutterBottom>
              Total Balance
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <AttachMoneyIcon sx={{ fontSize: 40, mr: 1, color: theme.palette.success.main }} />
              {totalBalance.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column", height: 140 }}>
            <Typography variant="h6" gutterBottom>
              Avg. Balance
            </Typography>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <TrendingUpIcon sx={{ fontSize: 40, mr: 1, color: theme.palette.info.main }} />
              {averageBalance.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        {/* Account Type Distribution */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Account Type Distribution" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={accountTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {accountTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Clients */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="Recent Clients" action={<Button color="primary">View All</Button>} />
            <CardContent>
              <List>
                {clients.slice(0, 5).map((client) => (
                  <React.Fragment key={client.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{client.name.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={client.name} secondary={client.email} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard

