import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export function AvailableOrders(){

    const [pincode, setPincode] = useState()
    const navigate=useNavigate()
    const params = useParams()


    const handleResponse= (e) =>{
        e.preventDefault()
        navigate("/viewordersatlocation/"+pincode+"/"+params.userid)
    }

    return(
        <main>
            <form   onSubmit={handleResponse}>
                <div >
                    <label>Enter Pincode : </label>
                </div><br/>
                <div ><input type="text" placeholder="Enter Pincode of your location" onChange={(e)=>setPincode(e.target.value)}/>
                </div><br/>
                <div ><input type="submit" value="Submit" onSubmit={handleResponse}/></div>
            </form>

        </main>
    )
}