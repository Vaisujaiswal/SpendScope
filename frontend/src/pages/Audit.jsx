import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { generateAudit } from "../utils/auditEngine"
import { toolPlans } from "../data/toolPlans"


function Audit() {


  const navigate = useNavigate()

  const [formData, setFormData] = useState(() => {
  const savedData = localStorage.getItem("auditForm")

  return savedData
    ? JSON.parse(savedData)
    : {
        tool: "ChatGPT",
        plan: "",
        spend: "",
        seats: "",
        teamSize: "",
        useCase: "Coding",
      }
})


  useEffect(() => {
    localStorage.setItem(
      "auditForm",
      JSON.stringify(formData)
    )
  }, [formData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    const result = generateAudit({
      ...formData,
      seats: Number(formData.seats),
    })

    navigate("/results", {
      state: {
        result,
        formData,
      },
    })
  }


  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          AI Spend Audit
        </h1>

        <p className="text-gray-400 mb-10">
          Analyze your AI stack and discover savings opportunities.
        </p>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 space-y-6">

          {/* Tool */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              AI Tool
            </label>

            <select
              name="tool"
              value={formData.tool}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            >
              <option>ChatGPT</option>
              <option>Claude</option>
              <option>Cursor</option>
              <option>Copilot</option>
              <option>Gemini</option>
            </select>
          </div>

          {/* Plan */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Current Plan
            </label>

            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            >
              <option value="">Select Plan</option>

              {toolPlans[formData.tool].map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          {/* Monthly Spend */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              name="spend"
              value={formData.spend}
              onChange={handleChange}
              placeholder="100"
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            />
          </div>

          {/* Seats */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Number of Seats
            </label>

            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="5"
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            />
          </div>

          {/* Team Size */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Team Size
            </label>

            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              placeholder="10"
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            />
          </div>

          {/* Use Case */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Primary Use Case
            </label>

            <select
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            >
              <option>Coding</option>
              <option>Writing</option>
              <option>Research</option>
              <option>Data</option>
              <option>Mixed</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold"
          >
            Generate Audit
          </button>

        </div>
      </div>
    </div>
  )
}

export default Audit