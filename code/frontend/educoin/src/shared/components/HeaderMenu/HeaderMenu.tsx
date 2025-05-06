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
import NotificationsIcon from "@mui/icons-material/Notifications";
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
            {usuario?.tipoUsuario === "ALUNO" && (
              <>
                <MenuItem onClick={() => handleNavigation("/estudante")}>
                  Vantagens Disponíveis
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/cupons")}>
                  Cupons
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/historico-trocas")}>
                  Histórico de Trocas
                </MenuItem>
              </>
            )}

            {usuario?.tipoUsuario === "EMPRESA" && (
              <>
                <MenuItem onClick={() => handleNavigation("/empresa")}>
                  Gerenciar Vantagens
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigation("/resgates-realizados")}
                >
                  Resgates Realizados
                </MenuItem>
              </>
            )}
          </Menu>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          {usuario ? (
            <div>
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
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
            <Typography
              variant="body2"
              sx={{ color: "white", marginRight: 2 }}
              onClick={() => {
                navigate("/");
              }}
            >
              Faça login
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
