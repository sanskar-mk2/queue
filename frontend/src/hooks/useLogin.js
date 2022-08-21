import { useState } from "react";
import { AuthConstants } from "../constants/AuthConstants";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, set_error] = useState(null);
    const [is_loading, set_is_loading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        set_is_loading(true);
        set_error(null);

        const resp = await fetch("/api/users/login", {
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

    return { login, is_loading, error };
};
