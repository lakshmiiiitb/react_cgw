import React, {useState} from "react";
import {NavLink, useNavigate, Outlet, useParams} from "react-router-dom";
import axios from "axios";
export function DeliveryDashboard(){

    const params= useParams()
    let availableorders= "availableorders/"+params.userid
    let pickedorders="currentorders/"+params.userid
    let deliveredpath="delivered/"+params.userid
    return(
        <>
            <div className="b" style={{position: 'relative',width:'100%'}}>
                <div style={{marginTop:'160px',position:'absolute',left:'60px',width:'35%',height:'150px'}}>
                    <a href={availableorders}>
                        <img src="/images/availableorders.jpg" alt="Sweets" style={{width: '100%'}}/>
                    </a>
                    <br/>ORDERS AT YOUR LOCATION
                </div>

                <div style={{marginTop:'100px',position:'absolute',right:'130px',width:'35%',height:'100px'}}>
                    <a href={pickedorders}>
                        <img src="/images/pickedorders.svg" alt="Gifts" style={{width: '100%', "pointer-events": "all"}}/>
                    </a>
                    <br/>YOUR DELIVERIES
                </div>

                <div style={{marginTop:'100px',position:'absolute',right:'130px',width:'35%',height:'100px'}}>
                    <a href={deliveredpath}>
                        <img src="/images/deliverydone.jpeg" alt="Gifts" style={{width: '100%', "pointer-events": "all"}}/>
                    </a>
                    <br/>DELIVERED
                </div>
            </div>
        </>
    )
}