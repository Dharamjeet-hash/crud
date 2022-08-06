import { useState, useEffect } from 'react';
import axios from "axios";
import Header from "./common/header"
    
function CreateCar(){
    const [user, setUser] = useState({});
    const [form, setForm] = useState({});
    const baseURL = "http://localhost:5000/api/";
    const [formError, setFormError] = useState({});
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
                setUser(data)
            });
        }

        fetchUser()
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseURL+'create-car',form,config).catch((error)=>{
            setFormError(error.response.data)
        })
        .then((res) => {
            let data = res.data
            window.location.href = '/user'
        });
    }

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = '/'
    }

    const handleCallback = (childData) =>{
        alert(childData)
    }

    return (
        <div className="container">
            <div class="row">
                <Header parentCallback = {handleCallback} />
                <div class="col-12">
                    <div className="card p-4">
                        <form className="form-row" onSubmit={handleSubmit}>
                            <div className="col-6 mb-3">
                                <input type="text" name="name" onChange={handleChange} placeholder="Car Name" className="form-control"/>
                                {formError.name ? <div className="invalid-feedback d-block"> {formError.name}</div> : ''}
                            </div>

                            <div className="col-6 mb-3">
                                <input type="text" name="brand" onChange={handleChange} placeholder="Brand Name" className="form-control"/>
                                {formError.brand ? <div className="invalid-feedback d-block"> {formError.brand}</div> : ''}
                            </div>
                            
                            <div className="col-2">
                                <input type="submit" value="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCar;