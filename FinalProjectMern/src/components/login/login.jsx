import React, { useState } from "react";
import './login.css'
import { RxCross2 } from "react-icons/rx";
import Home from "../home/home";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const home = () => navigate('/')
    const [errorMsg, setErrorMsg] = useState("");
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(name, value);
    };
    const Submitlogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: login.email, password: login.password })
        });

        const data = await response.json();
        if (!response.ok) {
            setErrorMsg(data.message); 
            return;
        }
        console.log(data.message);
        
        setErrorMsg("");
        console.log('abdullah',data);
        if (data.status) {
            const token = data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("token_expiry", Date.now() + 3600000);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/dashboard");
        }
    };


    return (
        <>
            <div className="login-body">
                <div className="home-blur">
                    <Home />
                </div>
                <div className="login-content">
                    <button className="cross" onClick={home}>
                        <RxCross2 />
                    </button>
                    <h2>Welcome Back</h2>
                    <div className="login-form">
                        <form action="" className="log-form" onSubmit={Submitlogin}>
                            {errorMsg && (
                                <div  className="error">
                                    {errorMsg}
                                </div>
                            )}
                            <div className="log-email">
                                <label htmlFor="">Email:</label>
                                <input type="text" name="email" id="" onChange={handleChange} value={login.email} placeholder="Enter your email"/>
                            </div>
                            <div className="pass-forgot">
                                <div className="login-password">
                                    <label htmlFor="">Password:</label>
                                    <input type="password" name="password" id="" onChange={handleChange} value={login.password} placeholder="Enter password"/>
                                </div>
                                <a href="" className="forgot">Forgot Password</a>
                            </div>
                            <input type="submit" value="Get Started" className="login-getstarted" />
                        </form>
                        <div className="or">
                            <div className="line"></div>
                            <span>OR</span>
                            <div className="line"></div>
                        </div>
                        <div className="login-account">
                            <p>Don't have an account?
                                <span>
                                    <Link to={'/sign'}>Sign Up</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Login;