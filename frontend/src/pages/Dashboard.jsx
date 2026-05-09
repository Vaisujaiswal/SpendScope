import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"

function Dashboard() {

  const [stats, setStats] = useState({
    audits: 0,
    leads: 0,
    totalSavings: 0,
    topTool: "",
  })

  useEffect(() => {

    async function fetchStats() {

      const { data: audits } = await supabase
        .from("audits")
        .select("*")

      const { data: leads } = await supabase
        .from("leads")
        .select("*")

      // Total Savings
      const totalSavings = audits.reduce(
        (sum, audit) => sum + audit.savings,
        0
      )

      // Most Used Tool
      const toolCounts = {}

      audits.forEach((audit) => {
        toolCounts[audit.tool] =
          (toolCounts[audit.tool] || 0) + 1
      })

      const topTool =
        Object.keys(toolCounts).sort(
          (a, b) => toolCounts[b] - toolCounts[a]
        )[0]

      setStats({
        audits: audits.length,
        leads: leads.length,
        totalSavings,
        topTool,
      })
    }

    fetchStats()

  }, [])

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-12">
          Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-400 mb-2">
              Total Audits
            </p>

            <h2 className="text-5xl font-bold">
              {stats.audits}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-400 mb-2">
              Total Leads
            </p>

            <h2 className="text-5xl font-bold">
              {stats.leads}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-400 mb-2">
              Potential Savings
            </p>

            <h2 className="text-4xl font-bold">
              ${stats.totalSavings}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-400 mb-2">
              Most Used Tool
            </p>

            <h2 className="text-4xl font-bold">
              {stats.topTool || "-"}
            </h2>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard