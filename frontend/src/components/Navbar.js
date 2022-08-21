import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handle_logout = () => {
        logout();
    };
    return (
        <header className="bg-white w-full p-8 flex justify-center">
            <div className="flex container justify-between">
                <Link to="/">
                    <h1 className="text-3xl font-bold">TDQ</h1>
                </Link>
                <nav>
                    <div className="flex gap-4">
                        {user ? (
                            <>
                                <div>{user.email}</div>
                                <div>
                                    <button onClick={handle_logout}>
                                        Log out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
