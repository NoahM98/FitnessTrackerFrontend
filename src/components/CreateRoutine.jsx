import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateRoutine = () => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    return (
        <Form className="form m-4 p-3 border border-3 border-primary rounded text-bg-light"
            onSubmit={(event) => {
                event.preventDefault();
            }}>
            <h2>Create Routine</h2>
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
                    type="checkbox"
                    onChange={(event) => {
                        setIsPublic(!isPublic);
                    }}
                />
            </Form.Group>
        </Form>
    )
}

export default CreateRoutine;
