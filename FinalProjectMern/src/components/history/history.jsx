import React, { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import './history.css';
import logo from '../../assets/logo.png'
import { FaHome } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";

const History = () => {
    const navigate = useNavigate();
    const dashboard = () => navigate('/dashboard');
    const plus = () => navigate('/plus');
    const user=()=> navigate('/user')

    const [historyData, setHistoryData] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchTerm);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        fetch(`http://localhost:5000/history/${user._id}`)
            .then(res => res.json())
            .then(data => {
                console.log("HISTORY DATA:", data);
                setHistoryData(data);
            })
            .catch(error => {
                console.error("Error fetching history:", error);
            })
    }, [])
    console.log("ooo", historyData);
    const processedData = historyData.map(item => ({
        date: item.date || "",
        Waterintake: item.Waterintake || 0,
        Watergoal: item.Watergoal || 0,
        Caloriesintake: item.Caloriesintake || 0,
        Caloriesgoal: item.Caloriesgoal || 0,
        Breakfast: item.Breakfast || "",
        Lunch: item.Lunch || "",
        Dinner: item.Dinner || "",
        Cardio: item.Cardio || 0,
        Strength: item.Strength || 0,
        Stretching: item.Stretching || 0
    }));
    const filteredData = processedData.filter(item => {
        const searchTermLower = searchTerm.toLowerCase();

        const dinnerString = item.Dinner ? item.Dinner.toString().toLowerCase() : "";
        const breakfastString = item.Breakfast ? item.Breakfast.toString().toLowerCase() : "";
        const lunchString = item.Lunch ? item.Lunch.toString().toLowerCase() : "";

        let dateString = "";
        let formattedDateString = "";

        if (item.date) {
            dateString = item.date.toString().toLowerCase();

            try {
                const dateObj = new Date(dateString + 'T00:00:00');
                if (!isNaN(dateObj.getTime())) {
                    formattedDateString = dateObj.toLocaleDateString('en-PK', {
                        timeZone: "Asia/Karachi",
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }).toLowerCase();
                }
            } catch (error) {
                console.log("Date conversion error:", error);
            }
        }

        const matchesSearch =
            dateString.includes(searchTermLower) ||
            formattedDateString.includes(searchTermLower) ||
            breakfastString.includes(searchTermLower) ||
            lunchString.includes(searchTermLower) ||
            dinnerString.includes(searchTermLower);

        console.log(`Search: "${searchTermLower}", Date: "${dateString}", Formatted Date: "${formattedDateString}", Match: ${matchesSearch}`);

        if (filter === 'all') return matchesSearch;
        if (filter === 'good') return item.Waterintake >= item.Watergoal && item.Caloriesintake <= item.Caloriesgoal;
        if (filter === 'needs-improvement') return item.Waterintake < item.Watergoal || item.Caloriesintake > item.Caloriesgoal;

        return matchesSearch;
    });

    const calculateProgress = (intake, goal) => {
    let percentage = (intake / goal) * 100;
    // 2. Percentage ko round karo (pura number banao)
    percentage = Math.round(percentage);
    if(percentage > 100) {
        return 100;
    }
    return percentage;
};
    return (
        <div className="history-body">
            <div className="history-left">
                <img src={logo} alt="" />
                <ul className="history-left-ul">
                    <ul className="menu-ul">
                        <li><FaHome className="home-icon " onClick={dashboard} /></li>
                        <li><FaUserAlt className="profile-icon"  onClick={user}/></li>
                        <li><FaHistory className="history-icon active" /></li>
                    </ul>
                    <li><button className="plus-icon" onClick={plus}><FaPlus /></button></li>
                </ul>
            </div>

            <div className="history-main-content">
                <div className="history-header">
                    <h1>Activity History</h1>
                    <p>Track your fitness journey over time</p>
                </div>

                {/* Controls Section */}
                <div className="history-controls">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by date, breakfast, lunch, or dinner..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    console.log("Searching for:", searchTerm);
                                }
                            }}
                        />
                    </div>

                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All Days
                        </button>
                        <button
                            className={`filter-btn ${filter === 'good' ? 'active' : ''}`}
                            onClick={() => setFilter('good')}
                        >
                            Good Days
                        </button>
                        <button
                            className={`filter-btn ${filter === 'needs-improvement' ? 'active' : ''}`}
                            onClick={() => setFilter('needs-improvement')}
                        >
                            Needs Improvement
                        </button>
                    </div>
                </div>

                {/* History Cards */}
                <div className="history-cards">
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div key={item.id} className="history-card">
                                <div className="card-date">
                                    <h3>{new Date(item.date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</h3>
                                </div>

                                <div className="card-content">
                                    {/* Water Progress */}
                                    <div className="progress-item">
                                        <div className="progress-header">
                                            <span className="progress-label">Water Intake</span>
                                            <span className="progress-value">
                                                {item.Waterintake}L / {item.Watergoal}L
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill water-fill"
                                                style={{ width: `${calculateProgress(item.Waterintake, item.Watergoal)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Calories Progress */}
                                    <div className="progress-item">
                                        <div className="progress-header">
                                            <span className="progress-label">Calories</span>
                                            <span className="progress-value">
                                                {item.Caloriesintake}kcal / {item.Caloriesgoal}kcal
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill calories-fill"
                                                style={{ width: `${calculateProgress(item.Caloriesintake, item.Caloriesgoal)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Workout Summary */}
                                    <div className="workout-summary">
                                        <h4>Workout</h4>
                                        <div className="workout-stats">
                                            <div className="workout-item">
                                                <span className="workout-type">Cardio</span>
                                                <span className="workout-value">{item.Cardio} min</span>
                                            </div>
                                            <div className="workout-item">
                                                <span className="workout-type">Strength</span>
                                                <span className="workout-value">{item.Strength} min</span>
                                            </div>
                                            <div className="workout-item">
                                                <span className="workout-type">Stretching</span>
                                                <span className="workout-value">{item.Stretching} min</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Diet Summary */}
                                    <div className="diet-summary">
                                        <h4>Meals</h4>
                                        <div className="meal-items">
                                            <div className="meal-item">
                                                <strong>Breakfast:</strong> {item.Breakfast}
                                            </div>
                                            <div className="meal-item">
                                                <strong>Lunch:</strong> {item.Lunch}
                                            </div>
                                            <div className="meal-item">
                                                <strong>Dinner:</strong> {item.Dinner}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <div className="day-rating">
                                        {item.Waterintake >= item.Watergoal && item.Caloriesintake <= item.Caloriesgoal ? (
                                            <span className="rating good">⭐ Great Day!</span>
                                        ) : (
                                            <span className="rating average">💪 Keep Going!</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-data">
                            <h3>No history data found</h3>
                            <p>Start tracking your fitness journey to see your history here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;