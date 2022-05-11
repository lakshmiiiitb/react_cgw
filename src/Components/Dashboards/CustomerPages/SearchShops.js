import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import base_url from "../../BaseUrl";


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
        let token=JSON.parse(window.localStorage.getItem('Token'))
        axios.post(base_url+"/customer/viewshops",loc, {
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
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
        e.preventDefault()
    }
    return(
        <>
            <div style={{display:'flex' ,flexDirection: 'column'}}>
                <form   onSubmit={handleResponse}>
                <div>
                    <label>Choose location : </label>
                </div><br/>
                <div><input type="text" placeholder="Enter location" onChange={(e)=>{setLocation({...loc, location:e.target.value, type:props.type})}}/>
                </div><br/>
                <div><input type="submit" value="Submit" onSubmit={handleResponse}/></div>
                </form><br/><br/>

            <div style={{display:'flex' ,flexDirection: 'row', marginLeft:'150px'}}>
            {
                shops.length > 0 ? shops.map((item) =>
                            <div>
                                <button style={{ marginLeft:'50px',fontFamily:'Courier',color:'black'}} className="btn" name={item.id} onClick={takeToItems}>{item.storeName}<br/>{item.storeLoc}</button>
                                <br/><br/>
                            </div>

                                )
                                :""
            }
            </div>
            </div><br/><br/>

        </>
    )
}