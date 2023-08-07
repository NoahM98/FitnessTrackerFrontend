import React from "react";

const Activities = ({ allActivities }) => {
    return (
        <div id="activities-page">
            <h1>Acitivies Page!</h1>
            {
                allActivities.map((activity, index) => {
                    return (
                        <div key={activity.id}>
                            <h3>Name: {activity.name}</h3>
                            <p>Index: {index + 1}</p>
                            <p>Description: {activity.description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Activities;
