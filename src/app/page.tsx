import Link from "next/link";
import { invitations } from "@/content/registry";

export default function Home() {
  const items = Object.entries(invitations);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-300 px-6 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl text-neutral-100 mb-2">Invitaciones</h1>
        <p className="text-sm text-neutral-500 mb-8">
          Cada evento tiene su propio enlace.
        </p>

        <ul className="space-y-3">
          {items.map(([slug, data]) => (
            <li key={slug}>
              <Link
                href={`/${slug}`}
                className="block rounded-xl border border-neutral-800 bg-neutral-900 px-5 py-4 hover:border-neutral-600 transition-colors"
              >
                <span className="block text-base text-neutral-100">
                  {data.seo.title}
                </span>
                <code className="text-xs text-neutral-500">/{slug}</code>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}