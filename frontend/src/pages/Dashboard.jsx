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
  <div className="min-h-screen bg-black text-white overflow-hidden">

    {/* Glow */}
    <div className="absolute top-[-150px] right-[-100px] w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full"></div>

    <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

        <div>
          <p className="text-green-400 font-medium mb-3">
            SpendScope Analytics
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            AI Spend Dashboard
          </h1>
        </div>

        <div className="bg-zinc-900 border border-white/10 px-6 py-4 rounded-2xl">
          <p className="text-gray-400 text-sm mb-1">
            Optimization Status
          </p>

          <h2 className="text-2xl font-bold text-green-400">
            Healthy
          </h2>
        </div>

      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition">

          <p className="text-gray-400 mb-3">
            Total Audits
          </p>

          <h2 className="text-5xl font-bold mb-2">
            {stats.audits}
          </h2>

          <p className="text-green-400 text-sm">
            +18% this week
          </p>

        </div>

        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition">

          <p className="text-gray-400 mb-3">
            Total Leads
          </p>

          <h2 className="text-5xl font-bold mb-2">
            {stats.leads}
          </h2>

          <p className="text-green-400 text-sm">
            Strong conversion growth
          </p>

        </div>

        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition">

          <p className="text-gray-400 mb-3">
            Potential Savings
          </p>

          <h2 className="text-4xl font-bold mb-2">
            ${stats.totalSavings}
          </h2>

          <p className="text-green-400 text-sm">
            Estimated annual impact
          </p>

        </div>

        <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition">

          <p className="text-gray-400 mb-3">
            Most Used Tool
          </p>

          <h2 className="text-4xl font-bold mb-2">
            {stats.topTool || "-"}
          </h2>

          <p className="text-gray-500 text-sm">
            Highest audit frequency
          </p>

        </div>

      </div>

      {/* Insights Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">

        {/* Main Insights */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-white/10 rounded-[32px] p-8">

          <div className="flex items-center justify-between mb-8">

            <div>
              <p className="text-gray-400 mb-2">
                AI Spend Insights
              </p>

              <h2 className="text-3xl font-bold">
                Optimization Overview
              </h2>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl">
              Active Monitoring
            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-black border border-white/10 rounded-2xl p-5">

              <div className="flex items-center justify-between mb-3">

                <p className="text-gray-300">
                  AI Infrastructure Efficiency
                </p>

                <p className="text-green-400 font-semibold">
                  82%
                </p>

              </div>

              <div className="w-full bg-zinc-800 rounded-full h-3">

                <div className="bg-green-400 h-3 rounded-full w-[82%]"></div>

              </div>

            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-3">
                Key Recommendation
              </h3>

              <p className="text-gray-400 leading-7">
                Teams currently using enterprise AI plans with fewer than 10 active seats appear to have the highest optimization opportunities across the platform.
              </p>

            </div>

          </div>

        </div>

        {/* Side Panel */}
        <div className="bg-zinc-900/80 border border-white/10 rounded-[32px] p-8">

          <p className="text-gray-400 mb-2">
            Platform Health
          </p>

          <h2 className="text-3xl font-bold mb-8">
            Stable
          </h2>

          <div className="space-y-5">

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Avg Savings Per Audit
              </p>

              <h3 className="text-3xl font-bold">
                $240
              </h3>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Optimization Confidence
              </p>

              <h3 className="text-3xl font-bold text-green-400">
                High
              </h3>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
)
}

export default Dashboard