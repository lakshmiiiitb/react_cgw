import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
export function ViewOrdersToDeliveryBoy(){
    const [avaOrd , setAvaOrd] = useState([])
    const params= useParams()
    const [loc, setLocation] = useState()
    const getData = () =>{
        axios.get("http://localhost:9087/viewordersatdeliverylocation/"+params.pincode)
            .then(response => {
                console.log(response)
                setAvaOrd(response.data)
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
                    avaOrd.length>0
                        ? avaOrd.map((item)=>
                            <div className="card">
                                {item.address.area} , {item.address.city} {item.address.state} {item.address.pincode}<br/>
                                {item.cart.customer.name} , {item.cart.customer.phone},  {item.cart.customer.email} <br/>
                                {item.partner.storeName} , {item.partner.storeLoc} ,{item.partner.contactno} {item.partner.email}<br/><br/>
                                <button type="submit">Pick</button>
                            </div>
                        )
                        :""
                }
            </main>
        </>

    )
}