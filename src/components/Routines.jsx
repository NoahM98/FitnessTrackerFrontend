import React from "react";
import RoutineCard from "./RoutineCard";
import CreateRoutine from "./CreateRoutine";

const Routines = ({ allRoutines, setAllRoutines, myRoutines, setMyRoutines, token, currentUser, allActivities }) => {
    return (
        <div id="routines-page">
            <h1>Routines: </h1>
            {token ?
                <CreateRoutine token={token}
                    allRoutines={allRoutines}
                    setAllRoutines={setAllRoutines}
                    myRoutines={myRoutines}
                    setMyRoutines={setMyRoutines}
                    currentUser={currentUser} />
                : null}
            <div className="routines-activities">
                {
                    allRoutines.map((routine, index) => {
                        return (
                            <RoutineCard key={routine.id}
                                routine={routine}
                                myRoutines={myRoutines}
                                setMyRoutines={setMyRoutines}
                                allRoutines={allRoutines}
                                setAllRoutines={setAllRoutines}
                                token={token}
                                currentUser={currentUser}
                                allActivities={allActivities} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Routines;
