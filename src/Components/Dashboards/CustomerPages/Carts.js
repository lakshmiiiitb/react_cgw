import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import base_url from "../../BaseUrl";

export function Carts(){
    const params=useParams()
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const getData = () =>{
        let token=JSON.parse(window.localStorage.getItem('Token'))
        axios.get(base_url+"/customer/viewcart/"+params.userid , {
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
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
        e.preventDefault()
        console.log("userid" + params.userid)
        console.log("itemid "+e.target.id)
        console.log("qty: "+e.target.name)

        navigate("/buynow/"+params.userid+"/"+e.target.id+"/"+e.target.name)///itemid/qty, i need cart id. create it using custom attributes in html
        e.preventDefault()
    }
    const ordernow  = (e) => {
        e.preventDefault()
      console.log("reached")
        navigate("/ordernow/"+params.userid)
    }
    return(
        <div>
            <h1 style={{fontFamily:'Courier'}}>CART</h1><br/>
                    {
                        cart.length>0
                            ? cart.map((item)=>

                                    <snap style={{ marginLeft: "60px" }}>
                                        <>
                                    <button className="btn_class">
                                        <img align='top' style = {{right:'0px' , height: '200px' , width: '200px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  /><br/><br/><br/><br/>
                                        <p align="center" style={{fontSize:'25px',fontFamily:'Courier'}}>
                                            <br/><label style={{fontColor:'black'}}>Name:</label> {item.item_name}<br/><br/>
                                            <label style={{fontColor:'black'}}>Price:</label> {item.price}<br/><br/>
                                            <label style={{fontColor:'black'}}>Quantity: </label> {item.qty}<br/>
                                        </p><br/>
                                        <p align="right">
                                            <button className="desc" name={item.qty} id={item.itemid}  onClick={takeToBuyNowPage}>Buy now</button>
                                        </p>
                                    </button>
                                        </>
                                    </snap>


                            )
                            :""
                    }
        </div>

    )
}