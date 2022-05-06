import React from "react";
import { useNavigate } from "react-router-dom"

export function PropPush(props){
    const history = useNavigate()
   const explore = (eve) =>{
       eve.preventDefault()
       console.log("entered")
       history('http:/localhost:3000/customer')
       eve.preventDefault()
   }
   return(
       <div>
           <form onSubmit={explore}>
               <input type="submit" value="change" onSubmit={explore}/>
           </form>

       </div>
   )
}