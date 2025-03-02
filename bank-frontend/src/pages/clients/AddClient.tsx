"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Paper, TextField, Button, Grid, CircularProgress } from "@mui/material"
import { ArrowBack, Save } from "@mui/icons-material"
import { createClient } from "../../services/api"
import { useSnackbar } from "../../context/SnackbarContext"
import type { ClientFormData } from "../../types"

export default function AddClient() {
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
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
      const newClient = await createClient(formData)
      showSnackbar("Client created successfully", "success")
      navigate(`/clients/${newClient.id}`)
    } catch (error) {
      console.error("Error creating client:", error)
      showSnackbar("Failed to create client", "error")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate("/clients")} sx={{ mb: 3 }}>
        Back to Clients
      </Button>

      <Typography variant="h4" gutterBottom>
        Add New Client
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                disabled={submitting}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={submitting}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate("/clients")} disabled={submitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={submitting ? <CircularProgress size={20} /> : <Save />}
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save Client"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

