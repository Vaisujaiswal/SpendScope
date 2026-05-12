# PROMPTS

SpendScope uses an LLM only for personalized audit summaries.

The core audit calculations, pricing logic, savings estimates, and optimization recommendations are intentionally rule-based and deterministic.

---

# Purpose of AI Usage

The LLM is used to:
- generate personalized summary paragraphs
- make audit results feel more human and contextual
- improve readability of recommendations

The LLM is NOT used for:
- pricing calculations
- savings estimates
- financial decision making
- recommendation scoring

Those systems use hardcoded pricing rules for predictability and explainability.

---

# Main Prompt

```txt
You are an AI infrastructure cost optimization consultant.

Generate a personalized AI spend audit summary for a company.

Audit Details:
- Tool: ${tool}
- Current Plan: ${plan}
- Seats: ${seats}
- Team Size: ${teamSize}
- Recommendation: ${recommendation}
- Estimated Monthly Savings: $${savings}

Requirements:
- Keep response between 80-120 words
- Mention whether the organization may be overspending
- Explain WHY the recommendation makes sense
- Mention operational efficiency or scaling considerations
- Keep tone modern, strategic, and business-focused
- Avoid repeating generic phrases
- Make each summary feel personalized to the audit data

```

---

# Why This Prompt Was Structured This Way

The prompt was designed to:

- keep outputs concise and readable
- avoid overly generic AI language
- make summaries feel personalized
- maintain professional SaaS-style tone
- reduce hallucinated financial claims

The instructions intentionally emphasize operational efficiency and scaling because the target users are startup founders and engineering managers.

The word limit helps prevent the model from generating long repetitive explanations that reduce UX quality on the results page.

---

# What I Tried That Didn't Work

## 1. AI-Generated Savings Recommendations

Initially, I experimented with using the LLM to generate savings recommendations directly.

Example:

- asking the model to estimate whether teams were overspending
asking for alternative tool suggestions dynamically

- This produced inconsistent and sometimes unrealistic financial recommendations.

### Problems included:

- hallucinated pricing
- inconsistent savings numbers
- vague explanations
- recommendations that were difficult to justify

I replaced this with deterministic rule-based audit logic tied directly to pricing data.

## 2. Very Short Prompts

Earlier prompts were much shorter and only included:

- tool
- plan
- savings

This caused repetitive outputs where many summaries sounded nearly identical.

### Adding:

- team size
- operational context
- tone instructions
- scaling considerations

significantly improved output quality.

---
# AI Models Used

- OpenAI
- Model: gpt-4.1-mini

Used for:

personalized audit summaries
