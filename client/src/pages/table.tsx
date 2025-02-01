import React, { useEffect, useState } from 'react';
import NavbarTop from "../components/NavbarTop";
import '../style/table.css';
import { getAll, getDeparturesAndArrivals } from "../api/station";
import { Col, Row } from "react-bootstrap";
import StationModal from "../components/stationModal";
import { getUserData } from "../api/auth";
import { deleteSchedule } from "../api/schedule";
import EditScheduleModal from "../components/EditScheduleModal";

const Table = () => {
    const [stations, setStations] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [city, setCity] = useState('');
    const [departures, setDepartures] = useState([]);
    const [arrivals, setArrivals] = useState([]);
    const [time, setTime] = useState('');
    const [show, setShow] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteSchedule = async (id) => {
        try {
            await deleteSchedule(id);
            setDepartures(departures.filter(dep => dep.id !== id));
            setArrivals(arrivals.filter(arr => arr.id !== id));
        } catch (error) {
            console.error("Failed to delete schedule", error);
        }
    };

    const handleEditSchedule = (schedule) => {
        setSelectedSchedule(schedule);
        setShowEditModal(true);
    };

    const handleUpdateSchedule = (updatedSchedule) => {
        setDepartures(departures.map(dep => (dep.id === updatedSchedule.id ? updatedSchedule : dep)));
        setArrivals(arrivals.map(arr => (arr.id === updatedSchedule.id ? updatedSchedule : arr)));
        setShowEditModal(false);
    };

    const handleGetDeparturesAndArrivals = async (id) => {
        const data = await getDeparturesAndArrivals(id);
        if (data) {
            setDepartures(data.departures);
            setArrivals(data.arrivals);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date().toLocaleTimeString();
            setTime(currentTime);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchStations = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                getUserData(token).then((userData) => {
                    if (userData?.role === 'admin') {
                        setIsAdmin(true);
                    }
                });
            }
            const data = await getAll();
            if (data) {
                setStations(data);
            }
        };
        fetchStations();
    }, []);

    return (
        <div className='body'>
            <NavbarTop />
            <Row>
                <div className='station-name'>
                    <h3>{city || 'Choose the station'}</h3>
                    <button className="change-button" onClick={handleShow}>Change</button>
                    <StationModal
                        show={show}
                        handleClose={handleClose}
                        data={stations}
                        handleGetDeparturesAndArrivals={handleGetDeparturesAndArrivals}
                        handleCityChange={setCity}
                    />
                    <h5>{time}</h5>
                </div>
            </Row>
            <Row>
                <Col md={6}>
                    <div className="table-departure">
                        <h5 className='direction'>Departure</h5>
                        <table className="styled-table">
                            <thead>
                            <tr>
                                <th>Train</th>
                                <th>Train route</th>
                                <th>Time</th>
                                <th>Platform</th>
                                {isAdmin && <th>Actions</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {departures.map((dep) => (
                                <tr key={dep.id}>
                                    <td>{dep.train}</td>
                                    <td>{dep.departureStation.name} - {dep.arrivalStation.name}</td>
                                    <td>{new Date(dep.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>{dep.platform}</td>
                                    {isAdmin && (
                                        <td>
                                            <button className="btn-edit" onClick={() => handleEditSchedule(dep)}>Edit</button>
                                            <button className="btn-delete" onClick={() => handleDeleteSchedule(dep.id)}>Delete</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col md={6} className="table-arrival">
                    <h5 className='direction'>Arrival</h5>
                    <table className="styled-table">
                        <thead>
                        <tr>
                            <th>Train</th>
                            <th>Train route</th>
                            <th>Time</th>
                            <th>Platform</th>
                            {isAdmin && <th>Actions</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {arrivals.map((arr) => (
                            <tr key={arr.id}>
                                <td>{arr.train}</td>
                                <td>{arr.departureStation.name} - {arr.arrivalStation.name}</td>
                                <td>{new Date(arr.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{arr.platform}</td>
                                {isAdmin && (
                                    <td>
                                        <button className="btn-edit" onClick={() => handleEditSchedule(arr)}>Edit</button>
                                        <button className="btn-delete" onClick={() => handleDeleteSchedule(arr.id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
            {selectedSchedule && (
                <EditScheduleModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    schedule={selectedSchedule}
                    handleUpdateSchedule={handleUpdateSchedule}
                />
            )}
        </div>
    );
};

export default Table;
