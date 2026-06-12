// Auth group layout — no authentication check, no sidebar.
// This wraps /admin/login only.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
