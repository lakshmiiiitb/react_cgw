import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
export function ViewItemsToCustomer(){
    const params = useParams()
    const [inventory, setInventory]= useState([])
    const [items , setItems] = useState()
    const [selectedItems, setSelected] = useState({
        qty: ''
    })

    const navigate = useNavigate()

    const addItemToCart=(e)=>{
        console.log(items)//quantity
        console.log(e.target.name)//itemid
        console.log(e.target.id)//shop
        setSelected( {...selectedItems, qty: items})

        console.log(selectedItems)
        axios.get("http://localhost:9087/addtocart/"+params.userid+"/"+e.target.id+"/"+e.target.name+"/"+selectedItems.qty)
            .then(response => {
                console.log(response)
                console.log("added to cart successfully")
            })
            .catch(err => {
                console.log(err)

            })
    }

    const goToBuyPage=(e)=>{
        navigate("/buynow/"+params.userid+"/"+e.target.name+"/"+selectedItems.qty)
    }

    const getData = () =>{
        axios.get("http://localhost:9087/inventory/"+params.shopid)
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
        <div>
            <div className = 'text-center' >
                <h1>Products</h1>
            </div>
            {
                inventory.length > 0
                    ? inventory.map((item) =>
                        <div>
                            <button className="btn_class">
                                <img align='left' style = {{right:'0px' , height: '200px' , width: '200px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  />
                                <h1 align="right" style={{fontSize:'12px'}}>
                                    <button className="desc">Name: {item.item_name}</button><br/><br/>
                                    <button className="desc">Price: {item.price}</button><br/><br/>
                                    <button className="desc"><label>Quantity: </label><input style={{width:'120px'}} placeholder="Quantity" type="number" onChange={(e)=>{setSelected({...selectedItems, qty: e.target.value})}}/>  </button><br/><br/>
                                </h1><br/><br/><br/>
                                <p align="right">
                                    <button style={{marginRight:'6px'}} className="desc" name={item.id} id={item.partner.id} onClick={addItemToCart}>Add to Cart</button>
                                    <button style={{marginRight:'6px'}} className="desc" name={item.id} id={item.partner.id} onClick={goToBuyPage}>Buy now</button>
                                </p>
                                <br/>
                            </button><br/><br/>
                        </div>

                    )
                    : ""
            }

        </div>
    )

}