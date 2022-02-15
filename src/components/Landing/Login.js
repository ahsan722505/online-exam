import React from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { firstActions } from '../../store/first-slice';
import { useNavigate } from 'react-router';
const Login = () => {
    // alert("yes")
    const nameRef=useRef();
    const passRef=useRef();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const loginHandler=(e)=>{
        e.preventDefault();
        console.log(nameRef.current.value,passRef.current.value);
        const graphqlQuery = {
            query: `
            query UserLogin($username: String, $password: String) {
                login(username : $username , password : $password) {
                  role
                  userId
                  token
                }
              }
            `,
            variables : {
                username : nameRef.current.value,
                password : passRef.current.value
            }
          };
          fetch("http://localhost:8080/graphql",{
            method : "POST",
            headers : {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(graphqlQuery)
          }).then(res=>  res.json()).then(resData=>{
              if(!resData.errors){
                navigate(`/${resData.data.login.role}`);
                localStorage.setItem("token",resData.data.login.token);
              }

        }).catch(err=>console.log(err));

    }
  return (
    <form onSubmit={loginHandler}>
        <input ref={nameRef} type="text" placeholder="Enter username"/>
        <input ref={passRef} type="password" placeholder="Enter passsword"/>
        <button type="submit">login</button>
        
    </form>
  )
}

export default Login