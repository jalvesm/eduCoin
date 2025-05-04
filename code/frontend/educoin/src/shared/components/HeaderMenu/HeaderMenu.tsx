import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../../data/context/AuthContext";
import { useNavigate } from "react-router-dom";
import colors from "../../theme/colors";

export default function HeaderMenu() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: colors.primary }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElMenu}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(anchorElMenu)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigation("/consultar-extratos")}>
              Consultar Extratos
            </MenuItem>

            {usuario?.tipoUsuario === "ALUNO" && (
              <>
                <MenuItem onClick={() => handleNavigation("/trocar-moedas")}>
                  Trocar Moedas
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigation("/resgatar-vantagens")}
                >
                  Resgatar Vantagens
                </MenuItem>
              </>
            )}

            {usuario?.tipoUsuario === "EMPRESA" && (
              <MenuItem
                onClick={() => handleNavigation("/gerenciar-vantagens")}
              >
                Gerenciar Vantagens
              </MenuItem>
            )}
          </Menu>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EduCoin
          </Typography>

          {usuario ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleUserMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleUserMenuClose}
              >
                <MenuItem>Perfil</MenuItem>
                <MenuItem>Configurações</MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Sair
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Typography variant="body2" sx={{ color: "white", marginRight: 2 }}>
              Faça login
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
