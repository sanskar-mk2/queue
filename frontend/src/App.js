import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <div className="w-full flex flex-col items-center">
            <BrowserRouter>
                <Navbar />
                <div className="pages w-full container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
