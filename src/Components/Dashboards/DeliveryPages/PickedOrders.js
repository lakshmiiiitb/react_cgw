import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import base_url from "../../BaseUrl";
export function PickedOrders(){
    const [pickedOrders , setPickedOrders] = useState([])
    const params= useParams()
    const [loc, setLocation] = useState()

    const getData = () =>{
        let token=JSON.parse(window.localStorage.getItem('Token'))
        axios.get(base_url+"/delivery/viewpickedorders/"+params.userid ,{
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        } )
            .then(response => {
                console.log(response)
                setPickedOrders(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        getData()
    },[])

    const deliveredOrder = (e) => {
        console.log(e.target.id)
        let token=JSON.parse(window.localStorage.getItem('Token'))
        axios.get(base_url+"/delivery/deliverIt/"+e.target.id, {
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
            .then(response =>{
                console.log(response)
                if(response === '')
                {}
                else
                    window.alert("Order delivered!!!")
                getData()

            })
            .catch(err =>{
                console.log(err)
            })
    }
    return(
        <>
            <main>
                {
                    pickedOrders.length>0
                        ? pickedOrders.map((item)=>
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
                                <button style={{backgroundColor:'green'}} className="desc" type="submit" id={item.id} onClick={deliveredOrder}>Delivered</button>
                            </button>
                        )
                        :<h1 style={{fontFamily:'Courier' , color:'red'}}>No current orders</h1>
                }
            </main>
        </>

    )
}