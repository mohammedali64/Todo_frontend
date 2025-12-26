import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../slices/auth";

const useTask = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);


    const addTask = async (title, description, date, priority, status) => {
        try {
            const response = await axios.post("https://todo-backend-3-2760.onrender.com/api/createtask", {
                title,
                description,
                date,
                priority,
                status
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            dispatch(logout());
        }
    }

    const getTasks = async () => {
        try {
            const response = await axios.get("https://todo-backend-3-2760.onrender.com/api/gettasks", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
            dispatch(logout());

        }
    }

    const updateTask = async (task) => {
        try {
            const response = await axios.put(`https://todo-backend-3-2760.onrender.com/api/edittask/${task._id}`, {
                id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                date: task.date,
                userId: task.userId
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            dispatch(logout());
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`https://todo-backend-3-2760.onrender.com/api/deletetask/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            dispatch(logout());
        }
    }
    return {
        addTask,
        getTasks,
        updateTask,
        deleteTask
    }
}
export default useTask;