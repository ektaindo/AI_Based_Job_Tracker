# AI Based Job Tracker (Next.js + Firebase)

This app follows a simple user journey:

1. **Signup page** (`/signup`) as the first page.
2. **Login page** (`/login`) for existing users.
3. **Dashboard page** (`/dashboard`) after successful authentication.
4. Upload resume to **Firebase Storage** from the dashboard.

## Environment setup

Copy env template:

```bash
cp .env.example .env.local
```

Fill these values in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REDIRECT_URI=
```

## Fix for `Firebase: Error (auth/configuration-not-found)`

If signup/login fails with `auth/configuration-not-found`, verify these Firebase Console settings:

1. **Enable Authentication providers**
   - Firebase Console → Authentication → Sign-in method
   - Enable **Email/Password** for normal signup/login
   - Enable **Google** if you use the Google button
2. **Add authorized domain**
   - Firebase Console → Authentication → Settings → Authorized domains
   - Ensure `localhost` is present for local development
3. **Use matching web app config in `.env.local`**
   - Firebase Console → Project settings → General → Your apps (Web app)
   - Copy all `NEXT_PUBLIC_FIREBASE_*` values exactly
4. **Restart dev server** after env changes:

```bash
npm run dev
```

## Run locally

```bash
npm install
npm run lint
npm run dev
```

## Resume upload

- Upload UI: `components/resume-upload.tsx`
- Storage path: `resumes/{uid}/{timestamp}-{filename}`
- Supported types: `.pdf`, `.doc`, `.docx`

The dashboard uses the currently authenticated Firebase UID so uploads align with storage security rules.
