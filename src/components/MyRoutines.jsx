import React from "react";
import RoutineCard from "./RoutineCard";
import CreateRoutine from "./CreateRoutine";

const MyRoutines = ({ allRoutines, setAllRoutines, myRoutines, setMyRoutines, token, currentUser, allActivities }) => {
    return (
        <div id="my-routines-page">
            <h1>My Routines:</h1>
            <CreateRoutine token={token}
                allRoutines={allRoutines}
                setAllRoutines={setAllRoutines}
                myRoutines={myRoutines}
                setMyRoutines={setMyRoutines}
                currentUser={currentUser} />
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
                            currentUser={currentUser}
                            allActivities={allActivities} />
                    })
                }
            </div>
        </div>
    )
}

export default MyRoutines;
