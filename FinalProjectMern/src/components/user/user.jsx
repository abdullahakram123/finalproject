import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './user.css';
import { FaHome, FaUserAlt, FaHistory, FaUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import logo from "../../assets/logo.png"

const User = () => {
    const navigate = useNavigate();
    const dashboard = () => navigate('/dashboard');
    const history = () => navigate('/history');
    const plus = () => navigate('/plus');

    const [profile, setProfile] = useState({
        Username: "",
        Location: "",
        Weight: "",
        Height: "",
        Age: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(name, value);
    };

    const remove = () => {
        setProfile({
            Username: "",
            Location: "",
            Weight: "",
            Height: "",
            Age: ""
        });
        navigate("/dashboard");
    };

    const Submit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        
        const response = await fetch("http://localhost:5000/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...profile,
                userId: user._id
            })
        });

        const result = await response.json();
        console.log(result);
        navigate("/dashboard");
    };

    return (
        <div className="history-body">
            {/* Same Left Sidebar */}
            <div className="user-left">
                <img src={logo} alt="" srcset="" />
                <ul className="user-left-ul">
                    <ul className="menu-ul">
                        <li><FaHome className="home-icon" onClick={dashboard} /></li>
                        <li><FaUserAlt className="profile-icon active" /></li>
                        <li><FaHistory className="history-icon" onClick={history} /></li>
                    </ul>
                    <li><button className="plus-icon" onClick={plus}><FaPlus /></button></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="history-main-content">
                <div className="history-header">
                    <h1>Profile Setting</h1>
                    <p>Update your personal information</p>
                </div>

                <div className="profile-setting-container">
                    <div className="profile-setting-card">
                        <div className="profile-icon-section">
                            <div className="profile-icon-circle">
                                <FaUser className="profile-page-icon" />
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={Submit} className="profile-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="Username">Username:</label>
                                    <input 
                                        type="text" 
                                        name="Username"  
                                        value={profile.Username} 
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Location">Location:</label>
                                    <input 
                                        type="text" 
                                        name="Location" 
                                        value={profile.Location} 
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your location"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="Weight">Weight (kg):</label>
                                    <input 
                                        type="number" 
                                        name="Weight"  
                                        value={profile.Weight} 
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter weight"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Height">Height (cm):</label>
                                    <input 
                                        type="number" 
                                        name="Height"  
                                        value={profile.Height} 
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter height"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="Age">Age:</label>
                                    <input 
                                        type="number" 
                                        name="Age"  
                                        value={profile.Age} 
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Enter your age"
                                    />
                                </div>
                                <div className="form-group"></div> {/* Empty for alignment */}
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={remove}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;