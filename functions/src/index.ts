import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";

admin.initializeApp();

export const parseGmailApplications = onRequest(async (_req, res) => {
  // TODO: Exchange OAuth token and fetch messages from Gmail API.
  // TODO: Parse job application events and persist to `appliedJobs`.
  res.json({ status: "stub", message: "Gmail parsing function placeholder" });
});

export const generateJobRecommendations = onRequest(async (_req, res) => {
  // TODO: Read user profile + applied jobs from Firestore.
  // TODO: Call OpenAI or Claude to score/match jobs.
  // TODO: Write recommendations to `recommendedJobs`.
  res.json({ status: "stub", message: "LLM matching function placeholder" });
});
