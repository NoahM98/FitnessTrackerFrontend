import React from "react";
import RoutineCard from "./RoutineCard";

const Routines = ({ allRoutines }) => {
    return (
        <div id="routines-page">
            <h1>Routines: </h1>
            <div className="routines-activities">
                {
                    allRoutines.map((routine, index) => {
                        return (
                            <RoutineCard key={routine.id} routine={routine} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Routines;
