import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function PlaybookNotFound() {
  return <div className="empty-state"><span className="empty-icon"><MagnifyingGlass size={24} aria-hidden="true" /></span><h1>Playbook not found</h1><p>This link may point to an older name, or the guide has not been written yet.</p><Link className="button" href="/playbooks">Browse the playbooks</Link></div>;
}
