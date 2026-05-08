import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { supabase } from "../services/supabase"

function Results() {
  const { id } = useParams()
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(true)
  const [auditData, setAuditData] = useState(null)

  const [leadData, setLeadData] = useState({
    email: "",
    company: "",
    role: "",
  })

  const handleLeadChange = (e) => {
    setLeadData({
      ...leadData,
      [e.target.name]: e.target.value,
    })
  }

  const saveLead = async () => {

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          email: leadData.email,
          company: leadData.company,
          role: leadData.role,
          tool: auditData?.tool,
          savings: auditData?.savings,
        },
      ])

    if (error) {
      console.log(error)
      return
    }

    alert("Lead saved successfully!")
  }

  useEffect(() => {

    async function fetchAudit() {

      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.log(error)
        return
      }

      setAuditData(data)
    }

    fetchAudit()

  }, [id])

  useEffect(() => {

    async function fetchSummary() {
      try {

        const response = await axios.post(
          "http://localhost:5000/generate-summary",
          {
            tool: auditData?.tool,
            plan: auditData?.plan,
            seats: auditData?.seats,
            teamSize: auditData?.team_size,
            recommendation: auditData?.recommendation,
            savings: auditData?.savings,
          }
        )

        setSummary(response.data.summary)

      } catch (error) {

        setSummary(
          "Unable to generate personalized summary at the moment."
        )

      } finally {
        setLoading(false)
      }
    }

    fetchSummary()

  }, [auditData])

  if (!auditData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-10 text-center max-w-lg">

          <h1 className="text-4xl font-bold mb-4">
            Audit Not Found
          </h1>

          <p className="text-gray-400 mb-8">
            This audit report may have been deleted or the link is invalid.
          </p>

          <Link
            to="/audit"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Run New Audit
          </Link>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-12">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <p className="text-green-400 font-medium mb-3">
            Audit Completed
          </p>

          <h1 className="text-6xl font-bold mb-4">
            Save ${auditData?.savings}/mo
          </h1>

          <p className="text-gray-400 text-lg">
            Potential annual savings of ${auditData?.annual_savings}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 mb-8">

          <div className="flex items-center justify-between mb-8">

            <div>
              <p className="text-gray-400 mb-2">
                Current Tool
              </p>

              <h2 className="text-3xl font-bold">
                {auditData?.tool}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-gray-400 mb-2">
                Current Plan
              </p>

              <h2 className="text-2xl font-semibold">
                {auditData?.plan}
              </h2>
            </div>
          </div>

          {/* Recommendation */}
          <div className="border border-green-500/20 bg-green-500/10 rounded-2xl p-6">

            <p className="text-green-400 font-medium mb-3">
              Recommended Action
            </p>

            <h3 className="text-2xl font-bold mb-3">
              {auditData?.recommendation}
            </h3>

            <p className="text-gray-300">{auditData?.reason}</p>
          </div>

        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mt-8">

          <p className="text-gray-400 mb-3">
            AI Generated Summary
          </p>

          {loading ? (
            <p className="text-gray-500">
              Generating summary...
            </p>
          ) : (
            <p className="text-gray-300 leading-7">
              {summary}
            </p>
          )}

        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Get Full Audit Report
          </h2>

          <div className="space-y-4">

            <input
              type="email"
              name="email"
              value={leadData.email}
              onChange={handleLeadChange}
              placeholder="Email address"
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            />

            <input
              type="text"
              name="company"
              value={leadData.company}
              onChange={handleLeadChange}
              placeholder="Company name (optional)"
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            />

            <input
              type="text"
              name="role"
              value={leadData.role}
              onChange={handleLeadChange}
              placeholder="Role (optional)"
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            />

            <button
              onClick={saveLead}
              className="w-full bg-white text-black py-3 rounded-xl font-semibold"
            >
              Save Report
            </button>

          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 mb-2">
              Monthly Savings
            </p>

            <h2 className="text-4xl font-bold text-green-400">
              ${auditData?.savings}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 mb-2">
              Annual Savings
            </p>

            <h2 className="text-4xl font-bold text-green-400">
              ${auditData?.annual_savings}
            </h2>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center">

          <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            Email Full Report
          </button>

          <div className="mt-5">
            <Link
              to="/audit"
              className="text-gray-500 hover:text-white transition"
            >
              Run another audit
            </Link>
          </div>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            alert("Link copied!")
          }}
          className="bg-zinc-800 border border-white/10 px-6 py-3 rounded-xl"
        >
          Copy Share Link
        </button>

      </div>
    </div>
  )
}

export default Results