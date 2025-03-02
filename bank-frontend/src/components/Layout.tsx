"use client"

import { type ReactNode, useState } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "@mui/material/styles"
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AccountBalance as AccountBalanceIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material"
import GlobalSnackbar from "./GlobalSnackbar"

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const theme = useTheme()

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Clients", icon: <PeopleIcon />, path: "/clients" },
    { text: "Accounts", icon: <AccountBalanceIcon />, path: "/accounts" },
  ]

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            FinServe Banking
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle} sx={{ color: theme.palette.primary.contrastText }}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: theme.palette.primary.light }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
        <GlobalSnackbar />
      </Main>
    </Box>
  )
}

