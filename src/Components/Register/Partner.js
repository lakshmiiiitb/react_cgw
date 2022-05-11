import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import base_url from "../BaseUrl";

export function Partner(){
    const [cred , setCred] = useState();
    const navigate=useNavigate()

    const submitresponse= (event) => {
        console.log("credentials")
        console.log(cred)
        axios.post(base_url+"/register/partner",cred)
            .then(

                response => {
                    console.log("success")
                    console.log("response from post data")
                    console.log(response)
                    navigate("/")
            })
            .catch(
                error => {
                    console.log(error)

                })
        event.preventDefault()

    }

    return (
        <>
            <div>
                <div>
                    <h2 align="center">PARTNER REGISTRATION FORM</h2>
                </div><br/><br/>
                <form onSubmit={submitresponse}>
                    <div>
                        <label>Store Name:</label><span style={{ marginLeft: "30px" }}>
                    <input type="text"  onChange={(e)=>{setCred({...cred,storeName:e.target.value})}}/>
                </span></div><br/>
                    <div >
                        <label>Store Location:</label><span style={{ marginLeft: "30px" }}>
                    <input type="text"  onChange={(e)=>{setCred({...cred,storeLoc:e.target.value})}}/>
                </span></div><br/>
                    <div >
                        <label>Phone: </label><span style={{ marginLeft: "30px" }}>
                    <input type="text"  onChange={(e)=>{setCred({...cred,contactno:e.target.value})}}/>
                </span></div><br/>
                    <div>
                        <label>Email:</label><span style={{ marginLeft: "30px" }}>
                    <input type="text"  onChange={(e)=>{setCred({...cred,email:e.target.value})}}/>
                </span></div><br/>
                    <div>
                        <label>Username: </label><span style={{ marginLeft: "30px" }}>
                    <input type="text"  onChange={(e)=>{setCred({...cred,username:e.target.value})}}/>
                </span>
                    </div><br/>
                    <div>
                        <label>Password:</label><span style={{ marginLeft: "30px" }}>
                    <input type="password" onChange={(e)=>{setCred({...cred,password:e.target.value})}}/>
                </span>
                    </div><br/>
                    <div>
                        <label>Description:</label> <span style={{ marginLeft: "30px" }}>
                    <input type="text" onChange={(e)=>{setCred({...cred,description:e.target.value})}}/>
                </span>
                    </div><br/>
                    <div>
                        <label>Profile: </label><span style={{ marginLeft: "30px" }}>
                    <input type="file" onChange={(e)=>{setCred({...cred,image:e.target.value})}}/>
                </span>
                    </div><br/><br/>
                    <div>
                        <input type="submit" onChange={submitresponse}/>
                    </div><br/>
                </form>
            </div>

        </>

    )
}
