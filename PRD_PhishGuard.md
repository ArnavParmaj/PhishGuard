# PhishGuard AI — Product Requirements Document

## 1. Project Overview

### 1.1 Product Name
**PhishGuard AI** — Psychological Attack Vector Detector for Indian Users

### 1.2 One-Line Pitch
PhishGuard AI doesn't just detect phishing — it identifies *how* a scam is psychologically manipulating you, in the way Indians actually communicate (English, Hindi, Marathi, Hinglish, code-switched language).

### 1.3 Problem Statement
Phishing scams in India are increasingly sophisticated, often written or spoken in regional languages and Hinglish (Hindi-English code-switching). Existing detection tools:
- Focus almost exclusively on English
- Only flag *whether* something is a scam, not *how* it manipulates
- Don't handle audio/voice call scams at all
- Miss the psychological manipulation layer that makes scams effective

### 1.4 Solution Summary
A web application where users can paste suspicious text messages or upload audio recordings of suspicious calls. The system analyzes the content, detects phishing intent, identifies the psychological manipulation tactic being used, highlights specific suspicious phrases, and displays a comprehensive risk dashboard.

### 1.5 Target Users
- Indian individuals receiving suspicious SMS, WhatsApp messages, or calls
- Small business owners targeted by UPI/payment fraud
- Anyone wanting to verify if a message or call is legitimate

### 1.6 Platform
Web application (React + Vite frontend, Node.js/Express backend). Runs in browser, no installation required. Optimized for desktop demo but mobile-responsive.

---

## 2. Tech Stack

### 2.1 Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Language**: JavaScript (no TypeScript to move fast)
- **HTTP Client**: Axios or native fetch

### 2.2 Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI / NLP**: TBD — either an LLM API or an NLP model (decision to be made during build)
- **Audio Transcription**: TBD — either a third-party transcription API or Web Speech API
- **File Uploads**: Multer (for audio file handling)
- **Environment**: dotenv

### 2.3 No Database Required
This is a stateless app. No user accounts, no persistence. Every analysis is a fresh request.

### 2.4 Environment Variables Required
```
AI_API_KEY=your_key_here
TRANSCRIPTION_API_KEY=your_key_here
PORT=3001
```

---

## 3. Application Architecture

```
User Browser (React App)
        |
        | HTTP requests
        v
Express Backend (Node.js)
        |
        |--- Text input ---------> AI / NLP Service (analysis)
        |--- Audio file ---------> Transcription Service
                                        |
                                        v
                                   AI / NLP Service (analysis)
                                        |
                                        v
                              Structured JSON response
                                        |
                                        v
                              React Dashboard renders results
```

---

## 4. Features

### 4.1 Feature 1 — Text / SMS Message Analyzer (CORE)

**Description**: User pastes any suspicious text message. The system analyzes it and returns a full risk breakdown.

**Input**:
- A text area where the user can paste any message
- Supports English, Hindi (Devanagari script), Marathi, Tamil, and Hinglish
- Max 2000 characters
- An "Analyze" button to trigger analysis

**Processing**:
- Frontend sends the raw text to the backend via POST `/api/analyze/text`
- Backend passes the text through the AI/NLP service
- Service returns a structured JSON response (see expected output shape in Section 6)

**Output** (displayed on dashboard):
- Risk Level badge: SAFE / SUSPICIOUS / HIGH RISK
- Detected language
- Manipulation tactic label (see Section 5 for tactic taxonomy)
- List of suspicious phrases highlighted in the original message
- Plain English explanation of why it's flagged
- Confidence score (0-100)

**Edge Cases**:
- Empty input → show validation error, don't call backend
- Very short message (< 10 chars) → show warning "Message too short to analyze reliably"
- Backend failure → show error state with retry button

---

### 4.2 Feature 2 — Audio / Voice Call Analyzer (CORE)

**Description**: User uploads an audio file of a suspicious call or voice note. System transcribes it and runs the same phishing analysis on the transcript.

**Input**:
- Drag-and-drop or click-to-upload file input
- Supported formats: MP3, WAV, M4A, OGG, WEBM
- Max file size: 25MB
- An "Analyze Audio" button

