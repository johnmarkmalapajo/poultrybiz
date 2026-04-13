// src/hooks/useUser.js
export function useUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const rawRole = user.role || "";

    // ── Normalize old role names to new ones ──
    // Old: "admin" → New: "Admin"
    // Old: "staff" → New: "Farmer"
    let role = rawRole;
    if (rawRole === "admin")  role = "Admin";
    if (rawRole === "staff")  role = "Farmer";

    // Only Admin can see financial data
    const canSeeFinancials = role.toLowerCase() === "admin";

    // Return user with normalized role
    return {
      user: { ...user, role },
      role,
      canSeeFinancials,
    };
  } catch {
    return { user: {}, role: "", canSeeFinancials: false };
  }
}