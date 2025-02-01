import React, { useEffect, useState } from 'react';
import NavbarTop from "../components/NavbarTop";
import { Container, Row } from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import { createSchedule } from "../api/schedule";
import { getAll } from "../api/station";
import CreateStationModal from "../components/createStationModal";
import {Schedule} from "../types/schedule";

// Typing the Station interface for proper usage
interface Station {
    id: number;
    name: string;
}

const AdminGeneral = () => {
    const [stations, setStations] = useState<Station[]>([]); // Type the stations as an array of Station
    const [train, setTrain] = useState('');
    const [departureStationId, setDepartureStationId] = useState<number | string>(''); // Allow either number or string
    const [arrivalStationId, setArrivalStationId] = useState<number | string>(''); // Allow either number or string
    const [departureTime, setDepartureTime] = useState(new Date());
    const [arrivalTime, setArrivalTime] = useState(new Date());
    const [platform, setPlatform] = useState(1);
    const [validated, setValidated] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch stations on component mount
    useEffect(() => {
        const fetchStations = async () => {
            const data = await getAll();
            if (data) {
                setStations(data);
            }
        };

        fetchStations();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Validate the form
    if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        return;
    }


    const scheduleData: Schedule = {
        train,
        departureStation: Number(departureStationId),
        arrivalStation: Number(arrivalStationId),
        departureTime: departureTime.toISOString(),
        arrivalTime: arrivalTime.toISOString(),
        platform
    };

    try {
        await createSchedule(scheduleData);
        toast.success('Schedule created successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
        setValidated(true); // Set validation to true if schedule is created successfully
    } catch (error) {
        toast.error('Something went wrong! Please check your input.', {
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
            <NavbarTop />
            <Container className='d-flex justify-content-center align-content-center'>
                <Row>
                    <h3 className='schedule'>Add schedule</h3>

                    <form className='form-1' noValidate validated={validated} onSubmit={handleSubmit}>
                        <input
                            className="fname"
                            type="text"
                            name="name"
                            placeholder="Number of train"
                            value={train}
                            onChange={e => setTrain(e.target.value)}
                        />
                        <label htmlFor="departureStation">Departure Station</label>
                        <select
                            className="fname"
                            id="departureStation"
                            value={departureStationId}
                            onChange={e => setDepartureStationId(e.target.value)}
                            required
                        >
                            <option value="">Select Departure Station</option>
                            {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="arrivalStation">Arrival Station</label>
                        <select
                            className="fname"
                            id="arrivalStation"
                            value={arrivalStationId}
                            onChange={e => setArrivalStationId(e.target.value)}
                            required
                        >
                            <option value="">Select Arrival Station</option>
                            {stations.map((station) => (
                                <option key={station.id} value={station.id}>
                                    {station.name}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={handleShow}
                            className="btn btn-secondary mt-3"
                        >
                            + New station
                        </button>

                        <label htmlFor="departureDateTime">Departure Date & Time</label>
                        <input
                            className="fname"
                            type="datetime-local"
                            id="departureDateTime"
                            value={departureTime.toISOString().slice(0, 16)}  // format: yyyy-MM-ddThh:mm
                            onChange={e => setDepartureTime(new Date(e.target.value))}
                            required
                        />

                        <label htmlFor="arrivalDateTime">Arrival Date & Time</label>
                        <input
                            className="fname"
                            type="datetime-local"
                            id="arrivalDateTime"
                            value={arrivalTime.toISOString().slice(0, 16)}  // format: yyyy-MM-ddThh:mm
                            onChange={e => setArrivalTime(new Date(e.target.value))}
                            required
                        />

                        <label htmlFor="platform">Platform Number</label>
                        <input
                            type="number"
                            id="platform"
                            value={platform}
                            min="1"
                            max="10"
                            step="1"
                            onChange={e => setPlatform(Number(e.target.value))}
                            required
                        />

                        <CreateStationModal
                            show={show}
                            handleClose={handleClose}
                        />

                        <button className="buttonSignUp" type="submit">CREATE</button>
                    </form>

                </Row>
                <ToastContainer/>
            </Container>
        </div>
    );
};

export default AdminGeneral;
