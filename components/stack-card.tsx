type StackItem = {
  area: string;
  technology: string;
};

const stack: StackItem[] = [
  { area: "Frontend", technology: "Next.js + Tailwind CSS" },
  { area: "Backend", technology: "Firebase Cloud Functions" },
  { area: "Database", technology: "Cloud Firestore" },
  { area: "Authentication", technology: "Firebase Authentication" },
  { area: "File Upload", technology: "Firebase Storage" },
  { area: "Email Parsing", technology: "Gmail API" },
  { area: "AI", technology: "OpenAI API or Claude" }
];

export function StackCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
      </div>
      <ul className="divide-y divide-slate-100">
        {stack.map((item) => (
          <li key={item.area} className="flex items-center justify-between p-4 text-sm">
            <span className="font-medium text-slate-700">{item.area}</span>
            <span className="text-slate-500">{item.technology}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
