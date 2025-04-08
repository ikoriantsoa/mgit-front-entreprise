import { Navigate } from "react-router-dom";
import keycloak from "./keycloak";

const PrivateRoute = ({ children, roles }) => {
  const isAuthenticated: boolean = keycloak.authenticated;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const realmRoles: string[] = keycloak.tokenParsed?.realm_access?.roles || [];
  console.log("realmRoles", realmRoles);

  const clientRoles: string[] =
    keycloak.tokenParsed?.resource_access?.[keycloak.clientId]?.roles;
  console.log("clientRoles", clientRoles);

  const userRoles: string[] = [...realmRoles, ...clientRoles];
  console.log("userRoles", userRoles);
  

  if (roles && roles.length > 0) {
    const hasRequiredRole: boolean = roles.some((role) => userRoles.includes(role));
    console.log("hasRequiredRole", hasRequiredRole);

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default PrivateRoute;
