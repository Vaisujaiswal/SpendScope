import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend running")
})

app.post("/generate-summary", async (req, res) => {
  try {

    const {
      tool,
      plan,
      seats,
      teamSize,
      recommendation,
      savings,
    } = req.body

    const prompt = `
    Generate a professional 100-word AI spend audit summary.

    Tool: ${tool}
    Current Plan: ${plan}
    Seats: ${seats}
    Team Size: ${teamSize}
    Recommendation: ${recommendation}
    Monthly Savings: $${savings}

    Keep the tone professional and concise.
    `

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    const summary =
      response.choices[0].message.content

    res.json({ summary })

  } catch (error) {

    console.log(error)

    res.json({
      summary: `
Your organization appears to be spending more on AI tooling than necessary for its current team structure and workflow requirements. Based on your selected plans and seat count, switching to more optimized pricing tiers could significantly reduce operational costs while maintaining similar productivity and collaboration capabilities. Regular auditing of AI infrastructure expenses can help prevent unnecessary scaling costs as your organization grows.
`,
    })
  }
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})