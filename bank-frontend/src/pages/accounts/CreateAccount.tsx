"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  type SelectChangeEvent,
} from "@mui/material"
import { ArrowBack, Save } from "@mui/icons-material"
import { createAccount, getClients } from "../../services/api"
import { useSnackbar } from "../../context/SnackbarContext"
import { type AccountFormData, AccountType, type Client } from "../../types"

interface LocationState {
  clientId?: number
}

export default function CreateAccount() {
  const location = useLocation()
  const state = location.state as LocationState
  const initialClientId = state?.clientId || ""

  const [formData, setFormData] = useState<AccountFormData>({
    balance: 0,
    type: AccountType.CURRENT,
    clientId: initialClientId as number,
  })

  const [clients, setClients] = useState<Client[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const clientsData = await getClients()
        setClients(clientsData)

        // If no client ID was provided in location state and we have clients, select the first one
        if (!initialClientId && clientsData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            clientId: clientsData[0].id,
          }))
        }
      } catch (error) {
        console.error("Error fetching clients:", error)
        showSnackbar("Failed to load clients", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [showSnackbar, initialClientId])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (formData.balance < 0) {
      newErrors.balance = "Balance cannot be negative"
    }

    if (!formData.clientId) {
      newErrors.clientId = "Client is required"
    }

    // Check if client already has this type of account
    if (formData.clientId && formData.type) {
      const selectedClient = clients.find((c) => c.id === formData.clientId)
      if (selectedClient) {
        // This validation would normally be done on the backend
        // For a complete implementation, you would need to fetch the client's accounts
        // and check if they already have an account of this type
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === "balance" ? Number.parseFloat(value) || 0 : value,
    }))

    // Clear error when user changes value
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }))

    // Clear error when user changes value
    if (name && errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setSubmitting(true)
      const newAccount = await createAccount(formData)
      showSnackbar("Account created successfully", "success")
      navigate(`/accounts/${newAccount.id}`)
    } catch (error) {
      console.error("Error creating account:", error)
      showSnackbar("Failed to create account", "error")
    } finally {
      setSubmitting(false)
    }
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
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Create New Account
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.clientId}>
                <InputLabel id="client-label">Client</InputLabel>
                <Select
                  labelId="client-label"
                  name="clientId"
                  value={formData.clientId || ""}
                  onChange={handleSelectChange}
                  label="Client"
                  disabled={submitting || !!initialClientId}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name} ({client.email})
                    </MenuItem>
                  ))}
                </Select>
                {errors.clientId && <FormHelperText>{errors.clientId}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel id="type-label">Account Type</InputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  value={formData.type}
                  onChange={handleSelectChange}
                  label="Account Type"
                  disabled={submitting}
                >
                  <MenuItem value={AccountType.CURRENT}>Current Account (COURANT)</MenuItem>
                  <MenuItem value={AccountType.SAVINGS}>Savings Account (EPARGNE)</MenuItem>
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Initial Balance"
                name="balance"
                type="number"
                value={formData.balance}
                onChange={handleTextFieldChange}
                error={!!errors.balance}
                helperText={errors.balance}
                disabled={submitting}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(-1)} disabled={submitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={submitting ? <CircularProgress size={20} /> : <Save />}
                  disabled={submitting}
                >
                  {submitting ? "Creating..." : "Create Account"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

