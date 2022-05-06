import React, {useState} from "react";
import {NavLink, useNavigate, Outlet, useParams} from "react-router-dom";
import {GiftShops} from "./GiftShops";

export function CustomerDashboard(){

    const params= useParams()
    let orderpath="/orders/"+params.userid
    let cartpath="/cart/"+params.userid
    let profilepath="/profile/"+params.userid
    let giftpath="/giftshops/"+params.userid
    let sweetpath="/sweetshops/"+params.userid
    let addresspath="/address/"+params.userid

    return(
        <>
            <ul className="a">
                <li><a className="active" href={profilepath}>
                    <img src="/images/img_avatar2.png" alt="User" style={{width: '60%'}}/>
                    Profile
                </a></li>
                <li><a href={cartpath}>
                    <img src="/images/cart.png" alt="Cart" style={{width: '60%'}}/><br/>
                    Cart
                </a></li>
                <li><a href={orderpath}>
                    <img src="/images/orders.png" alt="Orders" style={{width: '60%'}}/>
                    Orders
                </a></li>
                <li><a href={addresspath}>
                    <img src="/images/location.png" alt="Location" style={{width: '60%'}}/><br/>
                    Address
                </a></li>
                <li><a href="/">
                    <img src="/images/logout.webp" alt="Logout" style={{width: '60%'}}/><br/>
                    Logout
                </a></li>

            </ul>
            <br/>
            <div className="b" style={{position: 'relative',width:'100%'}}>
                <div style={{marginTop:'100px',position:'absolute',left:'60px',width:'35%',height:'100px'}}>
                    <a href={sweetpath}>
                    <img src="/images/sweets.webp" alt="Sweets" style={{width: '100%'}}/>
                    </a>
                    SWEETS
                </div>

                <div style={{marginTop:'100px',position:'absolute',right:'130px',width:'35%',height:'100px'}}>
                    <a href={giftpath}>
                    <img src="/images/gift.jpeg" alt="Gifts" style={{width: '100%', "pointer-events": "all"}}/>
                    </a>
                    GIFTS
                </div>
            </div>

        </>

    )
}