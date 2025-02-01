import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditScheduleModal = ({ show, handleClose, schedule, handleUpdateSchedule }) => {
    const [updatedSchedule, setUpdatedSchedule] = useState(schedule || {});

    useEffect(() => {
        if (schedule) {
            setUpdatedSchedule(schedule);
        }
    }, [schedule]);

    const handleChange = (e) => {
        setUpdatedSchedule((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        handleUpdateSchedule(updatedSchedule);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {schedule ? ( // Only render if schedule is not null
                    <Form>
                        <Form.Group>
                            <Form.Label>Train</Form.Label>
                            <Form.Control
                                name="train"
                                value={updatedSchedule.train || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={!schedule}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditScheduleModal;
