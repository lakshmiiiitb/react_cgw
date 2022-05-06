import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
export function PickedOrders(){
    const [pickedOrders , setPickedOrders] = useState([])
    const params= useParams()
    const [loc, setLocation] = useState()

    const getData = () =>{
        axios.get("http://localhost:9087/viewpickedorders/"+params.userid)
            .then(response => {
                console.log(response)
                setPickedOrders(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        getData()
    },[])
    return(
        <>
            <a href="/"  align="right" >
                <img src="/images/logout.webp" alt="Logout" style={{width: '60%'}}/><br/>
                Logout
            </a>
            <main>
                {
                    pickedOrders.length>0
                        ? pickedOrders.map((item)=>
                            <div className="card">
                                {item.address.area} , {item.address.city} {item.address.state} {item.address.pincode}<br/>
                                {item.cart.customer.name} , {item.cart.customer.phone},  {item.cart.customer.email} <br/>
                                {item.partner.storeName} , {item.partner.storeLoc} ,{item.partner.contactno} {item.partner.email}<br/>
                            </div>
                        )
                        :""
                }
            </main>
        </>

    )
}