import React, {useState} from "react";
import axios from "axios";

export function Delivery(){
    const [credentials, setCredentials] = useState()

    const submitresponse= (event) => {
        console.log(event.target.username)
        axios.post("http://localhost:9087/customer",credentials)
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
        event.preventDefault()
    }
    return (
        <form onSubmit={submitresponse}>
            <div>Name: <input type="text"  onChange={(e)=>{setCredentials({...credentials,name:e.target.value})}}/></div>
            <div>Phone: <input type="text"  onChange={(e)=>{setCredentials({...credentials,phone:e.target.value})}}/></div>
            <div>Email: <input type="text"  onChange={(e)=>{setCredentials({...credentials,email:e.target.value})}}/></div>
            <div>Username: <input type="text"  onChange={(e)=>{setCredentials({...credentials,username:e.target.value})}}/></div>
            <div>Password: <input type="password" onChange={(e)=>{setCredentials({...credentials,password:e.target.value})}}/></div>
            <div><input type="submit" onChange={submitresponse}/></div>
        </form>
    )
}
