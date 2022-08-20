import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="bg-white w-full p-8 flex justify-center">
            <div className="flex container justify-between">
                <Link to="/">
                    <h1 className="text-3xl font-bold">TDQ</h1>
                </Link>
                <nav>
                    <div className="flex gap-4">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
