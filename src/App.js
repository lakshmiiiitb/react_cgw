import logo from './logo.svg';
import './App.css';
import Login from "./Components/Login";
import {Route,Routes} from "react-router-dom";
import React from "react";
import {Customer} from "./Components/Register/Customer";
import {Partner} from "./Components/Register/Partner";
import {Delivery} from "./Components/Register/Delivery";
import {Register} from "./Components/Register/Register";
import {CustomerDashboard} from "./Components/Dashboards/CustomerPages/CustomerDashboard";
import {SearchShops} from "./Components/Dashboards/CustomerPages/SearchShops";
import {PartnerDashboard} from "./Components/Dashboards/PartnerPages/PartnerDashboard";
import {DeliveryDashboard} from "./Components/Dashboards/DeliveryPages/DeliveryDashboard";
import {Carts} from "./Components/Dashboards/CustomerPages/Carts";
import {Ordernow} from "./Components/Dashboards/CustomerPages/Ordernow";
import {Inventory} from "./Components/Dashboards/PartnerPages/Inventory";
import {GiftShops} from "./Components/Dashboards/CustomerPages/GiftShops";
import {SweetShops} from "./Components/Dashboards/CustomerPages/SweetShops";
import {ViewItemsToCustomer} from "./Components/Dashboards/CustomerPages/ViewItemsToCustomer";
import {BuyNow} from "./Components/Dashboards/CustomerPages/BuyNow";
import {AvailableOrders} from "./Components/Dashboards/DeliveryPages/AvailableOrders";
import {ViewOrdersToDeliveryBoy} from "./Components/Dashboards/DeliveryPages/ViewOrdersToDeliveryBoy";
import {AddAddress} from "./Components/Dashboards/CustomerPages/AddAddress";
import {PickedOrders} from "./Components/Dashboards/DeliveryPages/PickedOrders";
import {Profile} from "./Components/Dashboards/Profile";
import {Orders} from "./Components/Dashboards/CustomerPages/Orders";
import {DeliveryDone} from "./Components/Dashboards/DeliveryPages/DeliveryDone";
import {ShopOrders} from "./Components/Dashboards/PartnerPages/ShopOrders";
import {OrderSuccessful} from "./Components/FeedbackMessages/OrderSuccessful";
import {OrderCanceledDueToLongDistance} from "./Components/FeedbackMessages/OrderCanceledDueToLongDistance";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}>

        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/register/customer' element={<Customer/>}/>
          <Route path='/register/partner' element={<Partner/>}/>
          <Route path='/register/delivery' element={<Delivery/>}/>


        <Route path="cust_dashboard/:userid/" element={<CustomerDashboard/>}>
          <Route index element={<SearchShops/>}/>
        </Route>
        <Route path="address/:userid" element={<AddAddress/>}/>
        <Route path="part_dashboard/:userid/" element={<PartnerDashboard/>}/>

        <Route path="cart/:userid" element={<Carts/>}/>
        <Route path="ordernow/:userid" element={<Ordernow/>}/>
        <Route path="/inventory/:userid" element={<Inventory/>}/>
        <Route path="/giftshops/:userid" element={<GiftShops/>}/>
        <Route path="/sweetshops/:userid" element={<SweetShops/>}/>
        <Route path="/viewItemsToCustomer/:userid/:shopid" element={<ViewItemsToCustomer/>}/>
        <Route path="/buynow/:userid/:itemid/:qty" element={<BuyNow/>}/>

        <Route path="del_dashboard/:userid/" element={<DeliveryDashboard/>}/>
        <Route path="availableorders/:userid" element={<AvailableOrders/>}/>
        <Route path="viewordersatlocation/:pincode/:userid" element={<ViewOrdersToDeliveryBoy/>}/>
        <Route path="currentorders/:userid" element={<PickedOrders/>}/>

        <Route path="/profile/:userid" element={<Profile/>}/>

        <Route path="/orders/:userid" element={<Orders/>}/>
        <Route path="/delivered/:userid" element={<DeliveryDone/>}/>
        <Route path="/shoporders/:userid" element={<ShopOrders/>}/>
        <Route path="/orderplaced" element={<OrderSuccessful/>}/>
        <Route path="/orderfailed" element={<OrderCanceledDueToLongDistance/>}/>
      </Routes>
    </div>
  );
}

export default App;
