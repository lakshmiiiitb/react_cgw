import React, {useState} from "react";
import {NavLink, useNavigate, Outlet, useParams} from "react-router-dom";

export function PartnerDashboard(){

    const params= useParams()
    let inventorypath="/inventory/"+params.userid
    let orderpath="/orders/"+params.userid

    return(
        <>
            <nav className="mainNavBarStyle">
                <NavLink to={inventorypath}>Inventory</NavLink>
                <NavLink to={orderpath}>Orders</NavLink>
            </nav>
            <Outlet/>
        </>
    )
}