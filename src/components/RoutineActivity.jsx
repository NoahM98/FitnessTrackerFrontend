import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { deleteRoutineActivity, updateRoutineActivity } from "../api/ajax-helpers";

const RoutineActivity = ({ token, activity, routine, currentUser, activities, setActivities }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [routineActivityId, setRoutineActivityId] = useState(activity.routineActivityId);

    const handleDelete = async () => {
        const result = await deleteRoutineActivity({ token, routineActivityId })
        if (result.id) {
            alert("You've successfull deleted your activity");
            const newActivities = activities.filter((el) => {
                return el.routineActivityId !== routineActivityId;
            })
            setActivities(newActivities);
        } else {
            alert("ERROR: " + result.message);
        }
    }

    const handleUpdate = async () => {
        alert("Trying to update activity...");
    }

    return (
        <>
            {
                activities ?
                    <Card>
                        <Card.Body>
                            <Card.Title>{activity.name}</Card.Title>
                            <Card.Text>{activity.description}</Card.Text>
                            <Card.Text>Count: {activity.count}</Card.Text>
                            <Card.Text>Duration: {activity.duration}</Card.Text>
                            {
                                routine.creatorName === currentUser.username ?
                                    <>
                                        <Button className="m-1"
                                            variant="primary"
                                            onClick={(event) => {
                                                handleUpdate();
                                            }}>
                                            Update
                                        </Button>
                                        <Button className="m-1"
                                            variant="danger"
                                            onClick={(event) => {
                                                handleDelete();
                                            }}>
                                            Delete
                                        </Button>
                                    </> : null
                            }
                        </Card.Body>
                    </Card>
                    : null
            }
        </>
    )
}

export default RoutineActivity;
