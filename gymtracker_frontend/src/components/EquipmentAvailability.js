import React, {useState} from "react";

const machines = [
    {name: "Chest Press", muscles: ["chest", "front delts", "triceps"]},
    {name: "Chest Fly", muscles: ["chest", "front delts"]},
    {name: "Lateral Raise", muscles: ["side delts"]},
    {name: "Lat Pulldown", muscles: ["lats", "biceps"]},
    {name: "Wide Row", muscles: ["lats", "traps", "rear delts", "biceps"]},
    {name: "Preacher Curl", muscles: ["biceps"]},
    {name: "Tricep Pushdown", muscles: ["triceps"]},
    {name: "Leg Press", muscles: ["quads", "glutes", "hamstrings"]},
    {name: "Leg Extension", muscles: ["quads"]},
    {name: "Leg Curl", muscles: ["hamstrings"]},
]

export const EquipmentAvailability = () => {
    const [query, setQuery] = useState("");

    const filter = machines.filter((machine) =>
        machine.name.toLowerCase().includes(query.toLowerCase()) ||
        machine.muscles.some((muscle) =>
            muscle.toLowerCase().includes(query.toLowerCase())
        )
    )

    const onChange = e => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    return (
        <div className="equipment-page">
            <div className="equipment-container">
                <div className="equipment-header">
                    <h1>Equipment List</h1>
                </div>

                <div className="input-wrapper">
                    <input type="text" placeholder="Search machines or muscle groups..." value={query} onChange={onChange}/>
                </div>

                <div className="machines-list">
                    {filter.length > 0 && (
                        filter.map((machine, index) => (
                            <div className="machine" key={index} style={{opacity: 0, animationDelay: `${index * 0.15}s`}}>
                                <h2>{machine.name}</h2>
                                <h5>Muscles targeted: {machine.muscles.join(", ")}</h5>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}