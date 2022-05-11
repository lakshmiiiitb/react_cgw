import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer/Footer";
import base_url from "./BaseUrl";


export function Login(){

    const navigate= useNavigate()
    const[credentials, setCredentials] = useState({username:'',password:'',role:'ROLE_CUSTOMER'})
    const[cust, setCust] = useState()

    const submitresponse = (event) =>{
        event.preventDefault()
        console.log(credentials.role)
        console.log(credentials.password)
        console.log(credentials.username)
        axios.post(base_url+"/authenticate", credentials)
            .then(response => {
                console.log("response")
                console.log(response)
                console.log(response.data)
                console.log("token")
                console.log(response.data.token)
                console.log("customer id")
                console.log(response.data.customerid)
                console.log("role")
                console.log(response.data.role)
                setCust(response.data.role)
                console.log(credentials.role)
                if(credentials.role === 'ROLE_CUSTOMER')
                {
                    localStorage.setItem('Token',JSON.stringify(response.data.token))
                    navigate("/cust_dashboard/"+response.data.customerid)
                }
                else if(credentials.role === 'ROLE_PARTNER')
                {
                    localStorage.setItem('Token',JSON.stringify(response.data.token))
                    navigate("/part_dashboard/"+response.data.customerid)
                }
                else if(credentials.role === 'ROLE_DELIVERY')
                {
                    localStorage.setItem('Token',JSON.stringify(response.data.token))
                    navigate("/del_dashboard/"+response.data.customerid)
                }


            }).catch(error=>{
                console.log(error)
        })
        event.preventDefault()
    }

    const register =(event) => {
        navigate("/register")
        event.preventDefault()
    }
    return (
        <>
            <div style={{ position: 'relative',
                width: '900px',
                height: '700px',
                margin: '1px',
                fontStyle: 'oblique'}}>
                <h2>Crowdsource Gift Website</h2>
            </div>
            <div className="b" style={{position: 'relative',width:'100%'}}>
                <div style={{position:'absolute',  margin:'130px',width:'55%',height:'100px'}}>
                    <form onSubmit={submitresponse}>
                        <fieldset><br/>
                            <legend><h2>Login</h2></legend>
                        <div><label>Username: </label><span style={{ marginLeft: "30px" }}>
                            <input type='text' onChange={(e)=>{setCredentials({...credentials, username:e.target.value})}}/>
                        </span></div>
                        <br/>
                        <div><label>Password: </label><span style={{ marginLeft: "30px" }}>
                            <input type='password' onChange={(e)=>{setCredentials({...credentials, password:e.target.value})}}/>
                        </span></div>
                        <br/>
                        <div>
                            <label>Type: </label><span style={{ marginLeft: "30px" }}>
                            <select onChange={(e)=>{setCredentials({...credentials, role:"ROLE_"+e.target.value})}}>
                                <option value='CUSTOMER'>CUSTOMER</option>
                                <option value='PARTNER'>PARTNER</option>
                                <option value='DELIVERY'>DELIVERY</option>
                            </select>
                        </span>
                        </div><br/>
                        <div><input type='submit' style={{width:'200px'}} value='Login' onChange={submitresponse}/><span style={{ marginLeft: "30px" }}><input type='button' style={{width:'200px'}} value='Register' onClick={register}/></span>
                        </div><br/>
                        </fieldset>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
        );

}
export default Login