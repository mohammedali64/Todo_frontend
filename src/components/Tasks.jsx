import { FiTrash2, FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setTasksArr } from "../slices/task";
import useTask from "../hooks/useTask";

const Tasks = ({ task }) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const { updateTask, deleteTask } = useTask();

    const handleCompletion = async () => {
        const updatedTask = { ...task, status: "done" };
        const filteredTasks = tasks.filter((t) => t._id !== task._id);
        dispatch(setTasksArr([updatedTask, ...filteredTasks]));
        await updateTask(updatedTask);
    };

    const handleDelete = async () => {
        const filteredTasks = tasks.filter((t) => t._id !== task._id);
        dispatch(setTasksArr(filteredTasks));
        await deleteTask(task._id);
    };

    const priorityColors = {
        high: "bg-red-50 border-red-200",
        medium: "bg-orange-50 border-orange-200",
        low: "bg-yellow-50 border-yellow-200",
    };

    const bgColor = priorityColors[task.priority?.toLowerCase()] || "bg-gray-50 border-gray-200";

    return (
        <div className={`w-full ${bgColor} border rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between p-4`}>
            <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-semibold text-gray-800 truncate">{task.title}</h3>
                {task.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                )}

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className={`px-2.5 py-1 rounded font-medium ${task.priority?.toLowerCase() === "high"
                        ? "bg-red-200 text-red-700"
                        : task.priority?.toLowerCase() === "medium"
                            ? "bg-orange-200 text-orange-700"
                            : "bg-yellow-200 text-yellow-700"
                        }`}>
                        {task.priority}
                    </span>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-medium rounded">
                        To Do
                    </span>
                    <span className="text-gray-500 flex items-center gap-1">{task.date}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleCompletion}
                    className="text-green-600 hover:text-green-700 hover:bg-green-100 p-2 rounded-lg transition"
                    title="Mark as Completed"
                >
                    <FiCheckCircle size={20} />
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition"
                    title="Delete"
                >
                    <FiTrash2 size={19} />
                </button>
            </div>
        </div>
    );
};

export default Tasks;