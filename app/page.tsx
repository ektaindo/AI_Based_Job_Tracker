import { ArchitectureDiagram } from "@/components/architecture";
import { StackCard } from "@/components/stack-card";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 p-6 md:p-10">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
          Firebase + AI Project
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">AI Based Job Tracker</h1>
        <p className="max-w-3xl text-slate-600">
          This starter project includes Firebase Authentication, Firestore data modeling, Firebase Storage,
          Gmail parsing hooks, and AI job-matching extension points.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <StackCard />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">System Architecture</h2>
          <ArchitectureDiagram />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">User Flow</h2>
        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Signup or login with Firebase Authentication (email/password or Google).</li>
          <li>Navigate to dashboard and complete profile details (skills, experience, resume).</li>
          <li>Upload resume to Firebase Storage and store URL in Firestore.</li>
          <li>Cloud Functions can fetch Gmail application emails and update applied jobs.</li>
          <li>LLM function analyzes profile + applications and writes recommended jobs.</li>
        </ol>
      </section>
    </main>
  );
}
