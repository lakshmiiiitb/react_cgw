import React, {useEffect, useState} from "react";
import axios from "axios";

export function DeliveryDone(){
    const [delivered, setDelivered] = useState()
    const getData = () =>{
        axios.get("http://localhost:9087/viewdeliveredorders/"+params.userid)
            .then(response => {
                console.log(response)
                setDelivered(response.data)
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
                    delivered.length>0
                        ? delivered.map((item)=>
                            <div className="card">
                                {item.housenumber} , {item.address.area} , {item.address.city} {item.address.state} {item.address.pincode}<br/>
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