import React, { useState } from "react";
import './sign.css'
import sign from '../../assets/fitness-boy.png'
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Home from "../home/home";
const Sign = () => {
    const navigate = useNavigate();
    const home = () => navigate("/");
    const [signup, setSignup] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        repeatpassword: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setSignup((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(name, value);
    }
    const Detail = async (e) => {
        e.preventDefault();
        if (signup.password !== signup.repeatpassword) {
            alert("Passwords do not match");
            return;
        }
        console.log('register', signup);
        const response = await fetch('http://localhost:5000/auth/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signup)
        });
        const result = await response.json();
        console.log(result);

        if (result.status) {
            alert("Account Created Successfully!");
            navigate("/login");
        }
    }

    return (
        <>
            <div className="sign-body">
                <div className="sign-home">
                    <Home />
                </div>
                <div className="sign-content">
                    <div>
                        <img src={sign} alt="" srcset="" className="left-side-sign"  height={441} width={290}/>
                    </div>
                    <div className="right-side-sign">
                        <button className="cross1" onClick={home}>
                            <RxCross2 />
                        </button>
                        <h2>Create an Account</h2>
                        <form action="" className="sign-form" onSubmit={Detail}>
                            <div className="inputs">
                                <div className="fullname">
                                    <label htmlFor="">Full Name:</label>
                                    <input type="text" name="name" id="" onChange={handleChange} value={signup.name} placeholder="Enter your Fullname"/>
                                </div>
                                <div className="username">
                                    <label htmlFor="">User Name:</label>
                                    <input type="text" name="username" id="" onChange={handleChange} value={signup.username} placeholder="Enter your Username"/>
                                </div>
                                <div className="Email">
                                    <label htmlFor="">Email:</label>
                                    <input type="email" name="email" id="" onChange={handleChange} value={signup.email} placeholder="Enter your email"/>
                                </div>
                                <div className="pass">
                                    <label htmlFor="">Password:</label>
                                    <input type="password" name="password" id="" onChange={handleChange} value={signup.password} placeholder="Enter your password"/>
                                </div>
                                <div className="repeat">
                                    <label htmlFor="">Repeat Password:</label>
                                    <input type="password" name="repeatpassword" id="" onChange={handleChange} value={signup.repeatpassword} placeholder="Repeat password"/>
                                </div>
                            </div>
                            <div className="button">
                                <input type="submit" value="Get Started" className="sign-btn" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Sign;