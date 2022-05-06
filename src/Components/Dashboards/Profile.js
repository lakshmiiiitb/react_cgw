import axios from "axios";
import React, {useEffect} from "react";
import {useState} from "react";
import {useParams} from "react-router-dom";

export function Profile(){
    const params = useParams()
    const [customer, setCustomer] = useState()

    const getData = () =>{
        axios.get("http://localhost:9087/getCustomer/"+params.userid)
            .then(response => {
                console.log(response)
                setCustomer(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        getData()
    },[])

    return(
         <div>
             <img align="left" src="/images/logout.webp" alt="Logout" style={{width: '60%'}}/><br/>
             <div className="card">
                 {customer.name}<br/><br/><br/>
                 {customer.phone}<br/><br/><br/>
                 {customer.email} <br/><br/><br/>
             </div>
             <a href="/"  align="right" >
                 <img src="/images/logout.webp" alt="Logout" style={{width: '60%'}}/><br/>
                 Logout
             </a>
             <a href="history.back()"  align="right" >
                 Go Back
             </a>
         </div>
    )

}