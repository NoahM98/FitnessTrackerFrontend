import React from "react";

const Routines = ({ allRoutines }) => {
    return (
        <div>
            <h1>Routines Page!</h1>
            {
                allRoutines.map((routine) => {
                    return (
                        <div key={routine.id}>
                            <h3>{routine.name}</h3>
                            <h4>{routine.creatorName}</h4>
                            <p>{routine.goal}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Routines;
