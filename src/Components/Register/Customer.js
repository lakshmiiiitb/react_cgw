import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import base_url from "../BaseUrl";

export function Customer(){
    const [credentials, setCredentials] = useState()
    const navigate=useNavigate()
    const submitresponse= (event) => {
        console.log(credentials)
        axios.post(base_url+"/register/customer",credentials)
            .then(response => {
                console.log("success, response data")
                console.log(response)
                navigate("/")
            })
            .catch(error => {console.log(error)})
        event.preventDefault()
    }
    return (
        <>
            <div>
                <div>
                    <h1 align="center">CUSTOMER REGISTRATION FORM</h1>
                </div><br/>
                <form onSubmit={submitresponse}>
                    <div>
                        <label>Name: </label><span style={{ marginLeft: "30px" }}>
                <input type="text"  onChange={(e)=>{setCredentials({...credentials,name:e.target.value})}}/>
            </span>
                    </div><br/><br/>
                    <div>
                        <label>Phone: </label><span style={{ marginLeft: "30px" }}>
                <input type="text"  onChange={(e)=>{setCredentials({...credentials,phone:e.target.value})}}/>
            </span>
                    </div><br/><br/>
                    <div>
                        <label>Email: </label><span style={{ marginLeft: "30px" }}>
                <input type="text"  onChange={(e)=>{setCredentials({...credentials,email:e.target.value})}}/>
            </span></div><br/><br/>
                    <div>
                        <label>Username: </label><span style={{ marginLeft: "30px" }}>
                <input type="text"  onChange={(e)=>{setCredentials({...credentials,username:e.target.value})}}/>
            </span>
                    </div><br/><br/>
                    <div>
                        <label>Password:</label> <span style={{ marginLeft: "30px" }}>
                <input type="password" onChange={(e)=>{setCredentials({...credentials,password:e.target.value})}}/>
            </span>
                    </div><br/><br/>
                    <div>
                        <label>Profile Photo: </label><span style={{ marginLeft: "30px" }}>
                <input type="file" onChange={(e)=>{setCredentials({...credentials,image:e.target.value})}}/>
            </span>
                    </div><br/><br/>
                    <div>
                        <input type="submit" onChange={submitresponse}/>
                    </div><br/><br/>
                </form>
            </div>

        </>

    )
}
