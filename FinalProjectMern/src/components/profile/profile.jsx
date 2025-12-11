import React from "react";
import './profile.css'
import trainer from '../../assets/image.png'
import { RxCross2 } from "react-icons/rx";
import { FaDumbbell, FaUsers, FaClock, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const dashboard = () => navigate('/dashboard');
    
    const googleMapIframe = (
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.77141037341!2d74.37268607469443!3d31.47547374936048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391906766669ea91%3A0xe22b352cd8a61c91!2sDHA%20Swimming%20Pool%20%26%20Gym%20Complex!5e0!3m2!1sen!2s!4v1763748111858!5m2!1sen!2s" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
        ></iframe>
    );
    
    return (
        <div className="mainbody-profile">
            <div className="profile-header">

                <button className="profile-cross" onClick={dashboard}>
                    <RxCross2 size={20} />
                </button>
            </div>
            
            <div className="profile-hero">
                <div className="trainer-pic-container">
                    <img src={trainer} alt="Cameron Williamson" className="trainer-pic" />
                </div>
                
                <div className="trainer-info">
                    <h1>Cameron Williamson</h1>
                    <h3>Fitness Specialist & Personal Trainer</h3>
                    
                    <div className="stats-container">
                        <div className="stat-card">
                            <div className="stat-value">8+</div>
                            <div className="stat-label">Years Experience</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">500+</div>
                            <div className="stat-label">Clients Trained</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">4.9</div>
                            <div className="stat-label">Rating</div>
                        </div>
                    </div>
                    
                    <div className="specialties">
                        <span className="specialty-tag">Strength Training</span>
                        <span className="specialty-tag">Cardio</span>
                        <span className="specialty-tag">Rehabilitation</span>
                        <span className="specialty-tag">Nutrition</span>
                    </div>
                </div>
            </div>
            
            <div className="profile-content">
                <div className="bio-card">
                    <h4>About Me</h4>
                    <p>
                        I work with clients of all fitness levels and ages that have all different fitness goals. 
                        I train 1-on-1 and in small group settings. I specialize in keeping my clients very mobile 
                        and building a strong and stable foundation. I focus on functional movement and sustainable 
                        progress rather than just numbers.
                    </p>
                    
                    <div className="training-approach">
                        <h4>My Approach</h4>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <FaUsers color="red" />
                                <span>Personalized Training Plans</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <FaDumbbell color="red" />
                                <span>Functional Movement Focus</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <FaClock color="red" />
                                <span>Flexible Scheduling</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <FaStar color="red" />
                                <span>Progress Tracking</span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="book-btn">
                        BOOK YOUR OWN TRAINER NOW
                    </button>
                </div>
                
                <div className="map-container">
                    {googleMapIframe}
                </div>
            </div>
        </div>
    )
}

export default Profile;