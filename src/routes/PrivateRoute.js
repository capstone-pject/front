import React from 'react'
import userStore from '../stores/userStore'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const user = userStore((state)=>state.user);

    return user?<Outlet/>:<Navigate to="/login"/>
}

export default PrivateRoute
