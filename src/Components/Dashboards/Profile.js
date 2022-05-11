import axios from "axios";
import React, {useEffect} from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import base_url from "../BaseUrl";


export function Profile(){
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    const Logout = (e) =>{
        e.preventDefault()
        console.log("logout")
        localStorage.removeItem('Token');
        navigate('/')
    }

    const getData = () => {
        let token=JSON.parse(window.localStorage.getItem('Token'))
        console.log(params.userid)
        console.log(token)

        axios.get(base_url+"/customer/"+params.userid ,{
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
            .then(response => {
                console.log(response.data)
                setUser(response.data)
                console.log(user)
            })
            .catch(err => {
                console.log('error')
                console.log(err)
            })
    }

    useEffect(()=>{
        getData()
    },[])

    return(
        <>
            <button className="logoutLblPos" onClick={Logout}>
                LOG OUT
            </button>


            <img align='top' style = {{right:'0px' , height: '300px' , width: '200px'}} alt={user.name} src={`data:image/jpeg;base64,${user.image}`}  /><br/><br/><br/><br/>
            <span style={{ marginLeft: "30px" }}>
                            <>

                                <h1 align="left" style={{fontSize:'25px', fontFamily:'Helvetica Neue'}}>
                                            <br/><label style={{fontColor:'black', font:''}}>Name:</label> {user.name}<br/><br/>
                                            <label style={{fontColor:'black'}}>Email:</label> {user.email}<br/><br/>
                                            <label style={{fontColor:'black'}}>Phone: </label> {user.phone}<br/><br/>

                                        </h1><br/><br/><br/>


                            </>
                        </span>

        </>

    )

}