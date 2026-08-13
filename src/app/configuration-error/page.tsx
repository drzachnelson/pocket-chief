import type { Metadata } from "next";

export const metadata: Metadata = { title: "Configuration required" };

export default function ConfigurationErrorPage() {
  return (
    <section className="empty-state configuration-state">
      <h1>Pocket Chief is locked</h1>
      <p>Owner authentication and private storage have not been configured for this deployment. No content or AI routes are available until Supabase and the owner email are set.</p>
    </section>
  );
}
