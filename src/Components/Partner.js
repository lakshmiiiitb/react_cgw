import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Partner(){
    const [cred , setCred] = useState();
    const navigate=useNavigate()

    const submitresponse= (event) => {
        console.log(event.target.username)
        axios.post("http://localhost:9087/partner",cred)
            .then(
                response => {console.log(response)
                    navigate("/login")
            })
            .catch(error => {console.log(error)})
        event.preventDefault()

    }

    return (
        <form onSubmit={submitresponse}>
            <div >Store Name: <input type="text"  onChange={(e)=>{setCred({...cred,storeName:e.target.value})}}/></div>
            <div >Store Location: <input type="text"  onChange={(e)=>{setCred({...cred,storeLoc:e.target.value})}}/></div>

                <div >Phone: <input type="text"  onChange={(e)=>{setCred({...cred,contactno:e.target.value})}}/></div>


            <div>Email: <input type="text"  onChange={(e)=>{setCred({...cred,email:e.target.value})}}/></div>


            <div>Username: <input type="text"
                                      onChange={(e)=>{setCred({...cred,username:e.target.value})}}/>
            </div>


            <div>Password: <input type="password"
                                      onChange={(e)=>{setCred({...cred,password:e.target.value})}}/>
            </div>

            <input type="submit" onChange={submitresponse}/>

        </form>
    )
}
