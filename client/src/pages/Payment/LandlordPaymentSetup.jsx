import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LandlordPaymentSetup = () => {
    const {ownerId} = useParams();
    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const res = await axios.post(`http://localhost:5000/api/connect/${ownerId}`);
        console.log(res);
    }
    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Checkout</button>
        </form>
    );
};

export default LandlordPaymentSetup;