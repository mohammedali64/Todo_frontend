import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, signup } = useAuth();

    const loading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(email, password);
        } else {
            signup(username, email, password);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
                <div className="p-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-white/70">
                            {isLogin ? "Enter your details to sign in" : "Sign up to get started"}
                        </p>
                    </div>

                    <div className="flex bg-white/20 rounded-full p-1 mb-8">
                        <button
                            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isLogin ? "bg-white text-purple-600 shadow-md" : "text-white hover:bg-white/10"
                                }`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isLogin ? "bg-white text-purple-600 shadow-md" : "text-white hover:bg-white/10"
                                }`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="peer w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    placeholder="Username"
                                />
                                <label
                                    htmlFor="username"
                                    className="absolute left-4 -top-2.5 bg-transparent px-1 text-xs text-white/80 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white"
                                >
                                    Username
                                </label>
                            </div>
                        )}

                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="peer w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                placeholder="Email Address"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 -top-2.5 bg-transparent px-1 text-xs text-white/80 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white"
                            >
                                Email Address
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                placeholder="Password"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-4 -top-2.5 bg-transparent px-1 text-xs text-white/80 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white"
                            >
                                Password
                            </label>
                        </div>
                        <div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-white text-purple-600 rounded-lg font-bold shadow-lg hover:bg-opacity-90 transform hover:-translate-y-0.5 transition-all duration-200"

                        >
                            {!loading && (isLogin ? "Sign In" : "Create Account")}
                            {loading && (isLogin ? "Signing In..." : "Creating Account...")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;