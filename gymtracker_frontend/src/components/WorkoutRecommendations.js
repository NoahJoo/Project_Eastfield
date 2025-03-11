import React, { useState } from "react";
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
                    

                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
                      <rect x="3" y="8" width="2" height="8"/>
                      <rect x="1" y="9" width="2" height="6"/>

                      <rect x="18" y="8" width="2" height="8"/>
                      <rect x="20" y="9" width="2" height="6"/>

                      <line x1="5" y1="12" x2="18" y2="12" strokeWidth="1.5"/>
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