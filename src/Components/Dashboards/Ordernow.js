import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Container} from "reactstrap";
import {toast} from "react-toastify";

export function Ordernow(){
    const params = useParams()
    const navigate = useNavigate()
    const [address, setAddress] = useState([])
    const getData = () =>{
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

    const addAddress = () => {
        navigate("")
    }

    return (
        <div style={{ display: 'block',
            width: 700, padding: 30 }}>
            <label>Choose Address: </label>

            {
                address.length > 0 ?
                    address.map((add)=>

                        <Container
                            style={{
                                backgroundColor: 'green'
                            }}
                        >
                            <h3>{add.area}</h3>
                            <h3>{add.city}</h3>
                            <h3>{add.state}</h3>
                        </Container>
                    )
                    : <h2>No address found</h2>
            }
            <input type="button" value="Add new address" onClick={addAddress}></input>
        </div>
    );
}