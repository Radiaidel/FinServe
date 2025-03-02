import { Snackbar, Alert } from "@mui/material"
import { useSnackbar } from "../context/SnackbarContext"

export default function GlobalSnackbar() {
  const { snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useSnackbar()

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  )
}

