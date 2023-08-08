import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const RoutineCard = ({ routine }) => {
    const [routineActivities, setRoutineActivities] = useState([]);

    useEffect(() => {
        // setRoutineActivities(routine.activities);
    })

    return (
        <Card bg="light" className="mb-2" border="primary">
            <Card.Header>{routine.creatorName}</Card.Header>
            <Card.Body>
                <Card.Title>{routine.name}</Card.Title>
                <Card.Text>{routine.goal}</Card.Text>
                {
                    routine.activities ?
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
            </Card.Body>
        </Card>
    )
}

export default RoutineCard;
