import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function TopicNotFound() {
  return <div className="empty-state"><span className="empty-icon"><MagnifyingGlass size={24} aria-hidden="true" /></span><h1>Topic not found</h1><p>It may still be a draft, or this link points to an older name.</p><Link className="button" href="/">Search</Link></div>;
}
