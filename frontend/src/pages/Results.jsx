import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { supabase } from "../services/supabase"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

function Results() {
  const { id } = useParams()
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(true)
  const [auditData, setAuditData] = useState(null)
  const reportRef = useRef()

  const [leadData, setLeadData] = useState({
    email: "",
    company: "",
    role: "",
  })

  const downloadPDF = async () => {

    const element = reportRef.current

    const canvas = await html2canvas(element)

    const data = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")

    const imgWidth = 210
    const pageHeight = 295

    const imgHeight =
      (canvas.height * imgWidth) / canvas.width

    pdf.addImage(
      data,
      "PNG",
      0,
      0,
      imgWidth,
      imgHeight
    )

    pdf.save("spendscope-audit-report.pdf")
  }

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
          "https://spendscope-u9ag.onrender.com/generate-summary",
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
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-4 md:px-6 py-10 md:py-12">

      <div ref={reportRef} className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">

          <p className="text-green-400 font-medium mb-3">
            Audit Completed
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Save ${auditData?.savings}/mo
          </h1>

          <p className="text-gray-400 text-lg">
            Potential annual savings of ${auditData?.annual_savings}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Optimization Score
              </p>

              <h2 className="text-3xl font-bold">
                {auditData?.optimization_score}/100
              </h2>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Overspending
              </p>

              <h2 className="text-3xl font-bold text-red-400">
                {auditData?.overspending_percent}%
              </h2>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Confidence
              </p>

              <h2 className="text-3xl font-bold">
                {auditData?.confidence}
              </h2>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Risk Level
              </p>

              <h2 className="text-3xl font-bold text-yellow-400">
                {auditData?.risk_level}
              </h2>
            </div>

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

          <div className="space-y-5">

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-10">

          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">

          <button
            onClick={downloadPDF}
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Download PDF Report
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert("Link copied!")
            }}
            className="bg-zinc-800 border border-white/10 px-6 py-3 rounded-2xl hover:bg-zinc-700 transition"
          >
            Copy Share Link
          </button>

        </div>

      </div>
    </div>
  )
}

export default Results