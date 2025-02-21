import React from "react";

export const Home = () => {
    return (
        <div className="home-page">
            <div className="home-container">
                <div className="welcome">
                    <h1 className="welcome-header">TRACK, PLAN, LIFT</h1>

                    <h3 className="welcome-msg">
                        Use SlugTracker to track gym occupancy in real-time and receive live updates on facility
                        and equipment availability. Plan your day with personalized workout recommendations to help 
                        achieve your fitness goals efficiently.
                    </h3>

                    {/* this number updates routinely */}
                    <h1 className="num-of-people">150</h1>
                    <h2>people in the gym</h2>

                    <div className="gym-status">
                        <h3>Gym is currently:</h3>
                        {/* update based on number of people, 0-79 == empty, 80-139 == busy, 140-150 == full */}
                        <h2 className="status">FULL</h2>
                    </div>

                    <div className="gym-waiting-time">
                        {/* updated based on number of people, 0-149 == no line, 150 == stay home */}
                        <h3>Approx. waiting time:</h3>
                        <h2 className="waiting-time">STAY HOME</h2>
                    </div>
                </div>

                <div className="gym-schedule">
                    <h1>GYM HOURS</h1>
                    
                    <div className="schedule-container">
                        <div className="days">
                            <h3>Monday</h3>
                            <h3>Tuesday</h3>
                            <h3>Wednesday</h3>
                            <h3>Thursday</h3>
                            <h3>Friday</h3>
                            <h3>Saturday</h3>
                            <h3>Sunday</h3>
                        </div>

                        <div className="hours">
                            <h3>6:00 AM - 11:00 PM</h3>
                            <h3>6:00 AM - 11:00 PM</h3>
                            <h3>6:00 AM - 11:00 PM</h3>
                            <h3>6:00 AM - 11:00 PM</h3>
                            <h3>6:00 AM - 11:00 PM</h3>
                            <h3>8:00 AM - 8:00 PM</h3>
                            <h3>8:00 AM - 8:00 PM</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}