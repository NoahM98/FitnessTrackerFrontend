import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postActivity } from "../api/ajax-helpers";

const CreateActivity = ({ allActivities, setAllActivities, token }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        const result = await postActivity({ token, name, description });
        if (result.id) {
            alert("You successfully created an activity!");
            setAllActivities([result, ...allActivities]);
            setName('');
            setDescription('');
        } else {
            alert("ERROR: " + result.error);
        }
    }

    return (
        <Form className="form m-4 p-3 border border-3 border-primary rounded text-bg-light"
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}>
            <h2>Create New Activity:</h2>
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
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    id="description"
                    type="text"
                    required
                    value={description}
                    placeholder="description"
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }} />
            </Form.Group>
            <Button className="m-2" variant="primary" type="submit">Create</Button>
        </Form>
    )
}

export default CreateActivity;
