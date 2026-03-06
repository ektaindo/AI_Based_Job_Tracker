const architectureLines = [
  "Next.js Frontend",
  "       |",
  "Firebase Auth → Login / Signup",
  "       |",
  "Cloud Firestore → User Data + Jobs",
  "       |",
  "Firebase Storage → Resume Upload",
  "       |",
  "Cloud Functions",
  "       |---- Gmail API (Fetch applied jobs)",
  "       |---- LLM (job matching)"
];

export function ArchitectureDiagram() {
  return (
    <pre className="rounded-lg bg-slate-900 p-4 text-sm leading-6 text-slate-100 overflow-x-auto">
      {architectureLines.join("\n")}
    </pre>
  );
}
