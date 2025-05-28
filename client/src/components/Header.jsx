import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
  Box,
  InputBase,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({
  setOpen,
  setActorOpen,
  setProducerOpen,
  handleLogout,
  searchTerm,
  handleSearchChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Add Movie", action: () => setOpen(true) },
    { label: "Add Actor", action: () => setActorOpen(true) },
    { label: "Add Producer", action: () => setProducerOpen(true) },
    {
      label: "Logout",
      action: handleLogout,
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          zIndex: 1000,
          bgcolor: "rgba(10, 0, 15, 0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transform: "translateZ(0)",
          px: 0,
          py: 0.5,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1,
              gap: 2,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="IMDb"
              sx={{ height: 40, cursor: "pointer" }}
            />

            {!isMobile && (
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  bgcolor: "#222",
                  borderRadius: 1,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, color: "#fff" }}
                  placeholder="Search movies..."
                  inputProps={{ "aria-label": "search movies" }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <IconButton type="submit" sx={{ p: "10px", color: "#fff" }}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            )}

            {isMobile ? (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={() => {
                        item.action();
                        handleMenuClose();
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={2}>
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="contained"
                    onClick={item.action}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Box sx={{ px: 2, py: 1, bgcolor: "#121212" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              bgcolor: "#222",
              borderRadius: 1,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "#fff" }}
              placeholder="Search movies..."
              inputProps={{ "aria-label": "search movies" }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IconButton type="submit" sx={{ p: "10px", color: "#fff" }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default Header;
