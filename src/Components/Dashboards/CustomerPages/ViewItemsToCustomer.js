import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import base_url from "../../BaseUrl";
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

        let token=JSON.parse(window.localStorage.getItem('Token'))

        console.log(selectedItems)
        axios.get(base_url+"/customer/addtocart/"+params.userid+"/"+e.target.name+"/"+selectedItems.qty, {
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
            .then(response => {
                console.log(response)
                console.log("added to cart successfully")
                if(response !== "")
                    window.confirm("Added item to cart successfully!!")
                else
                    window.alert("Could not add item to cart")
            })
            .catch(err => {
                console.log(err)

            })
    }

    const goToBuyPage=(e)=>{
        e.preventDefault()
        console.log("userid" + params.userid)
        console.log("itemid "+e.target.id)
        console.log("qty: "+selectedItems.qty)
        navigate("/buynow/"+params.userid+"/"+e.target.name+"/"+selectedItems.qty)
        e.propertyIsEnumerable()
    }

    const getData = () =>{
        let token=JSON.parse(window.localStorage.getItem('Token'))
        axios.get(base_url+"/customer/inventory/"+params.shopid, {headers: {'Authorization' : 'Bearer '+token,
            'Access-Control-Allow-Origin': '*'}})
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
                    <div>
                        <snap style={{ marginLeft: "60px" }}>
                            <>
                        <button className="btn_class">
                            <label style={{fontColor:'black',fontSize:'14px',fontFamily:'Courier'}}>Name: {item.item_name}</label> <br/><br/>
                            <img align='top' style = {{right:'0px' , height: '200px' , width: '200px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  /><br/><br/><br/><br/>
                            <h1 align="center" style={{fontSize:'25px'}}>
                                <br/>
                                <label style={{fontColor:'black',fontSize:'14px',fontFamily:'Courier'}}>Price: {item.price}</label> <br/>
                                <label style={{fontColor:'black',fontSize:'14px',fontFamily:'Courier'}}>Quantity:  <input style={{width: '120px',fontSize:'14px'}}
                                                                                             placeholder="Quantity"
                                                                                             type="number"
                                                                                             onChange={(e) => {
                                                                                                 setSelected({
                                                                                                     ...selectedItems,
                                                                                                     qty: e.target.value
                                                                                                 })
                                                                                             }}/></label><br/><br/>
                                <button className="desc_class" name={item.id}
                                        id={item.partner.id} onClick={addItemToCart}>Cart
                                </button><snap style={{ marginLeft: "60px" }}>
                                <button className="desc_class" name={item.id}
                                         onClick={goToBuyPage}>Buy
                                </button></snap>
                            </h1><br/><br/><br/>

                        </button>
                            </>
                        </snap>
                    </div>
                )
                : <h1 style={{fontFamily:'Courier' , color:'red'}}>No Products.</h1>
            }

        </>

    )

}
