import { createContext, useReducer } from "react";
import { TaskConstants } from "../constants/TaskConstants";
import dayjs from "dayjs";

export const TasksContext = createContext();

const local_copy_manager = (tasks) => {
    tasks = [
        ...tasks.sort(
            (a, b) => dayjs(a.updated_at).unix() - dayjs(b.updated_at).unix()
        ),
    ];
    const first = tasks.slice(0, 1)[0];
    const second = tasks.slice(1, 2)[0];
    const abstract = tasks.length > 2 ? tasks.length - 2 : 0;
    return { tasks, first, second, abstract };
};

export const tasks_reducer = (state, action) => {
    switch (action.type) {
        case TaskConstants.SET_TASKS:
            return local_copy_manager([...action.payload]);
        case TaskConstants.CREATE_TASK:
            return local_copy_manager([...state.tasks, action.payload]);
        case TaskConstants.DELETE_TASK:
            return local_copy_manager(
                state.tasks.filter((e) => e._id !== action.payload._id)
            );
        case TaskConstants.UPDATE_TASK:
            return local_copy_manager(
                state.tasks.map((e) =>
                    e._id === action.payload._id ? action.payload : e
                )
            );
        case TaskConstants.CLEAN_TASKS:
            return local_copy_manager([]);
        default:
            throw new Error(`Unhandled type ${action.type} in tasks_reducer`);
    }
};

export const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasks_reducer, {
        tasks: [],
        abstract: 0,
        first: null,
        second: null,
    });
    return (
        <TasksContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};
