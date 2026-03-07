"use client";

import { FormEvent, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { hasFirebaseConfig, storage } from "@/lib/firebase";

type UploadState = "idle" | "uploading" | "success" | "error";

type ResumeUploadProps = {
  userId: string;
};

export function ResumeUpload({ userId }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [status, setStatus] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");

  const onUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasFirebaseConfig || !storage) {
      setStatus("error");
      setMessage("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values in .env.local.");
      return;
    }

    if (!file) {
      setStatus("error");
      setMessage("Please select a resume file.");
      return;
    }

    setStatus("uploading");
    setProgress(0);
    setDownloadUrl("");
    setMessage("");

    const normalizedFileName = file.name.replace(/\s+/g, "-").toLowerCase();
    const storageRef = ref(storage, `resumes/${userId}/${Date.now()}-${normalizedFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percent);
      },
      (error) => {
        setStatus("error");
        setMessage(error.message || "Failed to upload resume.");
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadUrl(url);
        setStatus("success");
        setMessage("Resume uploaded successfully. Save this URL in users.resumeUrl in Firestore.");
      }
    );
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold">Upload Resume</h2>
      <p className="mb-5 text-sm text-slate-600">Signed in as UID: {userId}</p>

      <form className="space-y-4" onSubmit={onUpload}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="resume">
            Resume file
          </label>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="block w-full rounded-md border border-slate-300 p-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={!file || status === "uploading"}
          className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {status === "uploading" ? "Uploading..." : "Upload Resume"}
        </button>
      </form>

      {(status === "uploading" || status === "success") && (
        <div className="mt-4">
          <p className="mb-1 text-sm text-slate-700">Upload Progress: {progress}%</p>
          <div className="h-2 overflow-hidden rounded bg-slate-200">
            <div className="h-full bg-brand transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {message && (
        <p className={`mt-4 text-sm ${status === "error" ? "text-red-600" : "text-emerald-600"}`}>{message}</p>
      )}

      {downloadUrl && (
        <p className="mt-2 break-all text-sm text-slate-700">
          Resume URL: <a className="text-brand underline" href={downloadUrl}>{downloadUrl}</a>
        </p>
      )}
    </section>
  );
}
