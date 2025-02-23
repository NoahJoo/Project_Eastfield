import React, {useState} from "react";

export const WorkoutRecommendations = () => {
    const [selectedMuscles, setSelectedMuscles] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleClick = (muscle) => {
        if (selectedMuscles.includes(muscle)) {
            setSelectedMuscles(selectedMuscles.filter((m) => m !== muscle));

        } else {
            setSelectedMuscles([...selectedMuscles, muscle]);
        }
    }

    const handleButtonClick = () => {
        setIsGenerating(!isGenerating);
    }

    return (
        <div className="workout-page">
            <div className="workout-container">
                <div className="workout-header">
                    <h1>Workout Recommendations</h1>
                </div>

                <div className="workout-content">
                    <div className="muscle-groups">
                        <div className="muscle-grid">
                            <div className="push-group">
                                <h1>Push</h1>
                                
                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("chest")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("chest") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Chest</h3>
                                </div>

                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("shoulders")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("shoulders") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Shoulders</h3>
                                </div>

                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("triceps")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("triceps") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Triceps</h3>
                                </div>
                            </div>

                            <div className="pull-group">
                                <h1>Pull</h1>

                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("back")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("back") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Back</h3>
                                </div>

                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("rear delts")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("rear delts") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Rear delts</h3>
                                </div>
                                
                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("biceps")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("biceps") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Biceps</h3>
                                </div>
                            </div>

                            <div className="legs-group">
                                <h1>Legs</h1>

                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("quads")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("quads") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Quads</h3>
                                </div>
                                
                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("hamstrings")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("hamstrings") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Hamstrings</h3>
                                </div>
                                
                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("glutes")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("glutes") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Glutes</h3>
                                </div>
                                
                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("calves")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("calves") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Calves</h3>
                                </div>
                            </div>

                            <div className="abs-group">
                                <h1>Abs</h1>

                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("upper abs")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("upper abs") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Upper abs</h3>
                                </div>
                                
                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("lower abs")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("lower abs") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Lower abs</h3>
                                </div>
                                
                                <div className={`muscle ${isGenerating ? "disabled" : ""}`} onClick={() => handleClick("obliques")}>
                                    <div className={`select-muscle 
                                        ${selectedMuscles.includes("obliques") ? "selected" : "unselected"}`}
                                    ></div>
                                    <h3>Obliques</h3>
                                </div>
                            </div>

                        </div>

                        <button 
                        className="submit-btn" 
                        onClick={handleButtonClick} 
                        disabled={!isGenerating && selectedMuscles.length === 0}>
                            <span className="front">{isGenerating ? "Cancel" : "Generate Workouts"}</span>
                        </button>
                    </div>

                    <div className="recommendations">
                        <h1>{isGenerating ? "Creating workout plan..." : ""}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}