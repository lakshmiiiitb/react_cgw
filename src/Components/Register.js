import React from "react";
import { NavLink , Outlet } from "react-router-dom";

export function Register() {
    const navlinkstyle = ({isActive}) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : 'underline'
        }
    }
    return (
        <>

        <nav className="mainNavBarStyle">
            <NavLink to='customer'>Customer</NavLink>
            <NavLink to='delivery'>Delivery</NavLink>
            <NavLink to='partner'>Partner</NavLink>
        </nav>
        <Outlet/>
        </>
    )
}
