import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { deleteRoutine, updateRoutine, addActivityToRoutine } from "../api/ajax-helpers";
import RoutineActivity from "./RoutineActivity";

const RoutineCard = ({ routine, myRoutines, setMyRoutines, allRoutines, setAllRoutines, token, currentUser, allActivities }) => {
    const [activities, setActivities] = useState(routine.activities);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingActivity, setIsAddingActivity] = useState(false);
    const [name, setName] = useState(routine.name);
    const [goal, setGoal] = useState(routine.goal);
    const [isPublic, setIsPublic] = useState(routine.isPublic);
    const [activityId, setActivityId] = useState(null);
    const [count, setCount] = useState(null);
    const [duration, setDuration] = useState(null);

    const handleUpdate = async () => {
        setIsLoading(true);
        const routineId = routine.id;
        const result = await updateRoutine({ token, routineId, name, goal, isPublic });
        if (result.id) {
            alert("You've successfully updated your routine");
            result.creatorName = currentUser.username;
            result.activities = activities;
            const newAllRoutines = allRoutines.filter((el) => {
                return el.id !== routine.id;
            })
            const newMyRoutines = myRoutines.filter((el) => {
                return el.id !== routine.id;
            })
            setAllRoutines([result, ...newAllRoutines]);
            setMyRoutines([result, ...newMyRoutines]);
            setIsUpdating(false);
        } else {
            alert("ERROR: " + result.error);
        }
        setIsLoading(false);
    }

    const handleDelete = async () => {
        setIsLoading(true);
        const routineId = routine.id;
        const result = await deleteRoutine({ token, routineId });
        if (result.id) {
            alert("You've successfully deleted your routine");
            const newAllRoutines = allRoutines.filter((el) => {
                return el.id !== routine.id;
            })
            const newMyRoutines = myRoutines.filter((el) => {
                return el.id !== routine.id;
            })
            setAllRoutines(newAllRoutines);
            setMyRoutines(newMyRoutines);
        } else {
            alert("ERROR: " + result.error);
        }
        setIsLoading(false);
    }

    const handleAddActivity = async () => {
        setIsLoading(true);
        const routineId = routine.id;
        const result = await addActivityToRoutine({ routineId, activityId, count, duration });
        if (result.id) {
            alert("You successfully added activity to routine!");
            let newActivity = allActivities.filter((el) => {
                return el.id == activityId;
            })
            console.log(newActivity);
            newActivity[0].count = count;
            newActivity[0].duration = duration;
            newActivity[0].routineId = routineId;
            newActivity[0].routineActivityId = result.id;
            console.log(newActivity);
            if (activities) {
                routine.activities = [...activities, ...newActivity];
                setActivities([...activities, ...newActivity]);
                const newAllRoutines = allRoutines.filter((el) => {
                    return el.id !== routine.id;
                })
                const newMyRoutines = myRoutines.filter((el) => {
                    return el.id !== routine.id;
                })
                setAllRoutines([routine, ...newAllRoutines]);
                setMyRoutines([routine, ...newMyRoutines]);
            } else {
                routine.activities = [...newActivity];
                setActivities([...newActivity]);
                const newAllRoutines = allRoutines.filter((el) => {
                    return el.id !== routine.id;
                })
                const newMyRoutines = myRoutines.filter((el) => {
                    return el.id !== routine.id;
                })
                setAllRoutines([routine, ...newAllRoutines]);
                setMyRoutines([routine, ...newMyRoutines]);
            }
            setActivityId(null);
            setCount(null);
            setDuration(null);
            setIsAddingActivity(false);
        } else {
            alert("ERROR: " + result.error)
        }
        setIsLoading(false);
    }

    return (
        <Card bg="light" className="mb-2" border="primary">
            <Card.Header>{routine.creatorName}</Card.Header>
            <Card.Body>
                <Card.Title>{routine.name}</Card.Title>
                <Card.Text>{routine.goal}</Card.Text>
                {activities ?
                    <>
                        <Card.Text><strong>Activities:</strong></Card.Text>
                        {activities.map((activity, index) => {
                            return (
                                <RoutineActivity key={activity.id}
                                    token={token}
                                    activity={activity}
                                    routine={routine}
                                    currentUser={currentUser}
                                    activities={activities}
                                    setActivities={setActivities}
                                    myRoutines={myRoutines}
                                    setMyRoutines={setMyRoutines}
                                    allRoutines={allRoutines}
                                    setAllRoutines={setAllRoutines} />
                            )
                        })}
                    </>
                    : null}
                {
                    routine.creatorName === currentUser.username && token ?
                        <>
                            <Card.Text><strong>{routine.isPublic ? "Public" : "Private"}</strong></Card.Text>
                            <Button className="m-1" variant="primary" onClick={() => {
                                setIsAddingActivity(!isAddingActivity);
                                setIsUpdating(false)
                            }}>Add Activity</Button>
                            <Button className="m-1" variant="primary" onClick={() => {
                                setIsUpdating(!isUpdating);
                                setIsAddingActivity(false)
                            }}>Update</Button>
                            <Button className="m-1" variant="danger" onClick={() => {
                                handleDelete();
                            }}>Delete</Button>
                            {
                                isLoading ?
                                    <Card.Text>LOADING...</Card.Text>
                                    : null
                            }
                        </>
                        : null
                }
                {
                    isUpdating ?
                        <Form className="m-4 p-3 border border-3 border-primary rounded text-bg-light"
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleUpdate();
                            }}>
                            <h4>Update Routine:</h4>
                            <Form.Group>
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control
                                    id="name"
                                    type="text"
                                    required
                                    value={name}
                                    placeholder="name"
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="goal">Goal</Form.Label>
                                <Form.Control
                                    id="goal"
                                    type="text"
                                    required
                                    value={goal}
                                    placeholder="goal"
                                    onChange={(event) => {
                                        setGoal(event.target.value);
                                    }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label html="isPublic">Public</Form.Label>
                                <Form.Check
                                    id="isPublic"
                                    type="checkbox"
                                    checked={isPublic}
                                    onChange={(event) => {
                                        setIsPublic(!isPublic);
                                    }} />
                            </Form.Group>
                            <Button className="m-2" variant="primary" type="submit">Submit Update</Button>
                        </Form>
                        : null
                }
                {
                    isAddingActivity ?
                        <Form className="m-4 p-3 border border-3 border-primary rounded text-bg-light"
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleAddActivity();
                            }}>
                            <h4>Add Activity to Routine:</h4>
                            <Form.Group>
                                <Form.Label htmlFor="activity">Select Activity</Form.Label>
                                <Form.Select id="activity" required onChange={(event) => {
                                    setActivityId(event.target.value);
                                }}>
                                    <option value={""}>Choose an activity</option>
                                    {allActivities.map((activity) => {
                                        return <option key={activity.id}
                                            value={activity.id}>{activity.name}</option>
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="count">Count</Form.Label>
                                <Form.Control
                                    id="count"
                                    type="number"
                                    required
                                    placeholder="count"
                                    onChange={(event) => {
                                        setCount(event.target.value);
                                    }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="duration">Duration</Form.Label>
                                <Form.Control
                                    id="duration"
                                    type="number"
                                    required
                                    placeholder="duration"
                                    onChange={(event) => {
                                        setDuration(event.target.value);
                                    }} />
                            </Form.Group>
                            <Button className="m-2" variant="primary" type="submit">Submit Activity</Button>
                        </Form>
                        : null
                }
            </Card.Body>
        </Card>
    )
}

export default RoutineCard;
