// import { useUser } from "@clerk/clerk-react";
import { Roles } from "../../constants/roles";
import { Routes } from "../../constants/routes";
// import { Navigate } from "react-router";

const RoleBasedProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const { user } = useUser();

  // Bypass Clerk for demo - always allow access
  // if (user.publicMetadata.role === Roles.LIMITED_PARTNER) {
  //   return <Navigate to={Routes.LIMITED_PARTNER_FUNDS} />
  // }

  return (
    <>
      {children}
    </>
  )
} 

export default RoleBasedProtectedRoute;
