import React, {useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ADMIN_PAGE, LOGIN_PAGE} from "../utils/consts";
import {getUserData} from "../api/auth";
import "../style/table.css"

const NavbarTop = () => {
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            getUserData(token).then((userData) => {
                if (userData?.role === 'admin') {
                    setIsAdmin(true);
                }
            });
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate(LOGIN_PAGE)
    }
    return (
        <div>
            <Row style={{marginLeft: 0, marginRight:0}}>
                <div className='navbar-top'>
                    <h4 className='cite-name'>Train schedule</h4>
                    <div>
                        {isAdmin ?
                            <button className='admin-button' onClick={()=> navigate(ADMIN_PAGE)}>Admin panel</button>
                            :
                            <></>
                        }

                        <button className='log-out' onClick={handleLogout}>Log out</button>
                    </div>
                </div>
            </Row>

        </div>
    );
};

export default NavbarTop;
