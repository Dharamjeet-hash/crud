import { useState } from 'react';
import axios from "axios";
function Login(){
    const [form, setForm] = useState({});
    const baseURL = "http://localhost:5000/api/";
    const [formError, setFormError] = useState({});
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseURL+'login',form).catch((error)=>{
            setFormError(error.response.data)
        })
        .then((res) => {
            let data = res.data
            localStorage.setItem("token", data['token']);
            window.location.href = '/user'
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input name="email" value={form.email} onChange={handleChange}  type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                {formError.email ? <div className="invalid-feedback d-block"> {formError.email}</div> : ''}
                
            </div>
            <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" value={form.password} onChange={handleChange}  type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                {formError.password ? <div className="invalid-feedback d-block"> {formError.password}</div> : ''}

            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <a className="ms-3" href={'/register'}>Register</a> 
        </form>
    )
}

export default Login;