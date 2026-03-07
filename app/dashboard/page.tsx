"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, hasFirebaseConfig } from "@/lib/firebase";
import { ResumeUpload } from "@/components/resume-upload";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasFirebaseConfig || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (loading) {
    return <main className="p-6">Checking session...</main>;
  }

  if (!hasFirebaseConfig || !auth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Firebase is not configured. Please fill <code>.env.local</code> first.
        </p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl space-y-6 bg-slate-50 p-6 md:p-10">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-slate-600">Logged in as {user.email ?? user.uid}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Logout
          </button>
        </div>
        <div className="mt-4 text-sm text-slate-700">
          <p>Welcome! Your first action is uploading your resume.</p>
          <p className="mt-1">
            Need another account? <Link href="/signup" className="text-brand underline">Create one</Link>.
          </p>
        </div>
      </section>

      <ResumeUpload userId={user.uid} />
    </main>
  );
}
