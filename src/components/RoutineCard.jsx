import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { deleteRoutine, updateRoutine } from "../api/ajax-helpers";

const RoutineCard = ({ routine, myRoutines, setMyRoutines, allRoutines, setAllRoutines, token, currentUser }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        alert("Trying to update!");
    }

    const handleDelete = async () => {
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
        }
    }

    return (
        <Card bg="light" className="mb-2" border="primary">
            <Card.Header>{routine.creatorName}</Card.Header>
            <Card.Body>
                <Card.Title>{routine.name}</Card.Title>
                <Card.Text>{routine.goal}</Card.Text>
                {
                    routine.activities && routine.activities.length ?
                        <>
                            <Card.Text><strong>Activities:</strong></Card.Text>
                            {routine.activities.map((activity, index) => {
                                return (
                                    <Card key={activity.id}>
                                        <Card.Body>
                                            <Card.Title>{activity.name}</Card.Title>
                                            <Card.Text>{activity.description}</Card.Text>
                                            <Card.Text>Count: {activity.count}</Card.Text>
                                            <Card.Text>Duration: {activity.duration}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </> : null
                }
                {
                    routine.creatorName === currentUser.username ?
                        <>
                            <Card.Text><strong>{routine.isPublic ? "Public" : "Private"}</strong></Card.Text>
                            <Button className="m-1" variant="primary" onClick={() => {
                                setIsUpdating(!isUpdating);
                            }}>Update</Button>
                            <Button className="m-1" variant="danger" onClick={() => {
                                handleDelete();
                            }}>Delete</Button>
                        </>
                        : null
                }
                {
                    isUpdating ?
                        <Form className="m-4 p-3 border border-3 border-primary rounded text-bg-light">
                            <h4>Update Routine:</h4>
                            <Form.Group>
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control
                                    id="name"
                                    type="text"
                                    required
                                    // value={}
                                    placeholder="name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="description">Description</Form.Label>
                                <Form.Control
                                    id="description"
                                    type="text"
                                    required
                                    // value={}
                                    placeholder="name" />
                            </Form.Group>
                            <Button className="m-2" variant="primary" type="submit">Submit Update</Button>
                        </Form>
                        : null
                }
            </Card.Body>
        </Card>
    )
}

export default RoutineCard;
