import { createContext, useEffect, useReducer } from "react";
import { AuthConstants } from "../constants/AuthConstants";
export const AuthContext = createContext();

export const auth_reducer = (state, action) => {
    switch (action.type) {
        case AuthConstants.LOGIN:
            return {
                user: action.payload.json,
                expires: action.payload.timeout,
            };
        case AuthConstants.LOGOUT:
            return { user: null, expires: null };
        default:
            throw new Error(`Unhandled type ${action.type} in auth_reducer`);
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(auth_reducer, {
        user: null,
        expires: null,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const timeout = JSON.parse(localStorage.getItem("expires"));
        if (user && timeout) {
            if (timeout < new Date().getTime()) {
                dispatch({
                    type: AuthConstants.LOGOUT,
                });
            } else {
                dispatch({
                    type: AuthConstants.LOGIN,
                    payload: { json: user, timeout },
                });
            }
        }
    }, []);

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
