import React, {useState} from "react";

export const WorkoutRecommendations = () => {
    const [selectedMuscles, setSelectedMuscles] = useState([]);
    const [interactedMuscles, setInteractedMuscles] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleClick = (muscle) => {
        if (selectedMuscles.includes(muscle)) {
            setSelectedMuscles(selectedMuscles.filter((m) => m !== muscle));

        } else {
            setSelectedMuscles([...selectedMuscles, muscle]);
        }

        setInteractedMuscles([...interactedMuscles, muscle])
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
                        <div className={`muscle-grid ${isGenerating ? "disabled" : ""}`}>
                            <div className="push-group">
                                <h1>Push</h1>
                                
                                <div className="muscle" onClick={() => handleClick("chest")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("chest") ? 
                                        "selected" : interactedMuscles.includes("chest") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Chest</h3>
                                </div>

                                <div className="muscle" onClick={() => handleClick("shoulders")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("shoulders") ? 
                                        "selected" : interactedMuscles.includes("shoulders") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Shoulders</h3>
                                </div>

                                <div className="muscle" onClick={() => handleClick("triceps")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("triceps") ? 
                                        "selected" : interactedMuscles.includes("triceps") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Triceps</h3>
                                </div>
                            </div>

                            <div className="pull-group">
                                <h1>Pull</h1>

                                <div className="muscle" onClick={() => handleClick("back")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("back") ? 
                                        "selected" : interactedMuscles.includes("back") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Back</h3>
                                </div>

                                <div className="muscle" onClick={() => handleClick("rear delts")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("rear delts") ? 
                                        "selected" : interactedMuscles.includes("rear delts") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Rear delts</h3>
                                </div>
                                
                                <div className="muscle" onClick={() => handleClick("biceps")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("biceps") ? 
                                        "selected" : interactedMuscles.includes("biceps") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Biceps</h3>
                                </div>
                            </div>

                            <div className="legs-group">
                                <h1>Legs</h1>

                                <div className="muscle" onClick={() => handleClick("quads")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("quads") ? 
                                        "selected" : interactedMuscles.includes("quads") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Quads</h3>
                                </div>
                                
                                <div className="muscle" onClick={() => handleClick("hamstrings")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("hamstrings") ? 
                                        "selected" : interactedMuscles.includes("hamstrings") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Hamstrings</h3>
                                </div>
                                
                                <div className="muscle" onClick={() => handleClick("glutes")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("glutes") ? 
                                        "selected" : interactedMuscles.includes("glutes") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Glutes</h3>
                                </div>
                                
                                <div className="muscle" onClick={() => handleClick("calves")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("calves") ? 
                                        "selected" : interactedMuscles.includes("calves") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Calves</h3>
                                </div>
                            </div>

                            <div className="abs-group">
                                <h1>Abs</h1>

                                <div className="muscle" onClick={() => handleClick("upper abs")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("upper abs") ? 
                                        "selected" : interactedMuscles.includes("upper abs") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Upper abs</h3>
                                </div>
                                
                                <div className="muscle" onClick={() => handleClick("lower abs")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("lower abs") ? 
                                        "selected" : interactedMuscles.includes("lower abs") ? "unselected" : ""}`}
                                    ></div>
                                    <h3>Lower abs</h3>
                                </div>
                                
                                <div className="muscle" onClick={() => handleClick("obliques")}>
                                    <div 
                                    className={`select-muscle ${selectedMuscles.includes("obliques") ? 
                                        "selected" : interactedMuscles.includes("obliques") ? "unselected" : ""}`}
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
                        <h1>{isGenerating ? "Creating Workout Plan..." : ""}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}