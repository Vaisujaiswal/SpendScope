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
  const [saved, setSaved] = useState(false)

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
      Math.min(
        (canvas.height * imgWidth) / canvas.width,
        280
      )

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

    if (!leadData.email) {
      alert("Please enter your email")
      return
    }
    setSaved(true)
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

    if (!auditData) return

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
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
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
        {auditData?.savings > 100 ? (

          <>
            <p className="text-green-400 font-medium mb-2">
              Want to save or share this audit?
            </p>

            <h2 className="text-3xl font-bold mb-3">
              Capture Your Audit Report
            </h2>

            <p className="text-gray-400 leading-7 mb-8">
              Enter your work email to save this audit and receive future optimization insights.
            </p>
          </>

        ) : (

          <>
            <p className="text-blue-400 font-medium mb-2">
              Stay Updated
            </p>

            <h2 className="text-3xl font-bold mb-3">
              Get notified about future optimization opportunities
            </h2>

            <p className="text-gray-400 leading-7 mb-8">
              Your stack looks healthy right now, but AI pricing changes quickly. Enter your email to receive future optimization alerts.
            </p>
          </>

        )}

        {/* Main Card */}
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

            <div>
              <p className="text-gray-400 mb-2">
                Current Tool
              </p>

              <h2 className="text-3xl font-bold">
                {auditData?.tool}
              </h2>
            </div>

            <div className="md:text-right">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Optimization Score
              </p>

              <h2 className="text-2xl md:text-3xl font-bold">
                {auditData?.optimization_score}/100
              </h2>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Overspending
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-red-400">
                {auditData?.overspending_percent}%
              </h2>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Confidence
              </p>

              <h2 className="text-2xl md:text-3xl font-bold">
                {auditData?.confidence}
              </h2>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Risk Level
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">
                {auditData?.risk_level}
              </h2>
            </div>

          </div>

          <div className="bg-zinc-900/80 border border-white/10 rounded-[32px] p-6 md:p-8 mt-10">

            <p className="text-gray-400 mb-3">
              Industry Benchmark
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              AI Spend Comparison
            </h2>

            <p className="text-gray-300 leading-8">

              Compared to startups with similar team sizes and AI usage patterns, your current tooling spend appears approximately

              <span className="text-green-400 font-semibold">
                {" "}{auditData?.overspending_percent}% higher{" "}
              </span>

              than estimated operational benchmarks.

            </p>

          </div>

          {auditData?.alternative_tool && (

            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 mt-8">

              <p className="text-gray-400 mb-3">
                Suggested Alternative
              </p>

              <p className="text-gray-300 leading-7">
                {auditData.alternative_tool}
              </p>

            </div>

          )}

          {auditData?.credit_savings > 0 && (

            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6 mt-8">

              <p className="text-green-400 font-medium mb-3">
                Marketplace Credit Opportunity
              </p>

              <p className="text-gray-300 leading-7">
                Your organization may reduce AI infrastructure costs further through discounted infrastructure credits.

                Estimated additional savings:
                <span className="text-green-400 font-semibold">
                  {" "} ${auditData.credit_savings}/month
                </span>
              </p>

            </div>

          )}

          <div className="mt-5 border-t border-white/10 pt-5">

            <div className="flex items-center justify-between mb-3">

              <p className="text-gray-400">
                Estimated Retail Spend
              </p>

              <p className="text-white font-semibold">
                ${auditData?.monthly_spend}/mo
              </p>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-gray-400">
                Estimated Marketplace Pricing
              </p>

              <p className="text-green-400 font-semibold">
                ${auditData?.monthly_spend - auditData?.credit_savings}/mo
              </p>

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

        {auditData?.savings > 100 && (

          <div className="bg-green-500/10 border border-green-500/20 rounded-[32px] p-6 md:p-8 mt-10">

            <p className="text-green-400 font-medium mb-3">
              Significant Savings Opportunity
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Your organization may be overspending on AI infrastructure.
            </h2>

            <p className="text-gray-300 leading-7 mb-6">
              Based on your audit results, your current AI tooling setup may qualify for substantial pricing optimization opportunities through secondary AI infrastructure marketplaces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <a
                href="https://credexmarketplace.com"
                target="_blank"
                className="bg-white text-black px-6 py-3 rounded-2xl font-semibold text-center"
              >
                Book Credex Consultation
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert("Audit link copied!")
                }}
                className="border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/5 transition"
              >
                Share Audit
              </button>

            </div>

          </div>

        )}

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mt-8">

          <p className="text-green-400 font-medium mb-2">
            Want to save or share this audit?
          </p>

          <h2 className="text-3xl font-bold mb-3">
            Capture Your Audit Report
          </h2>

          <p className="text-gray-400 leading-7 mb-8">
            Enter your work email to save this audit report and receive future optimization insights.
          </p>

          <div className="space-y-5">

            <input
              type="email"
              name="email"
              value={leadData.email}
              onChange={handleLeadChange}
              placeholder="Email address"
              className="w-full bg-black border border-white/10 rounded-2xl p-3"
            />

            <input
              type="text"
              name="company"
              value={leadData.company}
              onChange={handleLeadChange}
              placeholder="Company name (optional)"
              className="w-full bg-black border border-white/10 rounded-2xl p-3"
            />

            <input
              type="text"
              name="role"
              value={leadData.role}
              onChange={handleLeadChange}
              placeholder="Role (optional)"
              className="w-full bg-black border border-white/10 rounded-2xl p-3"
            />

            <button
              onClick={saveLead}
              className="w-full bg-white text-black py-3 rounded-2xl font-semibold"
            >
              Save Report
            </button>

            {saved && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl p-4 mt-4">
                Report saved successfully.
              </div>
            )}

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-10">

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

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 mb-2">
              Current Monthly Spend
            </p>

            <h2 className="text-4xl font-bold">
              ${auditData?.monthly_spend}
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