import React, { useState } from 'react'
import '../css/Signup.css'
import {Link, useNavigate} from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../Firebase'
import {doc, setDoc} from "firebase/firestore"


function Signup() {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()
    const[displayName, setDisplayName] = useState('')

      const addToFirestore = async (u)=>{
          const userRef = doc(db, 'users', u.uid)
          await setDoc(userRef,{
            uid:u.uid,
            name: displayName || 'Guest',
            email:u.email
          }, {merge:true})
      }
    

    const createUser = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            addToFirestore(user)
            alert("Registered successfully, you can login now")
            navigate("/login") 

            // ...
        })
        .catch((error) => {
            alert("User already exists or bad credentials")
            setEmail('')
            setPassword('')
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

  return (
    <>
        <div className="lgn_container">
            
            <img src="/3.png" width="180px" style={{borderRadius:'12px'}}/>
           
            <div className='login_form'>
                <h1 style={{fontSize:'30px'}}>Sign up</h1>
                <div style={{width:'100%'}}>
                <label id="lbl">Username: </label>
                <input 
                id='inp'
                value={displayName}
                onChange={(event)=>setDisplayName(event.target.value)}
                />
                </div>
                <div style={{width:'100%'}}>
                <label id="lbl">Email:</label>

                <input 
                type="email" 
                id='inp'
                value={email}
                onChange={(event)=>{setEmail(event.target.value)}}
                />

                </div>
               
               <div style={{width:'100%'}}>
               <label id="lbl">Password:</label>
               <input 
               type="password" 
               id='inp'
               value={password}
               onChange={(event)=>{setPassword(event.target.value)}}
               />
               </div>


                <button onClick={createUser} id='login_btn'>Signup</button>

                <Link to="/login" style={{fontSize:'20px', textDecoration:"none"}}>Already registered? Login</Link>
            </div>
        </div>
    </>
  )
}

export default Signup