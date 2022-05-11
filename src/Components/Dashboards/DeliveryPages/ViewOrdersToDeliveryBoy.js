import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import base_url from "../../BaseUrl";

export function ViewOrdersToDeliveryBoy(){
    const [avaOrd , setAvaOrd] = useState([])
    const params= useParams()
    const navigate=useNavigate()
    const [loc, setLocation] = useState()

    const Logout = (e) =>{
        e.preventDefault()
        console.log("logout")
        localStorage.removeItem('Token');
        navigate('/')
    }

    const getData = () =>{
        let token=JSON.parse(window.localStorage.getItem('Token'))
        axios.get(base_url+"/delivery/viewordersatdeliverylocation/"+params.pincode,{
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        } )
            .then(response => {
                console.log(response)
                setAvaOrd(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(()=>{
        getData()
    },[])

    const pickOrder = (e) => {
        let token=JSON.parse(window.localStorage.getItem('Token'))
        console.log(e.target.id)
        axios.get(base_url+"/delivery/pickorders/"+e.target.id+"/"+params.userid, {
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
            .then(response =>{
                console.log(response)
                if(response === '')
                {}
                else
                    window.alert("Order picked!!!")
                getData()

            })
            .catch(err =>{
                console.log(err)
            })
    }
    return(
        <>
                {
                    avaOrd.length>0
                        ? avaOrd.map((item)=>

                            <button className="btn_class_del">
                                <p align="left" style={{fontSize:'23px'}}>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}><h2>Customer Details:</h2></label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.address.name} </label><br/>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}> {item.address.phone}</label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}><h2>Location Details:</h2> </label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.address.homenumber} ,{item.address.area} , {item.address.city} {item.address.state} {item.address.pincode}</label><br/>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}><h2>Shop Details:</h2> </label>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.partner.storeName} , {item.partner.storeLoc}</label><br/>
                                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.partner.contactno} {item.partner.pincode}</label><br/><br/>
                                </p><br/><br/>
                                <button style={{backgroundColor:'green'}} className="desc" type="submit" id={item.id} onClick={pickOrder}>Pick</button>
                            </button>

                        )
                        :<h1 style={{fontFamily:'Courier' , color:'red'}}>No orders at the location.</h1>
                }

            <button className="logoutLblPos" onClick={Logout}>
                LOG OUT
            </button>

        </>

    )
}