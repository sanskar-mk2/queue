import { AuthConstants } from "../constants/AuthConstants";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const logout = () => {
        localStorage.removeItem("user");
        dispatch({ type: AuthConstants.LOGOUT });
    };

    return { logout };
};
