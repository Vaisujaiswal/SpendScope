export function generateAudit(data) {
  let recommendation = ""
  let savings = 0

  if (
    data.tool === "ChatGPT" &&
    data.plan === "Enterprise" &&
    data.seats <= 5
  ) {
    recommendation = "Switch to ChatGPT Team"
    savings = (60 - 30) * data.seats
  }

  else if (
    data.tool === "Cursor" &&
    data.plan === "Business" &&
    data.seats === 1
  ) {
    recommendation = "Downgrade to Cursor Pro"
    savings = 20
  }

  else {
    recommendation = "Your current setup looks optimized"
    savings = 0
  }

  return {
    recommendation,
    savings,
    annualSavings: savings * 12,
  }
}