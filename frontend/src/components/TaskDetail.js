import moment from "moment";
import { TaskConstants } from "../constants/TaskConstants";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTasksContext } from "../hooks/useTasksContext";
function TaskDetail({ task }) {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();

    if (!user) {
        return;
    }
    const handle_delete = async () => {
        const respone = await fetch(`/api/tasks/${task._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await respone.json();

        if (respone.ok) {
            console.log("task deleted");
            dispatch({ type: TaskConstants.DELETE_TASK, payload: json });
        }
    };
    const handle_update = async () => {
        const respone = await fetch(`/api/tasks/${task._id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json = await respone.json();

        if (respone.ok) {
            console.log("task updated");
            dispatch({ type: TaskConstants.UPDATE_TASK, payload: json });
        }
    };
    return (
        <div className="flex flex-col bg-cream p-4 rounded">
            <span className="text-2xl text-space_cadet">{task.title}</span>

            <div className="mt-2 flex gap-4 justify-around">
                <span
                    onClick={handle_delete}
                    className="text-cream hover:cursor-pointer text-center grow bg-blue-300 p-2 rounded"
                >
                    Done
                </span>
                <span
                    onClick={handle_update}
                    className="text-cream hover:cursor-pointer text-center grow bg-blue-300 p-2 rounded"
                >
                    Move to back
                </span>
            </div>
            <span className="text-end mt-2 text-sm text-space_cadet opacity-50">
                {
                    moment(task.updated_at).fromNow() //.format("MMMM Do YYYY, h:mm:ss a")
                }
            </span>
        </div>
    );
}

export default TaskDetail;
