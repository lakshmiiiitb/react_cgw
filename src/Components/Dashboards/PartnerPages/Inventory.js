import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Row} from "reactstrap";
import base_url from "../../BaseUrl";

export function Inventory(){

    const params = useParams()
    const [inventory, setInventory]= useState([])

    const navigate = useNavigate()

    const Logout = (e) =>{
        e.preventDefault()
        console.log("logout")
        localStorage.removeItem('Token');
        navigate('/')
    }

    const getData = () =>{
        let token=JSON.parse(window.localStorage.getItem('Token'))
    axios.get(base_url+"/partner/inventory/"+params.userid , {
        headers: {'Authorization' : 'Bearer '+token,
            'Access-Control-Allow-Origin': '*'}
    })
        .then(response => {
            console.log(response)
            setInventory(response.data)
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
                    {
                        inventory.length > 0 ? inventory.map((item) =>

                                    <snap style={{ marginLeft: "30px" }}>
                                        <>
                                            <button className="btn_class">
                                                <label style={{fontColor:'black',fontSize:'16px',fontFamily:'Courier'}}>Name: {item.item_name}</label> <br/><br/>
                                                <img align='top' style = {{right:'0px' , height: '200px' , width: '200px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  /><br/><br/><br/><br/>
                                                <p align="center" style={{fontSize:'25px'}}>
                                                    <br/>
                                                    <label style={{fontColor:'black',fontSize:'16px',fontFamily:'Courier'}}>Price: {item.price}</label> <br/>
                                                    <label style={{fontColor:'black',fontSize:'16px',fontFamily:'Courier'}}> Available Quantity: {item.qty}</label><br/><br/>
                                                    <button className="desc_class" name={item.id}
                                                            id={item.partner.id} >Update
                                                    </button>
                                                </p><br/><br/><br/>

                                            </button>
                                        </>
                                    </snap>

                            )
                            : <h1 style={{fontFamily:'Courier' , color:'red'}}>No Products.</h1>
                    }
            <button style={{top:'40px'}} className="logoutLblPos" onClick={Logout}>
                LOG OUT
            </button>
        </>
    )

}