import React from "react";

export function Register() {

    return (
        <>
            <div className="b" style={{position: 'relative',width:'100%'}}>
                <div style={{marginTop:'100px',position:'absolute',left:'60px',width:'25%',height:'90px'}}>
                    <a href="/register/customer">
                        <img src="/images/customer.webp" alt="Sweets" style={{width: '100%'}}/>
                    </a>
                    CUSTOMER
                </div>

                <div align="center" style={{marginTop:'150px',position:'absolute',left:'500px',width:'25%',height:'90px'}}>
                    <a href="/register/delivery">
                        <img src="/images/pickedorders.svg" alt="Gifts" style={{width: '100%', "pointer-events": "all"}}/>
                    </a>
                    DELIVERY
                </div>
                <div style={{marginTop:'100px',position:'absolute',right:'130px',width:'25%',height:'90px'}}>
                    <a href="/register/partner">
                        <img src="/images/partner.png" alt="Gifts" style={{width: '100%', "pointer-events": "all"}}/>
                    </a>
                    PARTNER
                </div>
            </div>
        </>
    )
}
