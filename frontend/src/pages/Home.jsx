import Navbar from "../components/layouts/Navbar"
import { Link } from "react-router-dom"

function Home() {

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-green-500/10 blur-[140px] rounded-full"></div>

      <Navbar />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">

        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">

          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 rounded-full text-sm text-gray-300 mb-8">
            AI Infrastructure Optimization Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">

            Stop
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              {" "}Overpaying{" "}
            </span>
            for AI Tools

          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-8 mb-10">

            Analyze your AI stack, identify wasted spend,
            and discover smarter pricing strategies for
            your organization in under 60 seconds.

          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">

            <Link to="/audit">
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
                Start Free Audit
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="border border-white/10 bg-zinc-900 px-8 py-4 rounded-2xl hover:bg-zinc-800 transition">
                View Analytics
              </button>
            </Link>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">

            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6">
              <h2 className="text-4xl font-bold mb-2">
                42%
              </h2>

              <p className="text-gray-400 text-sm">
                Avg Savings Found
              </p>
            </div>

            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6">
              <h2 className="text-4xl font-bold mb-2">
                5+
              </h2>

              <p className="text-gray-400 text-sm">
                AI Platforms Supported
              </p>
            </div>

            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6">
              <h2 className="text-4xl font-bold mb-2">
                $12k
              </h2>

              <p className="text-gray-400 text-sm">
                Potential Savings Audited
              </p>
            </div>

            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6">
              <h2 className="text-4xl font-bold mb-2">
                60s
              </h2>

              <p className="text-gray-400 text-sm">
                Average Audit Time
              </p>
            </div>

          </div>

          {/* Product Preview */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

            <div className="flex flex-col md:flex-row gap-6">

              <div className="flex-1 bg-black rounded-2xl p-6 border border-white/10 text-left">

                <p className="text-gray-400 mb-3">
                  Current Stack
                </p>

                <h3 className="text-3xl font-bold mb-2">
                  ChatGPT Enterprise
                </h3>

                <p className="text-gray-500">
                  5 seats • Engineering Team
                </p>

              </div>

              <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-left">

                <p className="text-green-400 mb-3">
                  Optimization Found
                </p>

                <h3 className="text-4xl font-bold mb-2">
                  Save $180/mo
                </h3>

                <p className="text-gray-300">
                  Switch to ChatGPT Team
                </p>

              </div>

            </div>

          </div>

          {/* Supported Tools */}
          <div className="mt-20">

            <p className="text-gray-500 mb-6">
              Supported Platforms
            </p>

            <div className="flex flex-wrap justify-center gap-4">

              {[
                "ChatGPT",
                "Claude",
                "Cursor",
                "Copilot",
                "Gemini"
              ].map((tool) => (

                <div
                  key={tool}
                  className="border border-white/10 bg-zinc-900/70 px-5 py-3 rounded-2xl text-gray-300 hover:border-white/20 transition"
                >
                  {tool}
                </div>

              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Home