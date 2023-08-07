import React from "react";

const Routines = ({ allRoutines }) => {
    return (
        <div id="routines-page">
            <h1>Routines Page!</h1>
            {
                allRoutines.map((routine, index) => {
                    return (
                        <div key={routine.id}>
                            <h3>Name: {routine.name}</h3>
                            <h4>Creator: {routine.creatorName}</h4>
                            <p>ID: {routine.id}</p>
                            <p>Index: {index + 1}</p>
                            <p>Goal: {routine.goal}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Routines;
