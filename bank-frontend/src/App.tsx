import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import ClientList from "./pages/clients/ClientList"
import ClientDetails from "./pages/clients/ClientDetails"
import AddClient from "./pages/clients/AddClient"
import AccountList from "./pages/accounts/AccountList"
import AccountDetails from "./pages/accounts/AccountDetails"
import CreateAccount from "./pages/accounts/CreateAccount"
import { SnackbarProvider } from "./context/SnackbarContext"
import theme from "./theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/clients/add" element={<AddClient />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              <Route path="/accounts" element={<AccountList />} />
              <Route path="/accounts/create" element={<CreateAccount />} />
              <Route path="/accounts/:id" element={<AccountDetails />} />
            </Routes>
          </Layout>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App

