export function generateAudit(data) {

  let recommendation = ""
  let savings = 0
  let reason = ""

  let optimizationScore = 90
  let overspendingPercent = 5
  let confidence = "Medium"
  let riskLevel = "Low"

  // ChatGPT Logic
  if (
    data.tool === "ChatGPT" &&
    data.plan === "Enterprise" &&
    data.seats <= 5
  ) {

    recommendation = "Switch to ChatGPT Team"

    savings = (60 - 30) * data.seats

    reason =
      "Enterprise plans are typically better suited for larger organizations with advanced compliance and admin requirements."

    optimizationScore = 62
    overspendingPercent = 38
    confidence = "High"
    riskLevel = "Medium"
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
      "Business collaboration features may be unnecessary for smaller development teams."

    optimizationScore = 68
    overspendingPercent = 32
    confidence = "High"
    riskLevel = "Medium"
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
      "Your team size may not currently require enterprise-level operational overhead."

    optimizationScore = 59
    overspendingPercent = 41
    confidence = "High"
    riskLevel = "High"
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
      "Single-user workflows are generally more cost-efficient on individual plans."

    optimizationScore = 74
    overspendingPercent = 26
    confidence = "Medium"
    riskLevel = "Low"
  }

  // Gemini Logic
  else if (
    data.tool === "Gemini" &&
    data.plan === "Enterprise" &&
    data.teamSize <= 8
  ) {

    recommendation = "Evaluate Gemini Business"

    savings = 25 * data.seats

    reason =
      "Enterprise functionality may exceed the operational requirements of smaller teams."

    optimizationScore = 66
    overspendingPercent = 34
    confidence = "Medium"
    riskLevel = "Medium"
  }

  // Default
  else {

    recommendation =
      "Your current setup appears reasonably optimized"

    savings = 0

    reason =
      "Based on your current usage profile, no major cost inefficiencies were detected."

    optimizationScore = 91
    overspendingPercent = 4
    confidence = "Medium"
    riskLevel = "Low"
  }

  return {
    recommendation,
    savings,
    annualSavings: savings * 12,
    reason,

    optimizationScore,
    overspendingPercent,
    confidence,
    riskLevel,
  }
}