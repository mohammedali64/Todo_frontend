import { FiTrash2, FiRotateCcw } from "react-icons/fi";
import useTask from "../hooks/useTask";
import { useDispatch, useSelector } from "react-redux";
import { setTasksArr } from "../slices/task";

const CompletedTasks = ({ task }) => {
    const { updateTask, deleteTask } = useTask();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);

    const handleRevert = async () => {
        const updatedTask = { ...task, status: "todo" };
        const filteredTasks = tasks.filter((t) => t._id !== task._id);
        dispatch(setTasksArr([updatedTask, ...filteredTasks]));
        await updateTask(updatedTask);
    };

    const handleDelete = async () => {
        const filteredTasks = tasks.filter((t) => t._id !== task._id);
        dispatch(setTasksArr(filteredTasks));
        await deleteTask(task._id);
    };

    return (
        <div className="w-full bg-green-50 border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between p-4">
            <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-semibold text-gray-800 truncate">{task.title}</h3>
                {task.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                )}

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {task.priority}
                    </span>
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 font-medium rounded">
                        Completed
                    </span>
                    <span className="text-gray-500 flex items-center gap-1">{task.date}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleRevert}
                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-100 p-2 rounded-lg transition"
                    title="Revert to To-Do"
                >
                    <FiRotateCcw size={19} />
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

export default CompletedTasks;