import React from "react";
import RoutineCard from "./RoutineCard";

const MyRoutines = ({ allRoutines, setAllRoutines, myRoutines, setMyRoutines, token, currentUser }) => {
    return (
        <div id="my-routines-page">
            <h1>My Routines:</h1>
            <div className="routines-activities">
                {
                    myRoutines.map((routine) => {
                        return <RoutineCard key={routine.id}
                            routine={routine}
                            myRoutines={myRoutines}
                            setMyRoutines={setMyRoutines}
                            allRoutines={allRoutines}
                            setAllRoutines={setAllRoutines}
                            token={token}
                            currentUser={currentUser} />
                    })
                }
            </div>
        </div>
    )
}

export default MyRoutines;
