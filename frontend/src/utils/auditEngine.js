import { pricingData } from "../data/pricingData"

export function generateAudit(data) {

  let recommendation = ""
  let savings = 0
  let reason = ""
  let alternativeTool = ""
  let creditSavings = 0

  let optimizationScore = 90
  let overspendingPercent = 5
  let confidence = "Medium"
  let riskLevel = "Low"
  const monthlySpend = Number(data.spend)

  if (
    monthlySpend > 300 &&
    data.teamSize < 10 &&
    data.seats <= 5
  ) {

    recommendation =
      "Your AI infrastructure costs appear unusually high for your current team size."

    savings = Math.floor(monthlySpend * 0.35)

    creditSavings =
  Math.floor(savings * 0.4)

    reason =
      "Smaller teams are often able to achieve similar productivity using lower-tier AI plans and shared infrastructure strategies."

    optimizationScore = 58
    overspendingPercent = 35
    confidence = "High"
    riskLevel = "High"
  }

  // ChatGPT Logic
  else if (
    data.tool === "ChatGPT" &&
    data.plan === "Enterprise" &&
    data.seats <= 5
  ) {

    recommendation = "Switch to ChatGPT Team"

    const currentCost =
      pricingData.ChatGPT.Enterprise

    const recommendedCost =
      pricingData.ChatGPT.Team

    savings =
      (currentCost - recommendedCost)
      * data.seats

      creditSavings =
  Math.floor(savings * 0.4)

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

    alternativeTool =
      "Claude Pro or ChatGPT Team may provide similar productivity for writing-focused workflows at lower cost."

    const currentCost =
      pricingData.Cursor.Business

    const recommendedCost =
      pricingData.Cursor.Pro

    savings =
      (currentCost - recommendedCost)
      * data.seats

      creditSavings =
  Math.floor(savings * 0.4)

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

    const currentCost =
      pricingData.Claude.Enterprise

    const recommendedCost =
      pricingData.Claude.Team

    savings =
      (currentCost - recommendedCost)
      * data.seats

      creditSavings =
  Math.floor(savings * 0.4)

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

    const currentCost =
      pricingData.Copilot.Business

    const recommendedCost =
      pricingData.Copilot.Individual

    savings =
      (currentCost - recommendedCost)
      * data.seats

      creditSavings =
  Math.floor(savings * 0.4)

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

    const currentCost =
      pricingData.Gemini.Ultra

    const recommendedCost =
      pricingData.Gemini.Pro

    savings =
      (currentCost - recommendedCost)
      * data.seats

      creditSavings =
  Math.floor(savings * 0.4)

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

    creditSavings =
  Math.floor(savings * 0.4)

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
    alternativeTool,
    creditSavings
  }
}