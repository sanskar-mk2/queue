import { useEffect } from "react";
import TaskDetail from "../components/TaskDetail";
import TaskForm from "../components/TaskForm";
import { AuthConstants } from "../constants/AuthConstants";
import { TaskConstants } from "../constants/TaskConstants";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/useTasksContext";

function Home() {
    const { first, second, abstract, dispatch } = useTasksContext();
    const { dispatch: dispatch_auth, user } = useAuthContext();

    useEffect(() => {
        console.log(dispatch, user);
        const fetch_tasks = async () => {
            const respone = await fetch("/api/tasks", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await respone.json();
            if (respone.ok) {
                dispatch({
                    type: TaskConstants.SET_TASKS,
                    payload: json.tasks.filter((e) => !e.deleted_at),
                });
            }
            if (respone.status === 401) {
                dispatch_auth({ type: AuthConstants.LOGOUT });
                dispatch({ type: TaskConstants.CLEAN_TASKS });
            }
        };
        if (user) {
            fetch_tasks();
        }
    }, [dispatch_auth, dispatch, user]);

    return (
        <div className="flex justify-center w-full min-h-full bg-space_cadet  rounded">
            <div className="p-8 w-full lg:w-1/2 flex flex-col gap-4">
                <TaskForm />
                <div className="flex flex-col bg-cream text-space_cadet p-4 rounded">
                    <span className="text-2xl">
                        +{abstract} Task{abstract === 1 ? "" : "s"}
                    </span>
                </div>
                {second && <TaskDetail task={second} />}
                {first && <TaskDetail task={first} />}
            </div>
        </div>
    );
}

export default Home;
