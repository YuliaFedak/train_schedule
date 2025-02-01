import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import {createStation} from "../api/station";

interface ModalProps {
    show: boolean;
    handleClose: () => void;
}
const CreateStationModal : React.FC<ModalProps>  = ({ show, handleClose}) => {

    const [name, setName] = useState('')
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(false);
            return;
        }
        const stationType = {
            name
        };
        try {
            await createStation(stationType)
            setValidated(true);
        } catch (error) {
            toast.error('Wrong station', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#000000", fontSize: 18}}>Create a new station</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='form' noValidate validated={validated} onSubmit={handleSubmit}>
                        <input
                            className="fname"
                            type="text"
                            name="name"
                            placeholder="Name of station"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <button className="buttonSignUp" type="submit" onClick={handleClose}>CREATE</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreateStationModal;
