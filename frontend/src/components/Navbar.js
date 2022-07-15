import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="bg-white w-full p-8 flex justify-center">
            <div className="flex container justify-between font-bold">
                <Link to="/">
                    <h1 className="text-3xl">TDQ</h1>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
