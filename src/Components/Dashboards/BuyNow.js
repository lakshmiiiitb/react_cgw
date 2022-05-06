import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
export  function BuyNow(){
    const params = useParams()
    const [item, setItem]=useState([])
    const [address, setAddress]=useState([])
    const [dropdown, setDropdown] = useState('Choose Address')

    const getData = () =>{
        console.log(params.itemid)
        axios.get("http://localhost:9087/item/"+params.itemid)
            .then(response => {
                console.log(response)
                setItem(response.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get("http://localhost:9087/viewaddress/"+params.userid)
            .then(response => {
                console.log(response)
                setAddress(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(()=>{
        getData()
    },[])


    const submitResponse = (e) => {
        if(dropdown === "Add Address")
        {
            //open a html form to add address
        }
        else{


            axios.get("http://localhost:9087/addOrder/"+params.userid+"/"+params.itemid+"/"+e.target.name+"/")
                .then(response => {
                    console.log(response)
                    console.log("added to cart successfully")
                })
                .catch(err => {
                    console.log(err)

                })
            //add data to order table
            //show message that you ordered
        }
    }

    return(
        <>
            <img align='left' style = {{height: '250px' , width: '250px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  /><br/><br/>

            <form  align='right' onSubmit={submitResponse}>
                <button style={{marginRight: '6px'}} className="desc">Name: {item.item_name}</button><br/><br/>
                <button style={{marginRight: '6px'}} className="desc">Price: {item.price}</button><br/><br/>
                <button style={{marginRight: '6px'}} className="desc">Ordered Quantity: {params.qty} </button><br/><br/>
                <button style={{marginRight: '6px'}} className="desc">Order Total: {params.qty * item.price} </button><br/><br/>
                <button style={{marginRight: '6px'}} className="desc">Address:
                    <select style={{marginRight: '6px',marginLeft: '60px' , height:'50px', width:'260px'}} onChange={(e)=>{setDropdown(e.target.value)}}>
                    {
                        address.length >0 ? address.map((item) =>
                            <option value={item.pincode}>{item.area} , {item.city} {item.state} {item.pincode}</option>
                        ) : "add address"

                    }
                        <option value="Add Address"> <p style={{color:'#141823'}}>Add Address</p> </option>

                </select>
                </button><br/><br/>
                <input type="submit" value="Submit" onChange={submitResponse}/>
            </form>

        </>
    )
}