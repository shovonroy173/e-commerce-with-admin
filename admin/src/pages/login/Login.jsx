import { useState } from "react";
import {login} from "../../redux/apiCalls";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
const Login = () =>{
    const [username , setUser] = useState('');
    const [password , setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleClick = async(e)=>{
        e.preventDefault();
        login(dispatch , {username , password});
        navigate("/");
        console.log("clicked");
    }


    return (
        <div style={{
            height:"100vh" , 
            display:"flex" , 
            flexDirection:"column" , 
            alignItems:"center" ,
            justifyContent:"center"
        }} >
            <input 
            style={{padding:"10px" , marginBottom:"20px"}}
            type="text" placeholder="username" onChange={(e)=>setUser(e.target.value)} />
            <input 
            style={{padding:"10px" , marginBottom:"20px"}}
            type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleClick} >Login</button>
        </div>
    )
}
export default Login;