import { useEffect } from "react";
import TaskDetail from "../components/TaskDetail";
import TaskForm from "../components/TaskForm";
import { TaskConstants } from "../constants/TaskConstants";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/useTasksContext";

function Home() {
    const { first, second, abstract, dispatch } = useTasksContext();
    const { user } = useAuthContext();

    useEffect(() => {
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
        };
        if (user) {
            fetch_tasks();
        }
    }, [dispatch, user]);

    return (
        <div className="flex justify-center mt-8 w-full bg-space_cadet  rounded">
            <div className="p-8 flex flex-col gap-4">
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
