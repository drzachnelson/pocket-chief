"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, EnvelopeSimple, SpinnerGap } from "@phosphor-icons/react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function SignInForm({ demo }: { demo: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    if (demo) { router.replace("/"); return; }
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setMessage("Authentication is not configured."); setBusy(false); return; }
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/auth/callback` } });
    setMessage(error ? "Sign-in was not accepted. Use the configured owner email." : "Check your email for the private sign-in link."); setBusy(false);
  }

  return (
    <form className="auth-card" onSubmit={submit}>
      <div className="brand auth-brand"><span className="brand-mark"><span>PC</span></span><span><strong>Pocket Chief</strong><small>Private surgery atlas</small></span></div>
      <div className="auth-copy"><p className="eyebrow">Owner access only</p><h1>Open your atlas</h1><p>A passwordless link will be sent only to the configured owner email. Public signup is disabled.</p></div>
      {!demo && <div className="field"><label htmlFor="email">Owner email</label><div className="auth-input"><EnvelopeSimple size={18} /><input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div></div>}
      {demo && <div className="demo-notice">Local demo mode is active. Connect Supabase before deployment to enable owner-only access.</div>}
      {message && <p className="form-message" role="status">{message}</p>}
      <button className="button auth-button" disabled={busy} type="submit">{busy ? <SpinnerGap className="spin" size={16} /> : <>{demo ? "Enter local preview" : "Email me a sign-in link"}<ArrowRight size={15} /></>}</button>
      <small className="auth-disclaimer">Educational reference only. Never enter patient information.</small>
    </form>
  );
}
