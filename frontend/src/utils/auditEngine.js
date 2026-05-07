export function generateAudit(data) {
  let recommendation = ""
  let savings = 0
  let reason = ""

  // ChatGPT Logic
  if (
    data.tool === "ChatGPT" &&
    data.plan === "Enterprise" &&
    data.seats <= 5
  ) {
    recommendation = "Switch to ChatGPT Team"
    savings = (60 - 30) * data.seats

    reason =
      "Enterprise plans are typically more cost-effective for larger organizations with advanced compliance requirements."
  }

  // Cursor Logic
  else if (
    data.tool === "Cursor" &&
    data.plan === "Business" &&
    data.seats <= 2
  ) {
    recommendation = "Downgrade to Cursor Pro"
    savings = (40 - 20) * data.seats

    reason =
      "Business features may be unnecessary for small development teams with limited collaboration needs."
  }

  // Claude Logic
  else if (
    data.tool === "Claude" &&
    data.plan === "Enterprise" &&
    data.teamSize < 10
  ) {
    recommendation = "Switch to Claude Team"
    savings = (75 - 35) * data.seats

    reason =
      "Your current team size may not justify enterprise-tier operational overhead and pricing."
  }

  // Copilot Logic
  else if (
    data.tool === "Copilot" &&
    data.plan === "Business" &&
    data.seats === 1
  ) {
    recommendation = "Use Copilot Individual"
    savings = 9

    reason =
      "Single-user workflows are usually better aligned with individual plans."
  }

  // Default
  else {
    recommendation = "Your current setup looks optimized"
    savings = 0

    reason =
      "Based on your current usage profile, your stack appears reasonably cost-efficient."
  }

  return {
    recommendation,
    savings,
    annualSavings: savings * 12,
    reason,
  }
}