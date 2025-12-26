import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure, logout } from "../slices/auth";
import axios from "axios";

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLogin, isLoading, token, error } = useSelector((state) => state.auth);

    const login = async (email, password) => {
        dispatch(loginStart());
        try {
            const response = await axios.post("https://todo-backend-3-2760.onrender.com/api/login", {
                email,
                password
            })
            const data = response.data;
            dispatch(loginSuccess({
                user: data.name,
                token: data.token,
                id: data.id,
            }));
            navigate("/");
        } catch (err) {
            console.error("Login failed", err.response?.data?.message);
            dispatch(loginFailure(err.response?.data?.message));
        }
    };

    const signup = async (name, email, password) => {
        dispatch(loginStart());
        try {
            const response = await axios.post("https://todo-backend-3-2760.onrender.com/api/signup", {
                name,
                email,
                password
            })
            const data = response.data
            console.log(data);
            dispatch(loginSuccess({
                user: data.name,
                token: data.token,
                id: data.id,
            }));
            navigate("/");
        } catch (err) {
            console.error("Signup failed", err);
            dispatch(loginFailure(err.response?.data?.message));
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth");
    };

    return { user, isLogin, isLoading, token, error, login, signup, logout: handleLogout };
};

export default useAuth;