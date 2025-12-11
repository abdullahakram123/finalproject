import React, { useState } from "react";
import './plus.css'
import logo from '../../assets/logo.png'
import { FaGlassWater } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import food from '../../assets/food.jpg'
import cardio from '../../assets/cardio.jpg'
import { RxCross2 } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Plus = () => {
    const navigate = useNavigate();
    const back = () => navigate('/dashboard')
    const history=()=>navigate('/history')
    const [plus, setPlus] = useState({
        Watergoal: "",
        Waterintake: "",
        Caloriesgoal: "",
        Caloriesintake: "",
        Breakfast: "",
        Lunch: "",
        Dinner: "",
        Cardio: "",
        Strength: "",
        Stretching: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlus((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(name, value);
    };
    const handleCancel = () => {
        setPlus({
            Watergoal: "",
            Waterintake: "",
            Caloriesgoal: "",
            Caloriesintake: "",
            Breakfast: "",
            Lunch: "",
            Dinner: "",
            Cardio: "",
            Strength: "",
            Stretching: ""
        })
        navigate("/dashboard")
    }
    const bodyData = {
        ...plus,
        Watergoal: Number(plus.Watergoal || 0),
        Waterintake: Number(plus.Waterintake || 0),
        Caloriesgoal: Number(plus.Caloriesgoal || 0),
        Caloriesintake: Number(plus.Caloriesintake || 0),
        Cardio: Number(plus.Cardio || 0),
        Strength: Number(plus.Strength || 0),
        Stretching: Number(plus.Stretching || 0),
    };
    const user = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/plus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...bodyData,
                userId: user._id
            })
        });

        const result = await response.json();
        console.log(result);
        navigate("/dashboard");
    };

    return (
        <>
            <div className="plus-body">
            <div className="das-left">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <ul className="plus-ul">
                    <ul className="menu-ul">
                        <li><FaHome className="home-icon"  onClick={back}/></li>
                        <li><FaUserAlt className="profile-icon" /></li>
                        <li><FaHistory style={{color:"black", fontSize:'25px'}} onClick={history}/></li>
                    </ul>
                    <li><button className="plus-icon active"><FaPlus /></button></li>
                </ul>
            </div>

            <div className="plus-main-content">
                <div className="plus-header">
                    <h1>Add Today's Data</h1>
                    <p>Track your daily progress</p>
                </div>

                <form className="plus-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* Water Section */}
                        <div className="form-card water-card">
                            <div className="card-header">
                                <div className="card-icon">💧</div>
                                <h3>Water Intake</h3>
                            </div>
                            <div className="form-group">
                                <label>Water Goal (Liters)</label>
                                <input
                                    type="number"
                                    name="Watergoal"
                                    value={plus.Watergoal}
                                    onChange={handleChange}
                                    placeholder="e.g., 8"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Today's Water Intake (Liters)</label>
                                <input
                                    type="number"
                                    name="Waterintake"
                                    value={plus.Waterintake}
                                    onChange={handleChange}
                                    placeholder="e.g., 3"
                                    required
                                />
                            </div>
                        </div>

                        {/* Calories Section */}
                        <div className="form-card calories-card">
                            <div className="card-header">
                                <div className="card-icon">🔥</div>
                                <h3>Calories</h3>
                            </div>
                            <div className="form-group">
                                <label>Calories Goal (kcal)</label>
                                <input
                                    type="number"
                                    name="Caloriesgoal"
                                    value={plus.Caloriesgoal}
                                    onChange={handleChange}
                                    placeholder="e.g., 3500"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Today's Calories Intake (kcal)</label>
                                <input
                                    type="number"
                                    name="Caloriesintake"
                                    value={plus.Caloriesintake}
                                    onChange={handleChange}
                                    placeholder="e.g., 500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Diet Section */}
                        <div className="form-card diet-card">
                            <div className="card-header">
                                <div className="card-icon">🍽️</div>
                                <h3>Diet Menu</h3>
                            </div>
                            <div className="form-group">
                                <label>Breakfast</label>
                                <input
                                    type="text"
                                    name="Breakfast"
                                    value={plus.Breakfast}
                                    onChange={handleChange}
                                    placeholder="e.g., Oatmeal with fruits"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Lunch</label>
                                <input
                                    type="text"
                                    name="Lunch"
                                    value={plus.Lunch}
                                    onChange={handleChange}
                                    placeholder="e.g., Grilled chicken"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Dinner</label>
                                <input
                                    type="text"
                                    name="Dinner"
                                    value={plus.Dinnerinner}
                                    onChange={handleChange}
                                    placeholder="e.g., Salmon with potato"
                                    required
                                />
                            </div>
                        </div>

                        {/* Workout Section */}
                        <div className="form-card workout-card">
                            <div className="card-header">
                                <div className="card-icon">💪</div>
                                <h3>Workout</h3>
                            </div>
                            <div className="form-group">
                                <label>Cardio (minutes)</label>
                                <input
                                    type="number"
                                    name="Cardio"
                                    value={plus.Cardio}
                                    onChange={handleChange}
                                    placeholder="e.g., 30"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Strength Training (minutes)</label>
                                <input
                                    type="number"
                                    name="Strength"
                                    value={plus.Strength}
                                    onChange={handleChange}
                                    placeholder="e.g., 45"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stretching (minutes)</label>
                                <input
                                    type="number"
                                    name="Stretching"
                                    value={plus.Stretching}
                                    onChange={handleChange}
                                    placeholder="e.g., 15"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="button" className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="add-btn">
                            Add Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default Plus;