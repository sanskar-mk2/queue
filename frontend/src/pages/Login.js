import { useState } from "react";

function Login() {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");

    const handle_submit = async (e) => {
        e.preventDefault();
        console.log(email, password);
    };
    return (
        <div className="flex justify-center mt-8 w-full text-space_cadet rounded">
            <div className="bg-white p-16 rounded flex flex-col gap-4">
                <form onSubmit={handle_submit}>
                    <h3 className="text-3xl font-bold">Log in</h3>
                    <div className="mt-4 flex flex-col">
                        <label className="text-2xl mb-2">Email</label>
                        <input
                            className="rounded border-2 border-space_cadet text-space_cadet p-4 text-2xl w-full"
                            type="email"
                            onChange={(e) => set_email(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-2xl mb-2">Password</label>
                        <input
                            className="rounded border-2 border-space_cadet text-space_cadet p-4 text-2xl w-full"
                            type="password"
                            onChange={(e) => set_password(e.target.value)}
                            value={password}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