**Processing**:
- Frontend uploads the audio file to backend via POST `/api/analyze/audio` (multipart/form-data)
- Backend sends audio to transcription service (auto language detection preferred)
- Once transcript is ready, backend passes transcript through the same AI/NLP analysis pipeline as text
- Returns transcript + analysis result

**Output** (displayed on dashboard):
- Full transcript text
- Same risk dashboard as text analysis
- Highlighted suspicious phrases within the transcript
- Detected language of the audio

**Loading States**:
- "Uploading audio..." → "Transcribing... this may take a few seconds" → "Analyzing..." → Results
- Show a progress indicator during transcription (can take 10-30 seconds)

**Edge Cases**:
- Unsupported file format → show error before uploading
- File too large → show error before uploading
- Transcription fails or times out → show error with message "Could not transcribe audio. Please try a clearer recording."
- Silent or empty audio → handle gracefully

---

### 4.3 Feature 3 — Risk Analysis Dashboard (CORE)

**Description**: After analysis (text or audio), the full results are displayed in a clean dashboard. This is the visual centerpiece of the app.

**Components**:

#### 3a. Risk Level Banner
- Full-width colored banner at the top of results
- GREEN + shield icon = "SAFE — No phishing indicators detected"
- YELLOW + warning icon = "SUSPICIOUS — Possible scam, proceed carefully"
- RED + danger icon = "HIGH RISK — Strong phishing indicators detected"

#### 3b. Manipulation Tactic Card
- Prominent card showing the detected psychological tactic
- Tactic name (e.g., "URGENCY TRAP") with an icon
- 1-2 sentence explanation of what this tactic means and why scammers use it
- See Section 5 for all tactics

#### 3c. Highlighted Message / Transcript
- The original message or transcript displayed with suspicious phrases highlighted in red/orange
- Hovering over a highlighted phrase shows a tooltip explaining why that specific phrase is suspicious
- Non-suspicious parts shown in normal text

#### 3d. Suspicious Indicators List
- Bullet list of specific red flags found
- Each indicator is a short phrase with a brief explanation
- Example: "🚨 OTP Request — Legitimate banks never ask for your OTP"
- Example: "⚠️ Urgency Language — 'account will be blocked in 2 hours' creates panic to bypass rational thinking"

#### 3e. Confidence Score Meter
- A visual progress bar or gauge showing confidence score (0-100)
- Below 40: Low confidence (show note: "Not enough context to be certain")
- 40-70: Medium confidence
- 70-100: High confidence

#### 3f. Language Detection Badge
- Small badge showing detected language (e.g., "🇮🇳 Hindi", "🔀 Hinglish", "🇬🇧 English")

#### 3g. Tactics Breakdown Chart (Bonus visual)
- A simple bar chart (Recharts) showing which manipulation categories were detected
- Categories on X axis, intensity score on Y axis
- Makes the dashboard look analytical and impressive

---

### 4.4 Feature 4 — Sample Test Cases (CORE for Demo)

**Description**: Pre-loaded example messages that users (and judges) can click to instantly see the system in action without typing anything.

**Why this is important**: During a hackathon demo you don't want to be typing. One click and the demo runs.

**Samples to include** (hardcoded in frontend):

1. **English Phishing SMS**
   ```
   Dear Customer, Your SBI account has been suspended due to suspicious activity. 
   Click here immediately to verify: http://sbi-secure-verify.xyz or your account 
   will be permanently blocked within 2 hours. Share your OTP to confirm identity.
   ```

2. **Hindi Phishing SMS**
   ```
   प्रिय ग्राहक, आपका बैंक खाता बंद होने वाला है। अभी अपना OTP साझा करें: 
   8876543210। यह सरकारी आदेश है। 2 घंटे में कार्रवाई न करने पर खाता हमेशा के 
   लिए बंद हो जाएगा।
   ```

