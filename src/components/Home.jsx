import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/auth";
import useTask from "../hooks/useTask";
import { useEffect, useState } from "react";
import { setTasksArr } from "../slices/task";
import Tasks from "./Tasks";
import CompletedTasks from "./CompletedTasks";


const Home = () => {
    const { addTask, getTasks, updateTask, deleteTask } = useTask();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("todo");
    const tasks = useSelector((state) => state.task.tasks);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await getTasks();
            if (data?.tasks) {
                dispatch(setTasksArr(data.tasks));
            }
        };
        fetchTasks();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !date || !priority || !status) {
            alert("Please fill all the fields");
            return;
        }
        addTask(title, description, date, priority, status);
        dispatch(setTasksArr([...tasks, { title, description, date, priority, status }]));
        setTitle("");
        setDescription("");
        setPriority("low");
        setDate("");
        setStatus("todo");
    }
    return (
        <div>
            <div className="flex justify-between bg-blue-200 p-6 fixed top-0 left-0 right-0">
                <div>
                    <h1 className="text-2xl font-bold">Task Manager</h1>
                </div>
                <div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="mt-24">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold">Add Task</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Priority</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option>low</option>
                                <option>medium</option>
                                <option>high</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option>todo</option>
                                <option>done</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Add Task</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-10 px-6">

                <h2 className="text-xl font-bold mb-4">Todo Tasks</h2>
                <div className="space-y-4">
                    {tasks
                        .filter(task => task.status === "todo")
                        .map(task => (
                            <Tasks key={task._id} task={task} />
                        ))
                    }
                    {
                        tasks.length === 0 && (
                            <p className="text-center">No tasks found</p>
                        )
                    }
                </div>

                <h2 className="text-xl font-bold mt-10 mb-4">Completed Tasks</h2>
                <div className="space-y-4">
                    {tasks
                        .filter(task => task.status === "done")
                        .map(task => (
                            <CompletedTasks key={task._id} task={task} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Home;