import { AuthProvider } from "@/lib/auth/AuthProvider";
import { FazendaAtivaProvider } from "@/lib/fazenda-ativa/FazendaAtivaProvider";
import { CampoShell } from "./CampoShell";

export default function CampoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FazendaAtivaProvider>
        <CampoShell>{children}</CampoShell>
      </FazendaAtivaProvider>
    </AuthProvider>
  );
}
