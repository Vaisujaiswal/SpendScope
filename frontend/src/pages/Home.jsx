function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          SpendScope
        </h1>

        <p className="text-gray-400 text-lg mb-6">
          Stop overpaying for AI tools
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Start Free Audit
        </button>
      </div>
    </div>
  )
}

export default Home