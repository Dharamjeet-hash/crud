import { useState } from 'react';
import axios from "axios";

function Register(){
    
    const [form, setForm] = useState({});
    const [formError, setFormError] = useState({});
    const baseURL = "http://localhost:5000/api/";
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setForm(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseURL+'register',form)
        .catch((error)=>{
            setFormError(error.response.data)
        }).then((res) => {
            let data = res.data
            localStorage.setItem("token", data['token']);
            window.location.href = '/user'
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} className="form-control" id="name" placeholder="Enter name" />
                
                {formError.name ? <div className="invalid-feedback d-block"> {formError.name}</div> : ''}

            </div>

            <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}  className="form-control" id="email" placeholder="Enter email" />
                {formError.email ? <div className="invalid-feedback d-block"> {formError.email}</div> : ''}
            </div>

            <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" value={form.password} onChange={handleChange} className="form-control" name="password" id="password" placeholder="Password" />
                {formError.password ? <div className="invalid-feedback d-block"> {formError.password}</div> : ''}
            </div>

            <div className="form-group mb-3">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={handleChange} name="passwordConfirm" className="form-control" id="passwordConfirm" placeholder="confirm password" />
                {formError.passwordConfirm ? <div className="invalid-feedback d-block"> {formError.passwordConfirm}</div> : ''}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            <a className="ms-3" href={'/'}>Login</a>
        </form>
    )

    
}

export default Register;