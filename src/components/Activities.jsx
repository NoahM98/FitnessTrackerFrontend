import React from "react";
import ActivityCard from "./ActivityCard";
import CreateActivity from "./CreateActivity";

const Activities = ({ allActivities, setAllActivities, token }) => {
    return (
        <div id="activities-page">
            <h1>Acitivies: </h1>
            {
                token ?
                    <CreateActivity
                        allActivities={allActivities}
                        setAllActivities={setAllActivities}
                        token={token} />
                    : null
            }
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
