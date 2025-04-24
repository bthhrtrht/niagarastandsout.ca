// lib/isAdmin.ts
export default function isAdmin(email: string): boolean {
  return email === process.env.NSO_ADMIN;
}
