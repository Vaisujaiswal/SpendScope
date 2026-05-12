# DEVLOG

## Day 1 — 2026-05-05

**Hours worked:** 4

**What I did:**  
Started the project setup using React, Vite, TailwindCSS, and React Router. Created the basic homepage UI and routing structure for the audit flow.

**What I learned:**  
Learned how to properly configure TailwindCSS with Vite and structure reusable React components for a SaaS-style UI.

**Blockers / what I'm stuck on:**  
Had issues with TailwindCSS not loading correctly because of configuration problems and dependency version mismatches.

**Plan for tomorrow:**  
Build the audit form and start implementing the audit recommendation logic.

---

## Day 2 — 2026-05-06

**Hours worked:** 5

**What I did:**  
Built the AI spend audit form with fields for tools, plans, seats, monthly spend, team size, and use cases. Added localStorage persistence so form data stays after refresh.

**What I learned:**  
Learned controlled form handling in React and how localStorage can improve UX in multi-step forms.

**Blockers / what I'm stuck on:**  
The form state was resetting on refresh because I was saving data incorrectly in localStorage.

**Plan for tomorrow:**  
Improve the audit engine logic and add better recommendation calculations.

---

## Day 3 — 2026-05-07

**Hours worked:** 6

**What I did:**  
Created the audit engine with pricing-based recommendation logic for ChatGPT, Claude, Cursor, Copilot, and Gemini. Added optimization score, overspending percentage, and benchmark messaging.

**What I learned:**  
Learned how deterministic pricing logic can be more reliable than AI-generated financial analysis for explainable recommendations.

**Blockers / what I'm stuck on:**  
Had issues structuring the pricing data and handling multiple recommendation conditions cleanly.

**Plan for tomorrow:**  
Build the results page and integrate Supabase for storing audits and leads.

---

## Day 4 — 2026-05-08

**Hours worked:** 6

**What I did:**  
Integrated Supabase for storing audit reports and lead submissions. Added shareable audit URLs and dynamic routes for public audit pages.

**What I learned:**  
Learned how Supabase row-level security works and how dynamic React Router routes can be used for public pages.

**Blockers / what I'm stuck on:**  
Ran into row-level security policy errors and deployment routing issues when refreshing dynamic URLs.

**Plan for tomorrow:**  
Add AI-generated summaries, PDF export, and dashboard analytics.

---

## Day 5 — 2026-05-09

**Hours worked:** 5

**What I did:**  
Integrated OpenAI API for personalized audit summaries with fallback handling. Added PDF export functionality and created the analytics dashboard.

**What I learned:**  
Learned how to safely handle API failures and generate downloadable PDF reports using html2canvas and jsPDF.

**Blockers / what I'm stuck on:**  
PDF export initially failed because the wrong DOM element was being selected for rendering.

**Plan for tomorrow:**  
Improve responsiveness, mobile UI, and add transactional email support.

---

## Day 6 — 2026-05-10

**Hours worked:** 5

**What I did:**  
Improved mobile responsiveness across the dashboard and results page. Added Resend transactional email support and improved lead capture UX.

**What I learned:**  
Learned how overflow issues often come from absolute positioning, blur backgrounds, and flex layouts on smaller screens.

**Blockers / what I'm stuck on:**  
Had backend connection errors while integrating the email API and fixing environment variable issues.

**Plan for tomorrow:**  
Finalize documentation files, improve polish, and test the full project flow end-to-end.

---

## Day 7 — 2026-05-11

**Hours worked:** 4

**What I did:**  
Completed README.md, ARCHITECTURE.md, PRICING_DATA.md, and PROMPTS.md. Finalized UI polish, testing, deployment fixes, and overall project cleanup.

**What I learned:**  
Learned how much product thinking, UX decisions, and deployment details matter beyond just writing frontend code.

**Blockers / what I'm stuck on:**  
Still working on improving Lighthouse scores and final responsive polish for a few dashboard sections.

**Plan for tomorrow:**  
Perform final QA testing and prepare the project submission.