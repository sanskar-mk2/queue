import { useState } from "react";
import { AuthConstants } from "../constants/AuthConstants";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, set_error] = useState(null);
    const [is_loading, set_is_loading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        set_is_loading(true);
        set_error(null);

        const resp = await fetch("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await resp.json();

        if (!resp.ok) {
            set_is_loading(false);
            set_error(json.error);
        }

        if (resp.ok) {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: AuthConstants.LOGIN, payload: json });
            set_is_loading(false);
        }
    };

    return { signup, is_loading, error };
};
