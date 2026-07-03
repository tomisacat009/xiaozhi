import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="pageShell">
      <SiteHeader />
      <main className="pageMain">{children}</main>
      <SiteFooter />
    </div>
  );
}
