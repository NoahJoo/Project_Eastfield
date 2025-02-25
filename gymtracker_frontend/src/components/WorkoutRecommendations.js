import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WorkoutRecommendations = () => {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [interactedMuscles, setInteractedMuscles] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const muscleGroups = {
    push: [
      { id: "chest", name: "Chest" },
      { id: "shoulders", name: "Shoulders" },
      { id: "triceps", name: "Triceps" },
    ],
    pull: [
      { id: "back", name: "Back" },
      { id: "rear delts", name: "Rear Delts" },
      { id: "biceps", name: "Biceps" },
    ],
    legs: [
      { id: "quads", name: "Quads" },
      { id: "hamstrings", name: "Hamstrings" },
      { id: "glutes", name: "Glutes" },
      { id: "calves", name: "Calves" },
    ],
    abs: [
      { id: "upper abs", name: "Upper Abs" },
      { id: "lower abs", name: "Lower Abs" },
      { id: "obliques", name: "Obliques" },
    ],
  };

  const handleClick = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(selectedMuscles.filter((m) => m !== muscle));
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]);
    }

    setInteractedMuscles([...new Set([...interactedMuscles, muscle])]);
  };

  const handleButtonClick = async () => {
    if (!isGenerating && selectedMuscles.length > 0) {
      setIsGenerating(true);
      setIsLoading(true);
      setWorkoutPlan("");
      
      try {
        const response = await fetch("http://127.0.0.1:8000/api/workout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ muscles: selectedMuscles }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Simulate loading for smoother UX
          setTimeout(() => {
            setWorkoutPlan(data.plan);
            setIsLoading(false);
            console.log("Successfully generated workout plan");
          }, 500);
        } else {
          setWorkoutPlan("An error occurred while generating your workout plan. Please try again.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setWorkoutPlan("Network error. Please check your connection and try again.");
        setIsLoading(false);
      }
      
      setIsGenerating(false);
    } else {
      setWorkoutPlan("");
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  const renderMuscleGroups = () => {
    return Object.entries(muscleGroups).map(([group, muscles]) => (
      <motion.div 
        key={group}
        className={`muscle-group ${group}-group`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: group === "push" ? 0 : group === "pull" ? 0.1 : group === "legs" ? 0.2 : 0.3 }}
      >
        <h2 className="group-title">{group.charAt(0).toUpperCase() + group.slice(1)}</h2>
        <div className="muscles-container">
          {muscles.map((muscle) => (
            <motion.div
              key={muscle.id}
              className={`muscle-item ${selectedMuscles.includes(muscle.id) ? "active" : ""}`}
              onClick={() => handleClick(muscle.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="muscle-selector">
                <div 
                  className={`select-circle ${
                    selectedMuscles.includes(muscle.id)
                      ? "selected"
                      : interactedMuscles.includes(muscle.id)
                      ? "unselected"
                      : ""
                  }`}
                >
                  {selectedMuscles.includes(muscle.id) && (
                    <motion.div 
                      className="checkmark"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    />
                  )}
                </div>
                <span className="muscle-name">{muscle.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    ));
  };

  const renderLoadingIndicator = () => {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-circle"></div>
        </div>
        <h3 className="loading-text">Creating your personalized workout plan...</h3>
      </div>
    );
  };

  return (
    <div className="workout-recommendations-page">
      <div className="workout-container">
        <motion.div 
          className="workout-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="main-title">Workout Recommendations</h1>
          <p className="subtitle">Select the muscle groups you want to target</p>
        </motion.div>

        <div className="workout-content">
          <div className="selection-area">
            <div className={`muscle-groups-grid ${isGenerating ? "disabled" : ""}`}>
              {renderMuscleGroups()}
            </div>

            <motion.button
              className={`generate-button ${selectedMuscles.length === 0 ? "disabled" : ""}`}
              onClick={handleButtonClick}
              disabled={isGenerating || selectedMuscles.length === 0}
              whileHover={selectedMuscles.length > 0 ? { scale: 1.03, boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)" } : {}}
              whileTap={selectedMuscles.length > 0 ? { scale: 0.97 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {isGenerating ? "Generating..." : `Generate Workout ${selectedMuscles.length > 0 ? `(${selectedMuscles.length})` : ""}`}
            </motion.button>
          </div>

          <motion.div 
            className="results-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderLoadingIndicator()}
                </motion.div>
              ) : workoutPlan ? (
                <motion.div
                  key="results"
                  className="workout-plan-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="results-title">Your Personalized Workout Plan</h2>
                  <div className="workout-plan-content">
                    {workoutPlan.split('\n\n').map((paragraph, index) => (
                      <motion.p
                        key={index}
                        className="workout-paragraph"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="empty-illustration">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 17.9999C19.2091 17.9999 21 16.209 21 13.9999C21 11.7908 19.2091 9.99994 17 9.99994C14.7909 9.99994 13 11.7908 13 13.9999C13 16.209 14.7909 17.9999 17 17.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 14V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 13C17.2761 13 17.5 12.7761 17.5 12.5C17.5 12.2239 17.2761 12 17 12C16.7239 12 16.5 12.2239 16.5 12.5C16.5 12.7761 16.7239 13 17 13Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
                      <path d="M7 16.9999C9.20914 16.9999 11 15.2091 11 12.9999C11 10.7908 9.20914 8.99994 7 8.99994C4.79086 8.99994 3 10.7908 3 12.9999C3 15.2091 4.79086 16.9999 7 16.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 13V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 12C7.27614 12 7.5 11.7761 7.5 11.5C7.5 11.2239 7.27614 11 7 11C6.72386 11 6.5 11.2239 6.5 11.5C6.5 11.7761 6.72386 12 7 12Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
                      <path d="M12 7V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 21V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3L8 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="empty-title">Select muscles to get started</h3>
                  <p className="empty-description">Choose the muscle groups you want to target and click the "Generate Workout" button</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};