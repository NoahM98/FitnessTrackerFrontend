import React from "react";
import ActivityCard from "./ActivityCard";
import CreateActivity from "./CreateActivity";

const Activities = ({ allActivities }) => {
    return (
        <div id="activities-page">
            <h1>Acitivies: </h1>
            <CreateActivity />
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
