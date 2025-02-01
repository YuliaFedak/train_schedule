import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import '../style/stationModal.css'

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    data: [];
    handleGetDeparturesAndArrivals: () => void;
    handleCityChange: () => void;
}

const StationModal : React.FC<ModalProps>  = ({ show, handleClose, data, handleGetDeparturesAndArrivals, handleCityChange}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const filteredStations = data.filter(station =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#000000", fontSize: 18}}>Choose the station</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                    type="text"
                    placeholder="Enter station name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="search-input"
                    />
                    {filteredStations.length > 0 ? (
                        <ul className="station-list">
                            {filteredStations.map((station) => (
                                <li key={station.id} className="station-item">
                                    <button
                                        className='station-button'
                                        onClick={() => {
                                            handleGetDeparturesAndArrivals(station.id);
                                            handleCityChange(station.name);
                                            handleClose();
                                        }}
                                    >{station.name}</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-results">No stations found</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default StationModal;
