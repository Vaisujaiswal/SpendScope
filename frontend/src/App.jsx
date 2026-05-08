import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Audit from "./pages/Audit";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/results/:id" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;