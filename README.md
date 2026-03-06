# AI Based Job Tracker (Firebase + Next.js)

This project is a starter template for an AI-powered job tracker using Firebase services and a Next.js frontend.

## 1) Tech Stack

- **Frontend:** Next.js
- **UI:** Tailwind CSS
- **Backend:** Firebase Cloud Functions (optional but scaffolded)
- **Database:** Cloud Firestore
- **Authentication:** Firebase Authentication
- **File Upload:** Firebase Storage
- **Email Parsing:** Gmail API
- **AI:** OpenAI API or Claude

## 2) System Architecture

```text
Next.js Frontend
       |
Firebase Auth  → Login / Signup
       |
Cloud Firestore → User Data + Jobs
       |
Firebase Storage → Resume Upload
       |
Cloud Functions
       |---- Gmail API (Fetch applied jobs)
       |---- LLM (job matching)
```

## 3) Firestore Database Structure

Firestore uses collections/documents (NoSQL):

### `users` collection

```text
users
   |
   |-- userId
        name
        email
        resumeUrl
        skills
        experience
        createdAt
```

### `appliedJobs` collection

```text
appliedJobs
   |
   |-- jobId
        userId
        company
        role
        portal
        appliedDate
        status
```

### `recommendedJobs` collection

```text
recommendedJobs
   |
   |-- jobId
        role
        company
        source
        link
        matchScore
```

## 4) User Flow

1. **Signup/Login** using Firebase Authentication.
2. Auth options:
   - Email/password
   - Google login
3. User lands on Dashboard after successful login.
4. Resume is uploaded to Firebase Storage and linked in Firestore.
5. Cloud Functions can:
   - Fetch job activity via Gmail API.
   - Use LLM to generate and store job recommendations.

## 5) Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill Firebase + API credentials in `.env.local`.
4. Run app:
   ```bash
   npm run dev
   ```

## 6) Firebase Functions

Cloud function placeholders are in `functions/src/index.ts`:
- `parseGmailApplications`
- `generateJobRecommendations`

Deploy after configuring Firebase project:

```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```
