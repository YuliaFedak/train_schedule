import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { userRoutes } from "../routes";
import { adminRoutes } from "../routes";
import { getUserData } from "../api/auth";

const AppRouter = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmin = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                const userData = await getUserData(token);
                if (userData?.role === 'admin') {
                    setIsAdmin(true);
                }
            }
            setLoading(false);
        }
        fetchAdmin()
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            {userRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {isAdmin &&
                adminRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))
            }
            {!isAdmin && adminRoutes.map(({ path }) => (
                <Route key={path} path={path} element={<Navigate to="/login" />} />
            ))}
        </Routes>
    );
};

export default AppRouter;
