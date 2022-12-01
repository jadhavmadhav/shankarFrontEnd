import React, { useEffect, useState } from 'react';
import './UserManagement.css';
import { deleteUserById, getAllUsers, getUserById, postUser, putUserData } from '../service/service';
import Form from './Form';

const UserManagement = () => {
     const [editField, seteditField] = useState(false)
     const [addUser, setaddUser] = useState(false);
     const [Data, setData] = useState([]);
     const [userData, setuserData] = useState();

     const getUsersInfo = async () => {
          const req = await getAllUsers()
          const res = await req.data
          setData(res)
     }

     const handleDelete = async (userId) => {
          const result = window.confirm("Are you sure to delete?")
          if (result) {
               const req = await deleteUserById(userId)
               getUsersInfo()
          }

     }

     const handleEdit = async (userId) => { 
          try {
               const req = await getUserById(userId)
               const resp = await req.data
               setuserData(resp)
              console.log(resp)
          }
          catch (err) {
               console.log(err)
          }
          if(editField){
               seteditField(false)
          }else{
               seteditField(true)
               setaddUser(false)
          }
     }

     useEffect(() => {
          getUsersInfo()

     }, [])

     const hadleAddUser = () => {

          if (addUser) {
               setaddUser(false)
          } else { 
               setaddUser(true)  
               seteditField(false)
          }
     }
     return (
          <div className='user-management-container'>
               {editField && <Form getUsersInfo={getUsersInfo} userData={userData}  />}
               {addUser && <Form getUsersInfo={getUsersInfo} />}
               <div className='table-container'>
                    <div className='add-user'>
                         <button className='add-user-btn' onClick={hadleAddUser}>Add User</button>
                    </div>
                    <table>
                         <thead>
                              <tr>
                                   <th>User Name</th>
                                   <th>Email</th>
                                   <th>Opthion</th>
                              </tr>
                         </thead>
                         <tbody>
                              {Data.map((item) => {
                                   const { userId, userName, email } = item
                                   return (
                                        <tr key="userId">
                                             <td>{userName}</td>
                                             <td>{email}</td>
                                             <td>
                                                  <button>view</button>
                                                  <button onClick={() => handleEdit(userId)}>edit</button>
                                                  <button onClick={() => handleDelete(userId)}>delete</button>
                                             </td>
                                        </tr>
                                   )
                              })}
                         </tbody>
                    </table>
               </div>

          </div>
     );
}

export default UserManagement;
