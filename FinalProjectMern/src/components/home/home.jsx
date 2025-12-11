import React from "react";
import './home.css'
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import girl from "../../assets/fitness-girl.png"
const Home = () => {
    const navigate = useNavigate();
    const login = () => navigate('/login');
    const sign=()=> navigate('/sign');
    return (
        <>
            <div className="home-body">
                <nav className="home-navbar">
                    <div className="logo-section">
                        <img src={logo} alt="" className="logo " />
                    </div>
                    <ul className="nav-ul">
                        <li className="logo-li" onClick={login}>Login</li>
                        <li className="sign-li" onClick={sign}>Sign Up</li>
                    </ul>
                </nav>
                <div className="main-content">
                    <div className="home-text">
                        <h1 className="h1">
                            BUILD 
                        </h1>
                        <h1 className="heading">YOUR BODY</h1>
                        <h3 className="sub">TRANSFORM YOUR LIFE</h3>

                        <button className="start-btn" onClick={login}>Get Started</button>
                    </div>

                    <div className="home-image">
                        <img src={girl} alt="fitness-girl" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;