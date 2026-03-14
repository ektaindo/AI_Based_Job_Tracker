"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  AuthError,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, hasFirebaseConfig } from "@/lib/firebase";

type AuthMode = "signup" | "login";

type AuthFormProps = {
  mode: AuthMode;
};

function friendlyFirebaseError(error: unknown, mode: AuthMode): string {
  const code = (error as AuthError | undefined)?.code;

  switch (code) {
    case "auth/configuration-not-found":
      return (
        "Authentication is not configured in Firebase for this app. In Firebase Console, open Authentication → Sign-in method and enable " +
        (mode === "signup" || mode === "login" ? "Email/Password" : "required providers") +
        ". Also add your app domain (localhost) under Authentication → Settings → Authorized domains."
      );
    case "auth/invalid-api-key":
      return "Invalid Firebase API key. Verify NEXT_PUBLIC_FIREBASE_* values in .env.local and restart the dev server.";
    case "auth/app-not-authorized":
      return "This app/domain is not authorized in Firebase. Add localhost to Authentication authorized domains.";
    case "auth/operation-not-allowed":
      return "This sign-in method is disabled. Enable it under Firebase Authentication → Sign-in method.";
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";
    case "auth/invalid-credential":
      return "Invalid credentials. Check email/password and try again.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    default:
      return (error as Error)?.message ?? "Authentication failed. Please check Firebase configuration and try again.";
  }
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignup = mode === "signup";
  if (!hasFirebaseConfig || !auth) {
    return (
      <div className="mx-auto w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Firebase is not configured. Please fill <code>.env.local</code> with valid NEXT_PUBLIC_FIREBASE_* values.
      </div>
    );
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (authError) {
      setError(friendlyFirebaseError(authError, mode));
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/dashboard");
    } catch (authError) {
      setError(friendlyFirebaseError(authError, mode));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{isSignup ? "Create account" : "Welcome back"}</h1>
      <p className="mt-1 text-sm text-slate-600">
        {isSignup ? "Sign up to start tracking your job applications." : "Login to access your dashboard."}
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Please wait..." : isSignup ? "Sign up" : "Login"}
        </button>
      </form>

      <button
        type="button"
        onClick={continueWithGoogle}
        disabled={loading}
        className="mt-3 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-60"
      >
        Continue with Google
      </button>

      {error && <p className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <p className="mt-5 text-sm text-slate-600">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-brand underline">
          {isSignup ? "Login" : "Sign up"}
        </Link>
      </p>
    </div>
  );
}
