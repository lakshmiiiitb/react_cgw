import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import base_url from "../../BaseUrl";
export function ShopOrders(){
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
        axios.get(base_url+"/partner/orders/"+params.userid,{
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

    const status = (item) =>
    {
        if(item.status === 'o')
            return "ORDERED"
        else if(item.status === 'o')
            return "PICKED"
        else if(item.status === 'd')
            return "DELIVERED"
    }


    return(
        <>
            {
                avaOrd.length>0
                    ? avaOrd.map((item)=>
                        <button className="btn_class_del">
                            <img align='top' style = {{right:'0px' , height: '150px' , width: '150px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  /><br/><br/><br/><br/>
                            <p align="left" style={{fontSize:'23px'}}>
                                <label style={{fontColor:'black',fontFamily:'Georgia'}}><h2>Customer Details:</h2></label>
                                <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.address.name} </label><br/>
                                <label style={{fontColor:'black',fontFamily:'Georgia'}}> {item.address.phone}</label>
                                <label style={{fontColor:'black',fontFamily:'Georgia'}}><h2>Product Details:</h2></label>
                                <label style={{fontColor:'black',fontFamily:'Georgia'}}>{item.item_name} </label><br/>
                                <label style={{fontColor:'black',fontFamily:'Georgia'}}>Quantity ordered: {item.qty}</label><br/>
                                <label style={{fontColor:'black',fontFamily:'Georgia'}}>Status: </label> {status(item)}<br/><br/>

                            </p><br/><br/>
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