import { useEffect } from "react";
import TaskDetail from "../components/TaskDetail";
import TaskForm from "../components/TaskForm";
import { useTasksContext } from "../hooks/useTasksContext";

function Home() {
    const { first, second, abstract, dispatch } = useTasksContext();

    useEffect(() => {
        const fetch_tasks = async () => {
            const respone = await fetch("/api/tasks");
            const json = await respone.json();
            if (respone.ok) {
                dispatch({
                    type: "SET_TASKS",
                    payload: json.tasks.filter((e) => !e.deleted_at),
                });
            }
        };

        fetch_tasks();
    }, [dispatch]);

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