3. **Hinglish Phishing (Most unique)**
   ```
   Bhai, aapka PhonePe account suspicious activity ki wajah se block ho raha hai. 
   Abhi is number pe call karo: 9876543210. Agar 1 ghante mein verify nahi kiya 
   toh aapke sare paise freeze ho jayenge. Ye RBI ka order hai.
   ```

4. **Safe Message (Control case)**
   ```
   Your OTP for logging into HDFC NetBanking is 847291. Valid for 10 minutes. 
   Do NOT share this OTP with anyone. HDFC Bank never asks for your OTP.
   ```

Each sample shows as a clickable card. Clicking it auto-populates the text area and runs analysis.

---

### 4.5 Feature 5 — Analysis History (Nice to Have, implement if time permits)

**Description**: Keep last 5 analyses in browser memory (not localStorage, just React state) so users can compare results.

**Implementation**: Simple array in React state, render as a sidebar or bottom section. Each history item shows: timestamp, first 50 chars of message, risk level badge.

**Skip if running low on time.**

---

## 5. Manipulation Tactic Taxonomy

This is the core intellectual differentiator of PhishGuard AI. The AI/NLP layer must classify every message into one of these tactic categories:

| Tactic ID | Tactic Name | Description | Common Phrases |
|---|---|---|---|
| T1 | URGENCY TRAP | Creates artificial time pressure to bypass rational thinking | "account blocked in 2 hours", "abhi karo", "immediately" |
| T2 | FALSE AUTHORITY | Impersonates trusted institutions (banks, RBI, police, government) | "RBI order", "CBI notice", "SBI alert", "government directive" |
| T3 | FEAR INDUCTION | Threatens negative consequences (arrest, account freeze, legal action) | "legal action", "FIR darz hogi", "account freeze", "police" |
| T4 | OTP / CREDENTIAL HARVEST | Directly requests sensitive information | "share OTP", "apna PIN batao", "verify card number" |
| T5 | REWARD BAIT | Promises fake rewards, lottery wins, cashback | "aapne 50,000 jeeta", "lucky draw winner", "cashback claim" |
| T6 | TRUST BUILDING | Uses personal details or mimics legitimate communication style to seem real | Uses your name, references real transaction amounts, copies official formatting |
| T7 | SAFE | No manipulation tactic detected | N/A |

---

## 6. Expected JSON Response Shape

Regardless of whether the backend uses an LLM API or an NLP model, it must return a JSON object in this exact shape to the frontend:

```json
{
  "riskLevel": "SAFE" | "SUSPICIOUS" | "HIGH_RISK",
  "confidenceScore": <number 0-100>,
  "detectedLanguage": <string>,
  "manipulationTactic": {
    "id": "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
    "name": <string>,
    "explanation": <string>
  },
  "suspiciousPhrases": [
    {
      "phrase": <exact substring from original message>,
      "reason": <string>
    }
  ],
  "indicators": [
    {
      "flag": <string>,
      "explanation": <string>
    }
  ],
  "summary": <string>
}
```

The frontend is built entirely around this shape. The backend AI/NLP implementation is interchangeable as long as it returns this structure.

---

## 7. API Endpoints

| Method | Endpoint | Input | Output |
|---|---|---|---|
| POST | `/api/analyze/text` | `{ text: string }` | Analysis JSON (Section 6 shape) |
| POST | `/api/analyze/audio` | `multipart/form-data` with audio file | `{ transcript: string, analysis: <Section 6 shape> }` |
| GET | `/api/health` | None | `{ status: "ok" }` |

---

## 8. Frontend Page Structure

### 8.1 Single Page Application Layout

```
┌─────────────────────────────────────┐
│  HEADER: PhishGuard AI logo + tagline│
├─────────────────────────────────────┤
│  TABS: [Text Analysis] [Audio Analysis]│
├─────────────────────────────────────┤
│  INPUT SECTION                       │
│  (text area OR audio upload)         │
│  + Sample Test Cases (clickable)     │
│  + Analyze Button                    │
├─────────────────────────────────────┤
│  LOADING STATE (spinner + message)  │
├─────────────────────────────────────┤
│  RESULTS DASHBOARD                   │
│  - Risk Banner                       │
│  - Tactic Card                       │
│  - Highlighted Message               │
│  - Indicators List                   │
│  - Confidence Meter                  │
│  - Language Badge                    │
│  - Tactics Chart                     │
└─────────────────────────────────────┘
```

