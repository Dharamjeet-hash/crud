import { useState, useEffect } from 'react';
import axios from "axios";

function Header(prop){
    const [user, setUser] = useState({});
    const baseURL = "http://localhost:5000/api/";
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(()=>{
        axios.get(baseURL+'user',config)
        .catch((error)=>{
            console.log(error.response.data)
        }).then((res) => {
            let data = res.data
            setUser(data)
        });

    },[])

    const handleClick = () => {
        prop.parentCallback('Data From child')
    }

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = '/'
    }
    return(
        <div className="col-12 d-flex mt-5 mb-5">
            <div onClick={handleClick} className="col-6">
                <h3> Current User Info </h3> 
                <p>Name: {user.username}</p>  
                <p>Email: {user.email}</p>
            </div>

            <div className="col-6 text-end">
                <a href="#!" onClick={logout}> logout </a>
            </div>
        </div>
    )
}

export default Header;