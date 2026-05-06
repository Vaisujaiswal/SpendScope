import { useLocation, Link } from "react-router-dom"

function Results() {
  const location = useLocation()

  const { result, formData } = location.state || {}

  if (!result) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1>No audit data found</h1>
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
            Save ${result.savings}/mo
          </h1>

          <p className="text-gray-400 text-lg">
            Potential annual savings of ${result.annualSavings}
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
                {formData.tool}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-gray-400 mb-2">
                Current Plan
              </p>

              <h2 className="text-2xl font-semibold">
                {formData.plan}
              </h2>
            </div>
          </div>

          {/* Recommendation */}
          <div className="border border-green-500/20 bg-green-500/10 rounded-2xl p-6">
            
            <p className="text-green-400 font-medium mb-3">
              Recommended Action
            </p>

            <h3 className="text-2xl font-bold mb-3">
              {result.recommendation}
            </h3>

            <p className="text-gray-300">
              Based on your current seat count and usage profile, your team may be overpaying for features that are typically useful at larger scale.
            </p>
          </div>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 mb-2">
              Monthly Savings
            </p>

            <h2 className="text-4xl font-bold text-green-400">
              ${result.savings}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 mb-2">
              Annual Savings
            </p>

            <h2 className="text-4xl font-bold text-green-400">
              ${result.annualSavings}
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

      </div>
    </div>
  )
}

export default Results