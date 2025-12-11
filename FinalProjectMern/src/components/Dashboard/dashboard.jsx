import React, { useState, useEffect, useRef } from "react";
import './dashboard.css'
import logo from '../../assets/logo.png'
import { FaHome } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BsFire } from "react-icons/bs";
import trainer1 from '../../assets/trainback1.png'
import trainer2 from '../../assets/trainback2.png'
import person1 from '../../assets/image.png'
import person2 from '../../assets/person2.png'
import goldmedal from '../../assets/Gold Medal.png'
import star from '../../assets/star.png'
import breakfast from '../../assets/breakFast.jpg'
import lunch from '../../assets/lunch.jpg'
import dinner from '../../assets/dinner.jpg'
import { FaPlus } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import ai from "../../assets/assistant.png"
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const Dashboard = () => {
    const navigate = useNavigate();
    const plus = () => navigate('/plus');
    const home = () => navigate('/home');
    
    const [userData, setUserData] = useState({
        Username: "",
        Location: "",
        Weight: "",
        Height: "",
        Age: ""
    });
    
    const [additems, setAdditems] = useState({
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
    
    const [weeklyData, setWeeklyData] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const AIbox = () => {
        setShowBox(!showBox)
    }
    
    // AI useStates
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    
    // For mobile navbar
    const [isMobile, setIsMobile] = useState(false);
    const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
    const [isRightNavOpen, setIsRightNavOpen] = useState(false);
    
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            
            if (mobile) {
                // On mobile: hide both sidebars by default
                setIsLeftNavOpen(false);
                setIsRightNavOpen(false);
            } else {
                // On desktop: show both sidebars by default
                setIsLeftNavOpen(true);
                setIsRightNavOpen(true);
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Close sidebar when clicking overlay or opening another sidebar
    const handleLeftNavClick = () => {
        setIsLeftNavOpen(!isLeftNavOpen);
        if (isRightNavOpen) setIsRightNavOpen(false);
    };
    
    const handleRightNavClick = () => {
        setIsRightNavOpen(!isRightNavOpen);
        if (isLeftNavOpen) setIsLeftNavOpen(false);
    };
    
    const closeAllNavs = () => {
        setIsLeftNavOpen(false);
        setIsRightNavOpen(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        fetch(`http://localhost:5000/dashboard/${user._id}`)
            .then(res => res.json())
            .then(data => {
                console.log("DASHBOARD RESPONSE:", data);
                setUserData(data.profile);
                if (!data.plusData) {
                    setAdditems(null);
                } else {
                    setAdditems(data.plusData);
                }
            });

    }, []);
    
    useEffect(() => {
        const expiry = localStorage.getItem("token_expiry");
        if (expiry && Date.now() > expiry) {
            localStorage.clear();
            navigate("/login");
        }
    }, []);
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        fetch(`http://localhost:5000/Weekly-activity/${user._id}`)
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(item => {
                    const day = new Date(item.date + "T00:00:00+05:00").toLocaleDateString("en-Pk", { weekday: "short", timeZone: "Asia/Karachi" });
                    return {
                        day,
                        cardio: item.Cardio
                    };
                })
                setWeeklyData(formatted);
            })
    }, []);
    
    // AI useEffect
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
    const waterintake = Number(additems?.Waterintake);
    const watergoal = Number(additems?.Watergoal)
    const caloriesintake = Number(additems?.Caloriesintake)
    const caloriesgoal = Number(additems?.Caloriesgoal);
    const cardio = Number(additems?.Cardio);
    const strength = Number(additems?.Strength);
    const stretching = Number(additems?.Stretching);
    const Breakfast = additems?.Breakfast;
    const Lunch = additems?.Lunch;
    const Dinner = additems?.Dinner;
    
    let maxLabel = "Cardio";
    let maxValue = cardio;
    if (strength > maxValue) {
        maxValue = strength;
        maxLabel = "Strength"
    } 
    if (stretching > maxValue) {
        maxValue = stretching;
        maxLabel = "Stretching";
    }
    
    const waterData = {
        datasets: [
            {
                data: [
                    waterintake,
                    watergoal - waterintake
                ],
                backgroundColor: ["white", "#FFFFFF4D"],
                borderWidth: 0,
            },
        ],
    };
    
    const caloriesData = {
        datasets: [
            {
                data: [
                    caloriesintake,
                    caloriesgoal - caloriesintake
                ],
                backgroundColor: ["white", "#FFFFFF4D"],
                borderWidth: 0,
            },
        ],
    };
    
    const Week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const chartValues = Week.map(day => {
        const found = weeklyData.find(item => item.day === day);
        return found ? found.cardio : 0;
    });
    
    const activityData = {
        labels: Week,
        datasets: [
            {
                label: "Minutes",
                data: chartValues,
                backgroundColor: "#ff9f40",
                borderRadius: 6,
            },
        ],
    };
    
    const activityOptions = {
        plugins: { legend: { display: false } },
        scales: {
            y: { display: false },
            x: { grid: { display: false } },
        },
    };
    
    const progressData = {
        labels: ["Cardio", "Strength", "Stretching"],
        datasets: [
            {
                label: "Minutes",
                data: [cardio, strength, stretching],
                backgroundColor: ["#4bc0c0", "#ffcd56", "#ff6384"],
                borderWidth: 0,
            },
        ],
    };
    
    // AI WORK
    const askAI = async () => {
        if (!input.trim()) return;
        const userMessage = input;
        const newUserMessage = { role: "user", content: userMessage };
        setMessages(prev => [...prev, newUserMessage]);
        setInput("")

        try {
            const res = await fetch("http://localhost:5000/api/chat/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await res.json();
            const newAIMessage = { role: "ai", content: data.reply };
            setMessages(prev => [...prev, newAIMessage]);

        } catch (error) {
            setMessages(prev => [...prev, { role: "system", content: "Error: Could not connect to the AI server." }]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            askAI();
        }
    };
    
    return (
        <>
            <div className="dashboard-body">
                {isMobile && (
                    <button className="hamburger-menu left-hamburger" onClick={handleLeftNavClick}>
                        {isLeftNavOpen ? <RxCross1 className="close-icon" /> : <FiMenu className="menu-icon" />}
                    </button>
                )}
                {isMobile && (
                    <button className="hamburger-menu right-hamburger" onClick={handleRightNavClick}>
                        {isRightNavOpen ? <RxCross1 className="User-close" /> : <FaUserAlt className="User-open" />}
                    </button>
                )}
                {!additems && (
                    <div className="alert-box">
                        Please enter your today’s data!
                        <button onClick={plus}>Add Now</button>
                    </div>
                )}
                <div className={`das-left ${isMobile ? (isLeftNavOpen ? 'mobile-open' : 'mobile-closed') : 'desktop-visible'}`}>
                    <img src={logo} alt="" />
                    <ul className="left-ul">
                        <ul className="menu-ul">
                            <li><FaHome className="home-icon active" /></li>
                            <li><Link to={'/user'} onClick={closeAllNavs}><FaUserAlt className="profile-icon" /></Link></li>
                            <li><Link to={'/history'} onClick={closeAllNavs}><FaHistory className="history-icon" /></Link></li>
                        </ul>
                        <li><button className="plus-icon" onClick={() => { plus(); closeAllNavs(); }}><FaPlus /></button></li>
                    </ul>
                </div>
                {isMobile && (isLeftNavOpen || isRightNavOpen) && (
                    <div className="nav-overlay" onClick={closeAllNavs}></div>
                )}
                <div className="middle-body">
                    <h1>Welcome to the Dashboard</h1>
                    
                    <div className="water-cal-boxes">
                        <div className="water-box" >
                            <div className="water">
                                <IoWater />
                                <h3>Water</h3>
                            </div>
                            {!additems ? (false) : (
                                <div className="water-goal">
                                    <div className="goal">
                                        <GoDotFill />
                                        <div className="goal-span"><h4>Goal:</h4>
                                            <span>
                                                {watergoal}
                                                Liters
                                            </span>
                                        </div>
                                    </div>
                                    <div className="chart-container">
                                        <Doughnut data={waterData} options={{ cutout: "75%", plugins: { legend: { display: false } } }} />
                                        <div className="chart-center-text">
                                            <h4>{waterintake}</h4>
                                            <span>Liters</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="calories-box">
                            <div className="calories">
                                <BsFire />
                                <h4>Calories</h4>
                            </div>
                            {!additems ? (false) : (
                                <div className="calories-goal">
                                    <div className="goal-remain">
                                        <div className="goal">
                                            <GoDotFill />
                                            <div className="goal-span"><h4>Goal:</h4>
                                                <span>{caloriesgoal}kcal</span>
                                            </div>
                                        </div>
                                        <div className="remaining">
                                            <GoDotFill />
                                            <div className="remaining-span"><h4>Remaining:</h4><span>{caloriesgoal - caloriesintake}kcal</span></div>
                                        </div>
                                    </div>
                                    <div className="chart-container1">
                                        <Doughnut data={caloriesData} options={{ cutout: "75%", plugins: { legend: { display: false } } }} />
                                        <div className="chart-center-text">
                                            <h4>{caloriesintake}</h4>
                                            <span>kcal</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="charts-boxes">
                        <div className="activity">
                            <h3>Activity</h3>
                            <div className="bar-chart">
                                <Bar data={activityData} options={activityOptions} />
                            </div>
                        </div>
                        
                        <div className="progress">
                            <h3>Progress</h3>
                            {!additems ? (false) : (
                                <div className="progress-chart">
                                    <Doughnut data={progressData} options={{ cutout: "70%", plugins: { legend: { display: true, position: 'right' } } }} />
                                    <div className="chart-center-progress">
                                        <h4>{maxValue}</h4>
                                        <span>{maxLabel}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="middle-part">
                        <div className="trainers">
                            <h5>Recommended Trainer for you</h5>
                            <div className="trainer">
                                <div className="trainer1">
                                    <div>
                                        <img src={trainer1} alt="" className="trainback" />
                                        <img src={person1} alt="" className="person1" />
                                    </div>
                                    <div>
                                        <h6>Cameron Williamson</h6>
                                        <p>Fitness Specialist</p>
                                    </div>
                                    <div className="card-end-body">
                                        <div className="card-end">
                                            <div className="goldmedal-body">
                                                <div className="goldmedal">
                                                    <img src={goldmedal} alt="" className="gold" />
                                                </div>
                                                <h4>25</h4>
                                            </div>
                                            <div className="star-body">
                                                <div className="star">
                                                    <img src={star} alt="" className="star-img" />
                                                </div>
                                                <h4>104</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={'/profile'}>View Profile</Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="trainer1">
                                    <div>
                                        <img src={trainer2} alt="" className="trainback" />
                                        <img src={person2} alt="" className="person2" />
                                    </div>
                                    <div>
                                        <h6>Cameron Williamson</h6>
                                        <p>Fitness Specialist</p>
                                    </div>
                                    <div className="card-end-body">
                                        <div className="card-end">
                                            <div className="goldmedal-body">
                                                <div className="goldmedal">
                                                    <img src={goldmedal} alt="" className="gold" />
                                                </div>
                                                <h4>25</h4>
                                            </div>
                                            <div className="star-body">
                                                <div className="star">
                                                    <img src={star} alt="" className="star-img" />
                                                </div>
                                                <h4>104</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={'/profile'}>View Profile</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="menu">
                            <h5>Featured Diet Menu</h5>
                            <div className="menu-body">
                                <div className="breakfast-body">
                                    <div className="breakfast">
                                        <img src={breakfast} alt="" className="breakfast-img" />
                                        <h4>BreakFast</h4>
                                    </div>
                                    <ul>
                                        <li>{Breakfast}</li>
                                    </ul>
                                </div>
                                
                                <div className="lunch-body">
                                    <div className="lunch">
                                        <img src={lunch} alt="" className="lunch-img" />
                                        <h4>Lunch</h4>
                                    </div>
                                    <ul>
                                        <li>{Lunch}</li>
                                    </ul>
                                </div>
                                
                                <div className="dinner-body">
                                    <div className="dinner">
                                        <img src={dinner} alt="" className="dinner-img" />
                                        <h4>Dinner</h4>
                                    </div>
                                    <ul>
                                        <li>{Dinner}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`right-side ${isMobile ? (isRightNavOpen ? 'right-open' : 'right-closed') : 'desktop-visible'}`}>
                    <div className="rightside-top">
                        <div className="info-part">
                            <FaUserAlt className="user-icon" />
                            <div>
                                <h2>{userData?.Username || "User Name"}</h2>
                                <div className="location">
                                    <FaLocationDot className="location-icon" />
                                    <h6>{userData?.Location || "----"}</h6>
                                </div>
                            </div>
                        </div>
                        <button className="logout" onClick={home}>
                            <FiLogOut />
                        </button>
                    </div>
                    
                    <div className="personal-info">
                        <ul className="personal-info-ul">
                            <li className="weight">
                                <div className="kg">
                                    <h2>{userData?.Weight || '---'}</h2><span>kg</span>
                                </div>
                                <h4>Weight</h4>
                            </li>
                            
                            <li className="height">
                                <div>
                                    <h2>{userData?.Height || '---'}</h2>
                                </div>
                                <h4>Height</h4>
                            </li>
                            
                            <li className="age">
                                <div className="yrs">
                                    <h2>{userData?.Age || '---'}</h2> <span>yrs</span>
                                </div>
                                <h4>Age</h4>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <div className="hello-button">
                            {showBox && (
                                <div className="Ai-box">
                                    <div className="Ai-head">
                                        <img src={ai} alt="" width={50} />
                                        <h2 style={{ color: "black", marginBottom: 15 }}>AI Assistant</h2>
                                    </div>
                                    <div className="ai-message-container">
                                        {messages.length === 0 && (
                                            <p style={{ color: '#aaa', textAlign: 'center', marginTop: 'auto', position: "absolute", left: "20%" }}>
                                                <h1>Hello,{userData.Username}</h1>
                                            </p>
                                        )}

                                        {messages.map((msg, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    textAlign: msg.role === 'user' ? 'right' : 'left',
                                                    marginBottom: 10,
                                                    maxWidth: '100%',
                                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                                    marginLeft: msg.role === 'user' ? '20%' : 'unset',
                                                    marginRight: msg.role === 'ai' ? '20%' : 'unset',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        padding: '8px 12px',
                                                        borderRadius: '15px',
                                                        display: 'inline-block',
                                                        background: msg.role === 'user' ? '#007bff' : '#333',
                                                        color: msg.role === 'user' ? 'white' : '#ccc',
                                                    }}
                                                >
                                                    {msg.content}
                                                </span>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                    
                                    <div className="textarea-send">
                                        <textarea
                                            className="textarea"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Ask anything"
                                        />
                                        <button className="send-icon" onClick={askAI}>
                                            <IoSend />
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <button onClick={AIbox} className="ai-button">
                                <img src={ai} alt="" width={80} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;