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

      const totalSavings = audits.reduce(
        (sum, audit) => sum + audit.savings,
        0
      )

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

    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">

      {/* Glow Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] right-[-120px] w-[220px] h-[220px] md:w-[450px] md:h-[450px] bg-green-500/10 blur-3xl rounded-full"></div>

      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <p className="text-green-400 font-medium mb-3">
              SpendScope Analytics
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight break-words">
              AI Spend Dashboard
            </h1>

          </div>

          <div className="bg-zinc-900 border border-white/10 px-5 py-4 rounded-2xl w-fit">

            <p className="text-gray-400 text-sm mb-1">
              Optimization Status
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-green-400">
              Healthy
            </h2>

          </div>

        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-10">

          {/* Audits */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden">

            <p className="text-gray-400 mb-3">
              Total Audits
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 break-words">
              {stats.audits}
            </h2>

            <p className="text-green-400 text-sm">
              +18% this week
            </p>

          </div>

          {/* Leads */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden">

            <p className="text-gray-400 mb-3">
              Total Leads
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 break-words">
              {stats.leads}
            </h2>

            <p className="text-green-400 text-sm">
              Strong conversion growth
            </p>

          </div>

          {/* Savings */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden">

            <p className="text-gray-400 mb-3">
              Potential Savings
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 break-words">
              ${stats.totalSavings}
            </h2>

            <p className="text-green-400 text-sm">
              Estimated annual impact
            </p>

          </div>

          {/* Tool */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden">

            <p className="text-gray-400 mb-3">
              Most Used Tool
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 break-words">
              {stats.topTool || "-"}
            </h2>

            <p className="text-gray-500 text-sm">
              Highest audit frequency
            </p>

          </div>

        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* Main Section */}
          <div className="lg:col-span-2 bg-zinc-900/80 border border-white/10 rounded-[32px] p-5 sm:p-6 md:p-8 overflow-hidden">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

              <div>

                <p className="text-gray-400 mb-2">
                  AI Spend Insights
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold break-words">
                  Optimization Overview
                </h2>

              </div>

              <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl w-fit">
                Active Monitoring
              </div>

            </div>

            <div className="space-y-6">

              {/* Progress */}
              <div className="bg-black border border-white/10 rounded-2xl p-5 overflow-hidden">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">

                  <p className="text-gray-300">
                    AI Infrastructure Efficiency
                  </p>

                  <p className="text-green-400 font-semibold">
                    82%
                  </p>

                </div>

                <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">

                  <div
                    className="bg-green-400 h-3 rounded-full"
                    style={{ width: "82%" }}
                  ></div>

                </div>

              </div>

              {/* Recommendation */}
              <div className="bg-black border border-white/10 rounded-2xl p-5 sm:p-6 overflow-hidden">

                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  Key Recommendation
                </h3>

                <p className="text-gray-400 leading-7 text-sm sm:text-base">
                  Teams currently using enterprise AI plans with fewer than 10 active seats appear to have the highest optimization opportunities across the platform.
                </p>

              </div>

            </div>

          </div>

          {/* Side Panel */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-[32px] p-5 sm:p-6 md:p-8 overflow-hidden">

            <p className="text-gray-400 mb-2">
              Platform Health
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Stable
            </h2>

            <div className="space-y-5">

              <div className="bg-black border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 text-sm mb-2">
                  Avg Savings Per Audit
                </p>

                <h3 className="text-2xl md:text-3xl font-bold">
                  $240
                </h3>

              </div>

              <div className="bg-black border border-white/10 rounded-2xl p-5">

                <p className="text-gray-400 text-sm mb-2">
                  Optimization Confidence
                </p>

                <h3 className="text-2xl md:text-3xl font-bold text-green-400">
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