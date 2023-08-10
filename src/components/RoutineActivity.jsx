import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { deleteRoutineActivity, updateRoutineActivity } from "../api/ajax-helpers";

const RoutineActivity = ({ token, activity, routine, currentUser, activities, setActivities, myRoutines, setMyRoutines, allRoutines, setAllRoutines }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(activity.count);
    const [duration, setDuration] = useState(activity.duration);

    const handleDelete = async () => {
        setIsLoading(true);
        const routineActivityId = activity.routineActivityId;
        const result = await deleteRoutineActivity({ token, routineActivityId })
        if (result.id) {
            alert("You've successfull deleted your activity");
            const newActivities = activities.filter((el) => {
                return el.routineActivityId !== routineActivityId;
            })
            const newAllRoutines = allRoutines.filter((el) => {
                return el.id !== routine.id;
            })
            const newMyRoutines = myRoutines.filter((el) => {
                return el.id !== routine.id;
            })
            routine.activities = newActivities;
            setActivities(newActivities);
            setAllRoutines([routine, ...newAllRoutines]);
            setMyRoutines([routine, ...newMyRoutines]);
        } else {
            alert("ERROR: " + result.message);
        }
        setIsLoading(false);
    }

    const handleUpdate = async () => {
        setIsLoading(true);
        const routineActivityId = activity.routineActivityId;
        const result = await updateRoutineActivity({ token, routineActivityId, count, duration });
        if (result.id) {
            alert("You've successfully updated our activity!");
            const newActivities = activities.filter((el => {
                return el.routineActivityId !== routineActivityId;
            }));
            const newAllRoutines = allRoutines.filter((el) => {
                return el.id !== routine.id;
            });
            const newMyRoutines = myRoutines.filter((el) => {
                return el.id !== routine.id;
            });
            result.name = activity.name;
            result.description = activity.description;
            result.routineActivityId = result.id;
            result.id = result.activityId;
            routine.activities = [result, ...newActivities];
            setActivities([result, ...newActivities]);
            setAllRoutines([routine, ...newAllRoutines]);
            setMyRoutines([routine, ...newMyRoutines]);
            setIsUpdating(false);
        } else {
            alert("ERROR: " + result.message);
        }
        setIsLoading(false);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{activity.name}</Card.Title>
                <Card.Text>{activity.description}</Card.Text>
                <Card.Text>Count: {activity.count}</Card.Text>
                <Card.Text>Duration: {activity.duration}</Card.Text>
                {
                    routine.creatorName === currentUser.username && token ?
                        <>
                            <Button className="m-1"
                                variant="primary"
                                onClick={(event) => {
                                    setIsUpdating(!isUpdating);
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
                            {
                                isLoading ?
                                    <Card.Text>LOADING...</Card.Text>
                                    : null
                            }
                        </> : null

                }
                {
                    isUpdating ?
                        <Form className="m-4 p-3 border border-3 border-primary rounded text-bg-light"
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleUpdate();
                            }}>
                            <h4>Update Activity:</h4>
                            <Form.Group>
                                <Form.Label htmlFor="count">Count</Form.Label>
                                <Form.Control
                                    id="count"
                                    type="text"
                                    required
                                    value={count}
                                    placeholder="count"
                                    onChange={(event) => {
                                        setCount(event.target.value);
                                    }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="duration">Duration</Form.Label>
                                <Form.Control
                                    id="duration"
                                    type="text"
                                    required
                                    value={duration}
                                    placeholder="duration"
                                    onChange={(event) => {
                                        setDuration(event.target.value);
                                    }} />
                            </Form.Group>
                            <Button className="m-2" variant="primary" type="submit">Submit Update</Button>
                        </Form>
                        : null
                }
            </Card.Body>
        </Card>
    )
}

export default RoutineActivity;
