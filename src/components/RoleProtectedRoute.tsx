import { Navigate } from "react-router-dom";
import { Role, useRBAC } from "@/lib/rbac";

export function RoleProtectedRoute({
  allow,
  children,
}: {
  allow: Role[];
  children: React.ReactNode;
}) {
  const { role } = useRBAC();

  if (!allow.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
