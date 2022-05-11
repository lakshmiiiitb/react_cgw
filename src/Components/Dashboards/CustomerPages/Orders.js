import axios from "axios";
import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import base_url from "../../BaseUrl";

export function Orders(){
    const params = useParams()
    const [orders, setOrders] = useState([])
    const navigate = useNavigate

    const Logout = (e) =>{
        e.preventDefault()
        console.log("logout")
        localStorage.removeItem('Token');
        navigate('/')
    }

    const getData = () =>{
        let token=JSON.parse(window.localStorage.getItem('Token'))
        axios.get(base_url+"/customer/orders/"+params.userid, {headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}})
            .then(response => {
                console.log(response.data)
                setOrders(response.data)
            })
            .catch(err=>{})

    }

    const status = (item) =>
    {
        if(item.status === 'o')
            return "ORDERED"
        else if(item.status === 'o')
            return "PICKED"
        else if(item.status === 'd')
            return "DELIVERED"
    }

    const conditionalrender = (item) =>
    {
        if(item.delivery === null)
        {
            console.log("entered")
            console.log(item.delivery)
            return ""
        }
        else
        {
            console.log("entered")
            return (
                <>
                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>Delivery details: </label><br/><br/>
                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>Name: </label> {item.delivery.name}<br/><br/>
                    <label style={{fontColor:'black',fontFamily:'Georgia'}}>Phone: </label> {item.delivery.phone}<br/><br/>
                </>

        )
        }
    }
    useEffect(()=>{
        getData()
    },[])

    return(
        <>
            {
                orders.length > 0 ? orders.map((item) =>
                        <div>
                        <span style={{ marginLeft: "30px" }}>
                            <>
                            <button style={{height:'700px'}} className="btn_class">
                                <img align='top' style = {{right:'0px' , height: '200px' , width: '200px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  /><br/><br/><br/><br/>
                                <p align="left" style={{fontSize:'25px'}}>
                                            <br/><label style={{fontColor:'black',fontFamily:'Georgia'}}>Name:</label> {item.item_name}<br/><br/>
                                            <label style={{fontColor:'black',fontFamily:'Georgia'}}>Price:</label> {item.price}<br/><br/>
                                            <label style={{fontColor:'black',fontFamily:'Georgia'}}>Quantity: </label> {item.qty}<br/><br/>
                                            <label style={{fontColor:'black',fontFamily:'Georgia'}}>Status: </label> {status(item)}<br/><br/>
                                            {conditionalrender(item)}

                                </p><br/><br/><br/>
                            </button>

                            </>
                        </span>
                        </div>
                    )
                    : <h1 style={{fontFamily:'Courier' , color:'red'}}>No Orders.</h1>
            }
            <button className="logoutLblPos" onClick={Logout}>
                LOG OUT
            </button>
        </>
    )
}