import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type Role = "admin" | "analyst" | "viewer";

export interface AuditEntry {
  id: number;
  actorRole: Role;
  action: string;
  timestamp: string;
}

interface RBACContextValue {
  role: Role;
  setRole: (role: Role) => void;
  logs: AuditEntry[];
  addAudit: (action: string) => void;
}

const RBACContext = createContext<RBACContextValue | undefined>(undefined);

const nowString = () => new Date().toLocaleString();

export function RBACProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("viewer");
  const [logs, setLogs] = useState<AuditEntry[]>([
    { id: 1, actorRole: "admin", action: "Admin trained model", timestamp: nowString() },
    { id: 2, actorRole: "analyst", action: "Analyst resolved case INC-2402", timestamp: nowString() },
    { id: 3, actorRole: "viewer", action: "Viewer accessed dashboard", timestamp: nowString() },
  ]);

  const addAudit = useCallback((action: string) => {
    setLogs((previous) => [
      {
        id: Date.now(),
        actorRole: role,
        action,
        timestamp: nowString(),
      },
      ...previous,
    ]);
  }, [role]);

  const value = useMemo(
    () => ({ role, setRole, logs, addAudit }),
    [role, logs, addAudit],
  );

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBAC must be used within RBACProvider");
  }
  return context;
}
