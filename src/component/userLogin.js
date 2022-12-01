import axios from 'axios';
import React, { useState } from 'react';
import { postUserLogin, putUserData } from '../service/service';
import './userLogin.css'

const UserLogin = ({ setisLogin }) => {
     const [user, setuser] = useState({ email: '', password: '' });
     const [wrongPassword, setwrongPassword] = useState(0);

     const handleChange = (e) => {
          setuser({ ...user, [e.target.name]: e.target.value })

     }

     const PostData = async () => {
          try {
               const request = await postUserLogin(user)
               const response = request.data
               setisLogin(true)

          } catch (err) {
               console.log(err.response.data)
               const userId = err.response.data.userId
               if (err.response.data.password === false) {
                    setwrongPassword(wrongPassword + 1)
                    const updateObj = {
                         status: 'block'
                    }
                    if (wrongPassword > 5) {
                         putUserData(userId, updateObj)
                         setwrongPassword(0)
                    }
               }
          }
     }


     const handleSubmit = () => {
          PostData()
     }

     return (
          <div className='login-container'>
               <div className='loginForm'>
                    <h4>User Login</h4>
                    <div className='login-filed'>
                         <input type='text' name='email' onChange={handleChange} placeholder='Enter user Email' required />
                    </div>
                    <div className='login-filed'>
                         <input type='text' name='password' onChange={handleChange} placeholder='Enter Password' required />
                    </div>
                    <div className='login-filed'>
                         <button onClick={handleSubmit}>
                              Submit
                         </button>
                    </div>
               </div>
          </div>
     );
}

export default UserLogin;
