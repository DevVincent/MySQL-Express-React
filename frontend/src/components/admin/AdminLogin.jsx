import React, { useState} from 'react'
import './Admin.css'


const AdminLogin = (props) => {
    const [user, setUser] = useState({
        userName:"",
        password:""
    });
    const PORT = 4000;
    const [message, setMessage] = useState('Status');

    let adminFormClasses = 'admin-form';
    if(props.show){
        adminFormClasses = 'admin-form show';
    }

    const loginUser = (event) => {
       console.log("logging successfull "+user.userName+" "+user.password)
       fetch(`http://localhost:${PORT}/loggin?username=${user.userName}&password=${user.password}`)
        .then(response => response.json())
        .then(({status}) => {
            console.log(status)
            if(status === "The user was found"){
                setMessage("User found")
                props.onTouch();
                props.onLogged();
            }else(setMessage("User not found"))
        })
        .catch(err => console.error(err))   
        
        event.preventDefault(); 
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevUser => {
            return {
                ...prevUser,
                [name]:value
            };
        });
    }

    return(
        <div className = {adminFormClasses}>
            <h1>
                Hello {user.userName}
            </h1>     
            <p>Enter your credentials to delete or add posts into the blog</p>
            <p>{message}</p>
            <form>
                <input
                    onChange={handleChange}
                    name="userName"
                    value={user.userName}
                    placeholder="Username"
                />
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    value={user.password}
                    placeholder="Password"
                />
                <button onClick={loginUser}>Submit</button>
            </form>
        </div>        
    )
}
export default AdminLogin;