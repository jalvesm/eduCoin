import { JSX } from "react";
import { useAuth } from "../../../data/context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(usuario.tipoUsuario)) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return children;
}
