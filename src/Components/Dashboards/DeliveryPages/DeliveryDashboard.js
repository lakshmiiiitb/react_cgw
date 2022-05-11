import React, {useState} from "react";
import {NavLink, useNavigate, Outlet, useParams} from "react-router-dom";
import axios from "axios";
export function DeliveryDashboard(){

    const params= useParams()
    let availableorders= "/availableorders/"+params.userid
    let pickedorders="/currentorders/"+params.userid
    let deliveredpath="/delivered/"+params.userid
    const navigate = useNavigate()

    const Logout = (e) =>{
        e.preventDefault()
        console.log("logout")
        localStorage.removeItem('Token');
        navigate('/')
    }

    return(
        <>
            <div className="b" style={{position: 'relative',width:'100%'}}>
                <div style={{marginTop:'260px',position:'absolute',left:'60px',width:'25%',height:'150px'}}>
                    <a href={availableorders}>
                        <img src="/images/availableorders.jpg" alt="Sweets" style={{width: '100%'}}/>
                    </a>
                    <br/><br/>ORDERS AT YOUR LOCATION
                </div>

                <div align="center" style={{marginTop:'210px',position:'absolute',left:'500px',width:'25%',height:'100px'}}>
                    <a href={pickedorders}>
                        <img src="/images/pickedorders.svg" alt="Gifts" style={{width: '100%', "pointer-events": "all"}}/>
                    </a>
                    <br/><br/>YOUR DELIVERIES
                </div>

                <div style={{marginTop:'150px',position:'absolute',right:'130px',width:'35%',height:'100px'}}>
                    <a href={deliveredpath}>
                        <img src="/images/delivered.png" alt="Gifts" style={{width: '100%', "pointer-events": "all"}}/>
                    </a>
                    <br/><br/>DELIVERED
                </div>
            </div>
            <button style={{top:'30px'}} className="logoutLblPos" onClick={Logout}>
                LOG OUT
            </button>
        </>
    )
}