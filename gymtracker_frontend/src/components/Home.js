import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Home = () => {
  const [peopleCount, setPeopleCount] = useState(150);
  const [countAnimation, setCountAnimation] = useState(false);
  const [status, setStatus] = useState("FULL");
  const [waitingTime, setWaitingTime] = useState("STAY HOME");
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const gymScheduleRef = useRef(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Replace w/ backend alter
      const newCount = Math.floor(Math.random() * 30) + 130; // Range 130-159
      setPeopleCount(newCount);
      setCountAnimation(true);
      
      // Update status based on count
      if (newCount < 80) {
        setStatus("EMPTY");
      } else if (newCount < 140) {
        setStatus("BUSY");
      } else {
        setStatus("FULL");
      }
      
      // Update waiting time
      if (newCount < 150) {
        setWaitingTime("NO LINE");
      } else {
        setWaitingTime("STAY HOME");
      }
      
      // Reset animation trigger
      setTimeout(() => setCountAnimation(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentGymScheduleRef = gymScheduleRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true)
        }
      },
      {threshold: 0.3}
    );

    if (currentGymScheduleRef) {
      observer.observe(currentGymScheduleRef);
    }

    return () => {
      if (currentGymScheduleRef) {
        observer.unobserve(currentGymScheduleRef);
      }
    }
  }, [hasAnimated]);
  
  // Get status class
  const getStatusClass = () => {
    switch(status) {
      case "EMPTY": return "status-empty";
      case "BUSY": return "status-busy";
      case "FULL": return "status-full";
      default: return "status-busy";
    }
  };
  
  // Get waiting time class
  const getWaitingTimeClass = () => {
    return waitingTime === "STAY HOME" ? "waiting-stay-home" : "waiting-no-line";
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <motion.div 
          className="welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="welcome-header"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(66,153,225,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
            }}
            transition={{ 
              duration: 0.8, 
              textShadow: { 
                repeat: Infinity, 
                duration: 2,
                repeatType: "reverse" 
              } 
            }}
          >
            TRACK, PLAN, LIFT
          </motion.h1>

          <motion.h3 
            className="welcome-msg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Use SlugTracker to track gym occupancy in real-time and receive live updates on facility
            and equipment availability. Plan your day with personalized workout recommendations to help
            achieve your fitness goals efficiently.
          </motion.h3>

          <div className="people-count-container">
            <motion.h1 
              className={`num-of-people ${countAnimation ? 'pulse' : ''}`}
              key={peopleCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {peopleCount}
            </motion.h1>
            <motion.h2 
              className="people-count-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              people in the gym
            </motion.h2>
          </div>

          <motion.div 
            className="gym-status"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3>Gym is currently:</h3>
            <motion.h2 
              className={`status ${getStatusClass()}`}
              key={status}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                color: status === "FULL" 
                  ? ["#e53e3e", "#f56565", "#e53e3e"] 
                  : status === "BUSY" 
                    ? ["#dd6b20", "#ed8936", "#dd6b20"] 
                    : ["#38a169", "#48bb78", "#38a169"]
              }}
              transition={{ 
                duration: 0.3,
                color: { repeat: Infinity, duration: 2, repeatType: "reverse" }
              }}
            >
              {status}
            </motion.h2>
          </motion.div>

          <motion.div 
            className="gym-waiting-time"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>Approx. waiting time:</h3>
            <motion.h2 
              className={`waiting-time ${getWaitingTimeClass()}`}
              key={waitingTime}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {waitingTime}
            </motion.h2>
          </motion.div>
        </motion.div>

        <motion.div 
          ref={gymScheduleRef}
          className={`gym-schedule ${isInView ? "animate-in": ""}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1 
            ref={gymScheduleRef}
            className="schedule-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.5 }}
          >
            GYM HOURS
          </motion.h1>
          
          <motion.div 
            className="schedule-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="days">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                <motion.h3 
                  ref={gymScheduleRef}
                  key={day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {day}
                </motion.h3>
              ))}
            </div>

            <div className="hours">
              {[
                "6:00 AM - 11:00 PM",
                "6:00 AM - 11:00 PM",
                "6:00 AM - 11:00 PM",
                "6:00 AM - 11:00 PM",
                "6:00 AM - 11:00 PM",
                "8:00 AM - 8:00 PM",
                "8:00 AM - 8:00 PM"
              ].map((time, index) => (
                <motion.h3 
                  ref={gymScheduleRef}
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {time}
                </motion.h3>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};