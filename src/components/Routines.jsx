import React from "react";
import RoutineCard from "./RoutineCard";
import CreateRoutine from "./CreateRoutine";

const Routines = ({ allRoutines, token }) => {
    return (
        <div id="routines-page">
            <h1>Routines: </h1>
            {token ? <CreateRoutine /> : null}
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
