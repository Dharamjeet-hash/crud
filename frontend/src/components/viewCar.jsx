import { useState, useEffect } from 'react';
import axios from "axios";
import Header from "./common/header"
import { useParams } from 'react-router-dom' 

function ViewCar(){

    const baseURL = "http://localhost:5000/api/";
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const [car, setCar] = useState([]);
    const { id } = useParams()

    

    useEffect(()=>{

        axios.get(baseURL+'get-car/'+id,config)
        .catch((error)=>{
            console.log(error.response.data)
        }).then((res) => {
            let data = res.data
            console.log(data)
            setCar(data)
        });

    },[])

    const handleCallback = (childData)=>{
        alert(childData)
    }
    return (
        <div className="container UserInfo">
            <div className="row">  
                <Header parentCallback = {handleCallback} />
                <h3 className='title'> Car Details </h3>
                <div className="col-12">
                    <div className="col-6 d-flex">
                        <div className="col-3">
                            Name : 
                        </div>

                        <div className="col-3">
                            {car.name}
                        </div>
                    </div>
                    <div className="col-6 d-flex">
                        <div className="col-3">
                            Brand : 
                        </div>

                        <div className="col-3">
                            {car.brand}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCar;