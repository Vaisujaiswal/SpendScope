import Navbar from "../components/layouts/Navbar"
import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">

            <Navbar />

            <div className="flex flex-col items-center justify-center text-center px-6 pt-32">

                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                    Cut Your AI Tool
                    <br />
                    Costs Instantly
                </h1>

                <p className="text-gray-400 text-lg max-w-2xl mb-8">
                    Analyze your AI stack, uncover overspending, and discover smarter pricing options in seconds.
                </p>

                <Link to="/audit">
                    <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                        Start Free Audit
                    </button>
                </Link>

                <div className="mt-20 text-center">
                    <p className="text-gray-500 mb-6">
                        Supports audits for
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
                                className="border border-white/10 px-5 py-3 rounded-xl text-gray-300"
                            >
                                {tool}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home