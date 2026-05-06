function Audit() {
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

            <select className="w-full bg-black border border-white/10 rounded-xl p-3">
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

            <input
              type="text"
              placeholder="e.g. Team"
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            />
          </div>

          {/* Monthly Spend */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Monthly Spend ($)
            </label>

            <input
              type="number"
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
              placeholder="10"
              className="w-full bg-black border border-white/10 rounded-xl p-3"
            />
          </div>

          {/* Use Case */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Primary Use Case
            </label>

            <select className="w-full bg-black border border-white/10 rounded-xl p-3">
              <option>Coding</option>
              <option>Writing</option>
              <option>Research</option>
              <option>Data</option>
              <option>Mixed</option>
            </select>
          </div>

          <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-[1.01] transition">
            Generate Audit
          </button>

        </div>
      </div>
    </div>
  )
}

export default Audit