import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import base_url from "../../BaseUrl";

export function DeliveryDone(){
    const params=useParams()
    const navigate = useNavigate()
    const [delivered, setDelivered] = useState([])
    const Logout = (e) =>{
        e.preventDefault()
        console.log("logout")
        localStorage.removeItem('Token');
        navigate('/')
    }
    const getData = () =>{
        let token=JSON.parse(window.localStorage.getItem('Token'))
        axios.get(base_url+"/delivery/viewdeliveredorders/"+params.userid, {
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
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
            <main>
                {
                    delivered.length>0
                        ? delivered.map((item)=>
                            <button className="btn_class_del">
                                <p align="left" style={{fontSize:'23px'}}>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}><h2>Customer Details:</h2></label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.address.name} </label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}> {item.address.phone}</label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}><h2>Location Details:</h2> </label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.address.homenumber} ,{item.address.area} , {item.address.city} {item.address.state} {item.address.pincode}</label><br/>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}><h2>Shop Details:</h2> </label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.partner.storeName} , {item.partner.storeLoc}</label><br/>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.partner.contactno} {item.partner.pincode}</label><br/><br/>
                                </p><br/><br/>

                            </button>
                        )
                        :<h1 style={{fontFamily:'Courier' , color:'red'}}>No Deliveries</h1>
                }
            </main>
            <button className="logoutLblPos" onClick={Logout}>
                LOG OUT
            </button>
        </>

    )
}