import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postRoutine } from "../api/ajax-helpers";

const CreateRoutine = ({ token, allRoutines, setAllRoutines, myRoutines, setMyRoutines, currentUser }) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = async () => {
        const result = await postRoutine({ token, name, goal, isPublic });
        if (result.id) {
            result.creatorName = currentUser.username;
            alert("You successfull created a routine!");
            setAllRoutines([result, ...allRoutines]);
            setMyRoutines([result, ...myRoutines]);
            setName('');
            setGoal('');
            setIsPublic(true);
        } else {
            alert("Failed to create routine");
        }
    }

    return (
        <Form className="form m-4 p-3 border border-3 border-primary rounded text-bg-light"
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}>
            <h2>Create New Routine:</h2>
            <Form.Group>
                <Form.Label html="name">Name</Form.Label>
                <Form.Control
                    id="name"
                    type="text"
                    required
                    value={name}
                    placeholder="name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label html="goal">Goal</Form.Label>
                <Form.Control
                    id="goal"
                    type="text"
                    required
                    value={goal}
                    placeholder="goal"
                    onChange={(event) => {
                        setGoal(event.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label html="isPublic">Public</Form.Label>
                <Form.Check
                    id="isPublic"
                    checked={isPublic}
                    onChange={(event) => {
                        setIsPublic(!isPublic);
                    }}
                />
            </Form.Group>
            <Button className="m-2" variant="primary" type="submit">Create</Button>
        </Form>
    )
}

export default CreateRoutine;
