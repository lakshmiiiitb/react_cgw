import React, {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import base_url from "../../BaseUrl";

export function AddAddress(){
    const [address, setAddress] = useState()
    const params= useParams()

    const submitresponse= (event) => {
        console.log(event.target.username)
        axios.post(base_url+"/addAddress/"+params.userid,address)
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
        event.preventDefault()
    }
return(
    <form onChange={submitresponse}>
        <div>
            <label>Name</label>
            <input type="text" onChange={(e)=>{setAddress({...address,name:e.target.value})}}/>
        </div>
        <div>
            <label>House Number</label>
            <input type="text" onChange={(e)=>{setAddress({...address,homenumber:e.target.value})}}/>
        </div>
        <div>
            <label>Area</label>
            <input type="text" onChange={(e)=>{setAddress({...address,area:e.target.value})}}/>
        </div>
        <div>
            <label>City</label>
            <input type="text"/>
        </div>
        <div>
            <label>State</label>
            <input type="text" onChange={(e)=>{setAddress({...address,state:e.target.value})}}/>
        </div>
        <div>
            <label>Pincode</label>
            <input type="text" onChange={(e)=>{setAddress({...address,pincode:e.target.value})}}/>
        </div>
        <div>
            <label>Phone number</label>
            <input type="text" onChange={(e)=>{setAddress({...address,phone:e.target.value})}}/>
        </div>
        <div>
            <input type="submit" onChange={submitresponse}/>
        </div>
    </form>
)
}