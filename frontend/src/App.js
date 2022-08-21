import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    const { user } = useAuthContext();
    return (
        <div className="w-full flex flex-col items-center">
            <BrowserRouter>
                <Navbar />
                <div className="pages w-full container">
                    <Routes>
                        <Route
                            path="/"
                            element={user ? <Home /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/signup"
                            element={!user ? <Signup /> : <Navigate to="/" />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
