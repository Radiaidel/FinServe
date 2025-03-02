"use client"

import { createContext, useState, type ReactNode, useContext } from "react"

type SnackbarSeverity = "success" | "error" | "warning" | "info"

interface SnackbarContextType {
  showSnackbar: (message: string, severity: SnackbarSeverity) => void
  snackbarOpen: boolean
  snackbarMessage: string
  snackbarSeverity: SnackbarSeverity
  closeSnackbar: () => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider")
  }
  return context
}

interface SnackbarProviderProps {
  children: ReactNode
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>("info")

  const showSnackbar = (message: string, severity: SnackbarSeverity) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const closeSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        closeSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}

