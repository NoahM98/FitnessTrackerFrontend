import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const ActivityCard = ({ activity }) => {
    return (
        <Card bg="light" className="mb-2" border="primary">
            <Card.Body>
                <Card.Title>{activity.name}:</Card.Title>
                <Card.Text>{activity.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ActivityCard;
