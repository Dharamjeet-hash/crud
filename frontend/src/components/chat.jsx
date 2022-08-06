import { useState, useEffect } from 'react';
import axios from "axios";
import io from "socket.io-client";
import Header from "./common/header"

function Chat(){
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [messages, setMessages] = useState([]);
    const baseURL = "http://localhost:5000/api/";
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    const SOCKET_URL = "http://localhost:5000";
    const socket = io(SOCKET_URL);

    useEffect(()=>{
        axios.get(baseURL+'user',config)
        .catch((error)=>{
            console.log(error.response.data)
        }).then((res) => {
            let data = res.data
            socket.emit("user_connected", data);
            setUser(data)
        });

        axios.get(baseURL+'users',config)
        .catch((error)=>{
            console.log(error.response.data)
        }).then((res) => {
            let data = res.data
            setUsers(data)
        });

    },[])

    socket.on('new_message',(content)=>{
        setMessages(messages => [...messages, content])
    })

    const handleUserClick = (e,user_id,email) => {
        let target = e.target
        let elems = [...document.querySelectorAll('ul.user-list li')]
        elems.forEach((elem)=>{
            elem.classList.remove('active')
        })

        target.classList.add('active')
        setSelectedUser({_id:user_id,email:email})
    }


    const sendMessage = () => {
        let message = document.querySelector('input').value
        let content = {...selectedUser,message:message,socket_id:socket.id}
        socket.emit('send_message',content)
        setMessages(messages => [...messages, {type:'mine',message:message}])
        
        document.querySelector('input').value = ''
    }

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = '/'
    }

    const handleCallback = (childData) =>{
        alert(childData)
    }

    return (
        <div className="container users">
            <div className="row">
            <Header parentCallback = {handleCallback} />

                <div className="col-12 d-flex" style={{ justifyContent:'start' }}>
                    <div className="col-4">
                        <h3>Users</h3>
                        <ul className="user-list">
                            {users.map((elem)=>{
                                return (
                                    <li id="1" key={elem._id} onClick={(e)=>handleUserClick(e,elem._id,elem.email)}> {elem.email} </li>
                                    )
                            })}
                        </ul>
                    </div>

                    <div className="col-6 ms-5">
                        <h3>Chat Box  &nbsp;{ selectedUser.email }</h3>
                        <div className="chatBox">
                            {
                                messages.map((elem)=>{
                                    return ( <p key={elem._id} className={elem.type}>{elem.message}</p> ) 
                                })
                            }
                        </div>
                        <input type="text" placeholder='Type message' className="message mt-4"/>
                        <button className="send-message btn btn-primary d-block mt-4" onClick={sendMessage}> send message</button>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Chat;