### 8.2 Color System
- HIGH RISK: Red (`#EF4444`)
- SUSPICIOUS: Orange/Yellow (`#F59E0B`)
- SAFE: Green (`#10B981`)
- Background: Dark theme (`#0F172A`) — looks more "security" themed
- Cards: Slightly lighter (`#1E293B`)
- Text: White / light gray

### 8.3 Key UI States
- **Idle**: Input section visible, results section hidden
- **Loading**: Spinner overlay on results area, input disabled
- **Success**: Full dashboard visible
- **Error**: Error card with retry button

---

## 9. Project Folder Structure

```
phishguard-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── TextAnalyzer.jsx
│   │   │   ├── AudioAnalyzer.jsx
│   │   │   ├── SampleCases.jsx
│   │   │   ├── ResultsDashboard.jsx
│   │   │   ├── RiskBanner.jsx
│   │   │   ├── TacticCard.jsx
│   │   │   ├── HighlightedMessage.jsx
│   │   │   ├── IndicatorsList.jsx
│   │   │   ├── ConfidenceMeter.jsx
│   │   │   └── TacticsChart.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   └── analyze.js
│   ├── services/
│   │   ├── aiService.js              ← AI/NLP logic goes here (swap as needed)
│   │   └── transcriptionService.js   ← Audio transcription logic goes here
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 10. Non-Functional Requirements

### 10.1 Performance
- Text analysis response: under 5 seconds
- Audio transcription + analysis: under 60 seconds
- Frontend should show loading state immediately on submit

### 10.2 Error Handling
- Every API call wrapped in try/catch
- User-friendly error messages (not raw error dumps)
- Retry button on all error states

### 10.3 CORS
- Backend must allow requests from frontend origin (`http://localhost:5173` in dev)
- Use `cors` npm package in Express

### 10.4 No Auth Required
- No login, no signup, no sessions
- Stateless — every request is independent

---

## 11. Out of Scope (Do NOT build these)

- User accounts or authentication
- Database or persistent storage
- Real-time audio analysis (live call monitoring)
- Browser extension
- Mobile app
- SMS gateway integration
- Link/URL scanning
- Multiple file upload in one go
- Dark web monitoring

---

## 12. Demo Script (For Judges)

**Step 1**: Open the app, explain the problem in 30 seconds — "Scams in India work because they exploit psychology, not just spam filters"

**Step 2**: Click the Hinglish sample case — watch it auto-populate and analyze

**Step 3**: Show the result — point out the tactic card ("URGENCY TRAP + FALSE AUTHORITY"), the highlighted phrases, the Hindi text being understood

**Step 4**: Switch to Audio tab, upload a pre-recorded scam call audio (prepare this beforehand)

**Step 5**: Show transcript + same analysis pipeline running on spoken Hinglish

**Step 6**: Click the SAFE sample — show that it correctly identifies a real bank OTP message as safe (important to show it doesn't false-positive)

**Pitch close**: "Every other team tells you *if* a message is a scam. We tell you *how* it's manipulating you — and we do it in the way Indians actually speak."

---

## 13. Dependencies

### Frontend
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "recharts": "^2.x",
  "axios": "^1.x",
  "tailwindcss": "^3.x"
}
```

### Backend
```json
{
  "express": "^4.x",
  "cors": "^2.x",
  "dotenv": "^16.x",
  "multer": "^1.x",
  "node-fetch": "^3.x"
}
```

---

## 14. Setup Instructions

```bash
# Backend
cd backend
npm install
cp .env.example .env   # add your API keys
node index.js          # runs on port 3001

# Frontend
cd frontend
npm install
npm run dev            # runs on port 5173
```

---

*This PRD is the single source of truth for PhishGuard AI. Build exactly what is described here and nothing more. Ship a working demo over a broken ambitious one.*
