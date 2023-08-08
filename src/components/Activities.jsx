import React from "react";
import ActivityCard from "./ActivityCard";

const Activities = ({ allActivities }) => {
    return (
        <div id="activities-page">
            <h1>Acitivies: </h1>
            <div className="routines-activities">
                {
                    allActivities.map((activity, index) => {
                        return (
                            <ActivityCard key={activity.id} activity={activity} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Activities;
