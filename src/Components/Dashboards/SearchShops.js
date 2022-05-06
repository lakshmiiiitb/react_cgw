import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {ViewItemsToCustomer} from "./ViewItemsToCustomer";


export function SearchShops(props){
    const params= useParams()
    const [loc, setLocation] = useState()
    const [isResponse, setResponse] = useState(false)
    const [shops, setShops] = useState([])
    const [isItem, setIsItem] = useState(false)
    const [items, setItems] = useState([])
    const navigate = useNavigate()
    const takeToItems = (e) =>{
        e.preventDefault()
        console.log(e.target.name)
        navigate("/viewItemsToCustomer/"+params.userid+"/"+e.target.name)
    }

    const handleResponse= (e) =>{
        e.preventDefault()
        console.log(props.type)
        console.log(loc.type)
        axios.post("http://localhost:9087/viewshops",loc)
            .then(response => {
                console.log(response)
                console.log(response.data)
                if(response.data !== "")
                {
                    setResponse(true)
                    setShops(response.data)
                    navigate("")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return(
        <div style={{left:'0px'}}>
        <form   onSubmit={handleResponse}>
            <div>
                <label>Choose location : </label>
            </div><br/>
            <div><input type="text" placeholder="Enter location" onChange={(e)=>{setLocation({...loc, location:e.target.value, type:props.type})}}/>
            </div><br/>
            <div><input type="submit" value="Submit" onSubmit={handleResponse}/></div>
        </form>
            <br/>
            {
                            shops.length > 0 ? shops.map((item) =>
                                   <div>
                                       <button className="btn" name={item.id} onClick={takeToItems}>{item.storeName}<br/>{item.storeLoc}</button>
                                <br/><br/>
                                   </div>
                                )
                                :""
            }


        </div>
    )
}