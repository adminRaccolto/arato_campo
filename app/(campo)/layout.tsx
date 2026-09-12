import { AuthProvider } from "@/lib/auth/AuthProvider";
import { CampoShell } from "./CampoShell";

export default function CampoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CampoShell>{children}</CampoShell>
    </AuthProvider>
  );
}
