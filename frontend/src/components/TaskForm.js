import { useState } from "react";
import { TaskConstants } from "../constants/TaskConstants";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/useTasksContext";

function TaskForm() {
    const { dispatch } = useTasksContext();
    const [title, set_title] = useState("");
    const [error, set_error] = useState(null);
    const { user } = useAuthContext();

    const handle_submit = async (e) => {
        e.preventDefault();

        if (!user) {
            set_error("You must be logged in");
            return;
        }

        const task = { title };

        const response = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (!response.ok) {
            set_error(json.error);
        }

        if (response.ok) {
            set_title("");
            set_error(null);
            console.log("task added");
            dispatch({ type: TaskConstants.CREATE_TASK, payload: json });
        }
    };

    return (
        <form onSubmit={handle_submit}>
            <div className="sm:flex-col flex gap-2 mb-4">
                <input
                    onChange={(e) => set_title(e.target.value)}
                    value={title}
                    placeholder="Enter a new task"
                    className={`${
                        error === "missing title"
                            ? "border-red-500 border-2"
                            : ""
                    } rounded bg-cream text-space_cadet p-4 text-2xl w-full`}
                />
                <input
                    type="submit"
                    className="text-cream p-4 text-2xl hover:cursor-pointer text-center grow bg-blue-300 rounded"
                    value="Add"
                />
            </div>

            {error && (
                <p
                    className={`text-space_cadet mt-2 mb-4 bg-red-300 p-2 rounded border-red-500 border-2`}
                >
                    {error}
                </p>
            )}
        </form>
    );
}

export default TaskForm;
