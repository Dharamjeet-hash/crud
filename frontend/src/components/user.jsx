import { useState, useEffect, useCallback, useContext } from 'react';
import axios from "axios";
import Car from './cars'
import Header from "./common/header"


function User(){
    const [user, setUser] = useState({});
    const [cars, setCars] = useState([]);
    const baseURL = "http://localhost:5000/api/";
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(()=>{

        const fetchUser = () => {
            axios.get(baseURL+'user',config)
            .catch((error)=>{
                console.log(error.response.data)
            }).then(async (res) => {
                let data = res.data
                let cars = await res.data['cars']
                setUser(data)
                setCars(cars)
            });
        }

        fetchUser()
    },[])

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = '/'
    }

    const handleCallback = (childData)=>{
        alert(childData)
    }
    
    return (
        <div className="container UserInfo">
            <div className="row">  
                <Header parentCallback = {handleCallback} />

                <div className="col-12 d-flex" style={{ justifyContent: 'center' }}> 
                    <Car cars={cars} />
                    <div className="col-4 text-end">
                        <a href="/chat" className="bnt btn-primary"> Chat </a>
                        <a href="/create-car" className="bnt btn-primary ms-5"> Create Car </a>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default User;