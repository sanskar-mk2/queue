import { createContext, useReducer } from "react";
import { AuthConstants } from "../constants/AuthConstants";
export const AuthContext = createContext();

export const auth_reducer = (state, action) => {
    switch (action.type) {
        case AuthConstants.LOGIN:
            return { user: action.payload };
        case AuthConstants.LOGOUT:
            return { user: null };
        default:
            throw new Error(`Unhandled type ${action.type} in auth_reducer`);
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(auth_reducer, {
        user: null,
    });

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
