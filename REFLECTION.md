# REFLECTION

## 1. The hardest bug I hit this week, and how I debugged it

The hardest bug I faced was related to Supabase row-level security and public audit routing. Initially, audit data was being inserted correctly into the database, but when I tried accessing public result URLs or saving leads, I kept getting authorization and policy errors. At first, I assumed the issue was with my frontend requests or API structure. I checked whether the insert payloads were malformed, whether IDs were missing, and whether the routing state was failing after page refreshes.

After debugging step-by-step, I realized the real issue was the Supabase row-level security policies blocking inserts and reads from unauthenticated users. I tested queries directly in the Supabase dashboard, compared working and failing requests, and eventually updated the policies to allow controlled public access for inserts and reads. I also had routing problems on Vercel where refreshing a dynamic route caused a 404 error. I originally thought React Router was misconfigured, but the actual issue was Vercel needing a rewrite rule for SPA routing. Adding the proper vercel.json configuration solved it.

This debugging process taught me to isolate backend, frontend, and deployment problems separately instead of assuming everything is connected.

---

## 2. A decision I reversed mid-week, and what made you reverse it

One major decision I reversed was how I handled audit recommendations. In the beginning, I planned to generate most recommendations using AI so the platform would feel more intelligent and dynamic. After experimenting with this approach, I realized the results were inconsistent and difficult to trust for financial recommendations. Sometimes the AI produced vague suggestions or savings numbers that were not clearly explainable.

Mid-week, I decided to switch to a deterministic rule-based audit engine using structured pricing data and hardcoded recommendation logic. AI was then limited only to generating personalized summary text. I reversed the earlier decision because the assignment specifically emphasized defensible pricing logic and explainable reasoning. A finance or operations person should be able to understand exactly why a recommendation exists.

This change made the product much stronger. Recommendations became predictable, easier to debug, and easier to justify. It also improved trust in the product because the calculations were tied directly to pricing data rather than generated dynamically by AI.

---

## 3. What you would build in week 2 if you had it

If I had another week, I would focus on making SpendScope feel more like a production SaaS platform instead of just an MVP. The first thing I would improve is the benchmark system. Right now, benchmark insights are relatively simple, but I would build a larger dataset comparing spending patterns across different company sizes and engineering teams.

I would also build organization accounts with audit history tracking so teams could monitor AI spending over time instead of running one-time audits. Another improvement would be integrating live pricing APIs or automated pricing scrapers so recommendations stay current without manual updates.

From a product perspective, I would add referral systems and embeddable widgets so blogs or startup communities could share the audit tool more easily. I would also improve analytics dashboards with charts, trend monitoring, and per-developer spend analysis.

On the infrastructure side, I would move more processing server-side, introduce rate limiting with Redis, and queue AI summary generation jobs for better scalability. I would also spend more time optimizing Lighthouse scores and improving accessibility details across the UI.

---

## 4. How you used AI tools

I used AI tools mainly for debugging help, UI iteration ideas, prompt experimentation, and improving copywriting throughout the project. The primary tool I used was ChatGPT. I used it to help troubleshoot React state issues, Tailwind responsiveness problems, deployment errors, and backend integration mistakes. AI was especially helpful when debugging issues involving Supabase policies, React Router refresh behavior, and PDF export problems.

However, I intentionally did not trust AI for core financial recommendation logic. The audit engine calculations, pricing structure, savings rules, and optimization reasoning were implemented manually using deterministic logic because financial recommendations need to remain predictable and explainable.

One specific example where AI was wrong was during the email integration phase. An AI-generated suggestion placed the Resend email sending logic outside of the Express route handler, which caused runtime errors and undefined variables. I caught the mistake after reviewing the execution flow and realizing the API request context did not exist outside the route. I then restructured the email logic into a dedicated backend endpoint. That experience reinforced the importance of reviewing AI-generated code carefully instead of blindly trusting it.

---

## 5. Self-rating

## Discipline — 8/10
I stayed consistent throughout the project, kept improving the product daily, and continued debugging difficult issues instead of abandoning features when they became frustrating.

## Code Quality — 7/10
The project structure became significantly cleaner over time, especially after modularizing pricing data and separating backend routes, although there are still areas where the architecture could be improved further.

## Design Sense — 8/10
I focused heavily on creating a modern SaaS-style UI with strong visual hierarchy, dark mode styling, responsive layouts, and dashboard aesthetics instead of building a generic form-based interface.

## Problem-Solving — 8/10
I encountered multiple real-world debugging issues involving deployment, database permissions, routing, responsiveness, and backend APIs, and I was able to systematically solve them through testing and iteration.

## Entrepreneurial Thinking — 9/10
I approached the assignment as a product rather than just a coding task by focusing on lead generation, shareability, onboarding flow, benchmark messaging, and marketplace positioning aligned with Credex’s business model.