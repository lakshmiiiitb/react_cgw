import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import base_url from "../../BaseUrl";

export function BuyNow(){
    const params = useParams()
    const navigate = useNavigate()
    const [item, setItem]=useState([])
    const [address, setAddress]=useState([])
    const [dropdown, setDropdown] = useState({option:'Add Address'})

    const getData = () =>{
        let token=JSON.parse(window.localStorage.getItem('Token'))
        console.log(params.itemid)
        axios.get(base_url+"/customer/item/"+params.itemid , {
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
            .then(response => {
                console.log(response)
                setItem(response.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(base_url+"/customer/viewaddress/"+params.userid, {
            headers: {'Authorization' : 'Bearer '+token,
                'Access-Control-Allow-Origin': '*'}
        })
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
        e.preventDefault()
        console.log("address id "+dropdown.option)

        axios.get(base_url+"/getpartnerfromitem/"+params.itemid)
            .then(response => {
                console.log(response.data)
                if(response.data === -1)
                {
                    console.log("entered")
                }
                else {
                    console.log(response.data)
                    let token=JSON.parse(window.localStorage.getItem('Token'))
                    axios.get(base_url+"/customer/validorder/"+response.data+"/"+dropdown.option, {
                        headers:{
                            'Authorization': 'Bearer '+token,
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                        .then(res =>{
                            console.log(res.data)
                            if(res.data === 1)
                            {
                                //your order permitted
                                //get cart if of this
                                axios.get(base_url+"/customer/getCartId/"+params.itemid+"/"+params.userid , {headers:{
                                'Authorization': 'Bearer '+token,
                                    'Access-Control-Allow-Origin': '*'
                            }})
                                    .then(resp =>
                                    {
                                        console.log(resp.data)//cart id
                                        axios.get(base_url+"/customer/addorders/"+resp.data+"/"+dropdown.option+"/"+response.data+"/"+ params.qty , {headers:{
                                                'Authorization': 'Bearer '+token,
                                                'Access-Control-Allow-Origin': '*'
                                            }})
                                            .then(r => {
                                                console.log(r)
                                                getData()
                                                navigate("/orderplaced")
                                            })
                                            .catch(error => {
                                                console.log(error)
                                            })
                                    })
                                    .catch(err =>{
                                        console.log(err)
                                    })

                            }
                            else
                            {
                                console.log("Your order cannot be processed")
                                navigate("/orderfailed")
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                }
            })
            .catch(err =>{
                console.log(err)
            })

        e.preventDefault()
    }

    const addAddressPage = (e) =>{
        e.preventDefault()
        console.log("entered")
        navigate("/address/"+params.userid)
        e.preventDefault()
    }
    return(
        <>
            {
                item !== '' ? <>
                    <img align='left' style = {{height: '350px' , width: '350px'}} alt={item.item_name} src={`data:image/jpeg;base64,${item.image}`}  /><br/><br/>

                <form  align='right' onSubmit={submitResponse}>
                <button style={{marginRight: '15px'}} className="buynow">Name: {item.item_name}</button><br/><br/>
                <button style={{marginRight: '15px'}} className="buynow">Price: {item.price}</button><br/><br/>
                <button style={{marginRight: '15px'}} className="buynow">Ordered Quantity: {params.qty} </button><br/><br/>
                <button style={{marginRight: '15px'}} className="buynow">Order Total: {params.qty * item.price} </button><br/><br/>
                <label>Address:
                <select style={{marginRight: '6px',marginLeft: '30px' , height:'50px', width:'260px'}} onChange={(e)=>{setDropdown({...dropdown,option:e.target.value})}}>
            {
                address.length >0 ? address.map((item) =>
                <option value={item.id}>{item.name}, {item.housenumber} {item.area} , {item.city} {item.state} {item.pincode} {item.phone}</option>
                ) : "add address"

            }
                <option value="Add Address"> <p style={{color:'#141823'}}>Add Address</p> </option>

                </select>
                </label><br/><br/>
                <button style={{backgroundColor: 'red', height:'50px' , width:'320px'}} onClick={addAddressPage}>Add New Address </button><span style={{ marginLeft: "30px" }}>
                <input style={{backgroundColor: 'green', height:'50px' , width:'120px'}}
                type="submit"
                value="Order now"

                onChange={submitResponse}/></span>
                </form>
                    </> : ""
            }


        </>
    )

}
