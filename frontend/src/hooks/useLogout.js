import { AuthConstants } from "../constants/AuthConstants";
import { TaskConstants } from "../constants/TaskConstants";
import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatch_tasks } = useTasksContext();
    const logout = () => {
        dispatch({ type: AuthConstants.LOGOUT });
        dispatch_tasks({ type: TaskConstants.CLEAN_TASKS });
    };

    return { logout };
};
