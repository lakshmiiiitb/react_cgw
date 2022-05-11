import React, {useState} from "react";
import {NavLink, useNavigate, Outlet, useParams} from "react-router-dom";

export function PartnerDashboard(){

    const navigate = useNavigate()
    const params= useParams()
    let inventorypath="/inventory/"+params.userid
    let orderpath="/shoporders/"+params.userid

    const Logout = (e) =>{
        e.preventDefault()
        console.log("logout")
        localStorage.removeItem('Token');
        navigate('/')
    }
    return(
        <>
            <div className="b" style={{position: 'relative',width:'100%'}}>
                <div style={{marginTop:'160px',position:'absolute',left:'60px',width:'35%',height:'100px'}}>
                    <a href={inventorypath}>
                        <img src="/images/inventory.png" alt="Sweets" style={{width: '100%'}}/>
                    </a>
                    INVENTORY
                </div>

                <div style={{marginTop:'200px',position:'absolute',right:'130px',width:'35%',height:'100px'}}>
                    <a href={orderpath}>
                        <img src="/images/orders.webp" alt="Gifts" style={{width: '100%', "pointer-events": "all"}}/>
                    </a>
                    ORDERS
                </div>
            </div>
            <button style={{top:'30px'}} className="logoutLblPos" onClick={Logout}>
                LOG OUT
            </button>
        </>

    )
}