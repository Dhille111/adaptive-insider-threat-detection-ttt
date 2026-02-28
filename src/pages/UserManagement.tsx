import React from "react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useRBAC } from "@/lib/rbac";

const initialUsers = [
  { id: "U-001", name: "Aarav Singh", role: "Admin", status: "Active" },
  { id: "U-002", name: "Maya Patel", role: "Security Analyst", status: "Active" },
  { id: "U-003", name: "Noah Khan", role: "Viewer", status: "Active" },
  { id: "U-004", name: "Riya Mehta", role: "Viewer", status: "Suspended" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const { addAudit } = useRBAC();

  const toggleStatus = (id: string) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" }
          : user,
      ),
    );
    addAudit(`Admin updated user status for ${id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader title="User Management" description="Manage platform users and role assignments" />

      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["User ID", "Name", "Role", "Status", "Actions"].map((header) => (
                  <th key={header} className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-mono text-foreground">{user.id}</td>
                  <td className="p-3 text-foreground">{user.name}</td>
                  <td className="p-3 text-muted-foreground">{user.role}</td>
                  <td className="p-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.status === "Active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="secondary" onClick={() => toggleStatus(user.id)}>
                      {user.status === "Active" ? "Suspend" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
