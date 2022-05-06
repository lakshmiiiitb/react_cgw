import Login from "../Login";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";

export function Carts(){
    const params=useParams()
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const getData = () =>{
        axios.get("http://localhost:9087/viewcart/"+params.userid)
            .then(response => {
                console.log(response)
                setCart(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(()=>{
        getData()
    },[])

    const takeToBuyNowPage = (e) =>
    {
        navigate("/buynow/"+params.userid+"/"+e.target.name+"/"+e.target.id+"/"+e.target.myattr)///itemid/qty, i need cart id. create it using custom attributes in html
    }
    const ordernow  = (e) => {
        e.preventDefault()
      console.log("reached")
        navigate("/ordernow/"+params.userid)
    }
    return(
        <div>
                    {
                        cart.length>0
                            ? cart.map((item)=>
                                <div>
                                    <button className="btn_class">
                                        <img align='left' style = {{right:'0px' , height: '200px' , width: '200px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  /><br/><br/><br/><br/>
                                        <h1 align="right" style={{fontSize:'12px'}}>
                                            <button className="desc">Name: {item.item_name}</button><br/><br/>
                                            <button className="desc">Price: {item.price}</button><br/><br/>
                                            <button className="desc">Quantity: {item.qty}</button><br/><br/>
                                        </h1><br/><br/><br/>
                                        <p align="left">
                                            <button className="desc"  style={{height:'100px', width:'290px'}}>Description: {item.description}</button> <br/>
                                        </p>
                                        <p align="right">
                                            <button className="desc" name={item.id} id={item.qty} data-myattr={item.id} onClick={takeToBuyNowPage}>Buy now</button>
                                        </p>
                                        <br/>
                                    </button><br/><br/>
                                </div>

                            )
                            :""
                    }
        </div>

    )
}