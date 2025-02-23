import React, {useState} from "react";

const machines = [
    {name: "Chest Press", muscles: ["chest", "shoulders (front delts)", "triceps"]},
    {name: "Chest Fly", muscles: ["chest", "shoulders (front delts)"]},
    {name: "Shoulder Press", muscles: ["shoulders (front delts, side delts)"]},
    {name: "Lateral Raise", muscles: ["shoulders (side delts)"]},
    {name: "Lat Pulldown", muscles: ["back (lats)", "biceps"]},
    {name: "Row", muscles: ["back (lats, traps)", "shoulders (rear delts)"]},
    {name: "Back Extension", muscles: ["back (erector spinae)"]},
    {name: "Preacher Curl", muscles: ["biceps"]},
    {name: "Tricep Extension", muscles: ["triceps"]},
    {name: "Leg Press", muscles: ["legs (quads, hamstrings, glutes)"]},
    {name: "Leg Extension", muscles: ["legs (quads)"]},
    {name: "Leg Curl", muscles: ["legs (hamstrings)"]},
    {name: "Hip Abductor", muscles: ["legs (glutes)"]},
    {name: "Hip and Glute", muscles: ["legs (glutes)"]},
    {name: "Calf Raise", muscles: ["calves"]},
    {name: "Abdominal Crunch", muscles: ["abs"]}
    
]

export const EquipmentAvailability = () => {
    const [query, setQuery] = useState("");

    const filteredMachines = machines.filter((machine) =>
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
                    {filteredMachines.length > 0 && (
                        filteredMachines.map((machine, index) => (
                            <div className="machine" key={index} style={{animationDelay: `${index * 0.1}s`}}>
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