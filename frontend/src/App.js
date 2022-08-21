import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import BlocksHome from "./pages/BlocksHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    const { user } = useAuthContext();
    useEffect(() => {
        // setTimeout(logout, expires - new Date().getTime());
    }, []);

    return (
        <div className="w-full min-h-screen h-full flex flex-col items-center">
            <BrowserRouter>
                <Navbar />
                <div className="p-4 w-full h-full container">
                    <Routes>
                        <Route
                            path="/"
                            element={user ? <Home /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/blocks"
                            element={
                                user ? <BlocksHome /> : <Navigate to="/login" />
                            }
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
