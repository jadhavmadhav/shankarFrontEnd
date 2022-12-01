import React,{useState} from 'react';
import { deleteUserById, getAllUsers, getUserById, postUser, putUserData } from '../service/service';






const Form = ({getUsersInfo,userData}) => {
     const [EmaiValidation, setEmaiValidation] = useState(false)

     const [confirmPassword, setconfirmPassword] = useState(false);
     
     const [formData, setFormData] = useState()
 
     const handleChangeForm = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value })
     }
 
     const postObject = {
          userName: formData?.userName,
          email: formData?.email,
          password: formData?.password
     }
     
     const handleUpdate = async () => {
          const userId = formData?.userId
          try {
               const req = await putUserData(userId, postObject)
               const res = await req.data
               if (res.status === 200) {
                    setFormData({ userId: '', userName: '', email: '', password: '', confirmPassword: '' })
                    getUsersInfo()
                     
               }


          } catch (error) {
               console.log(error)
          }
     }


     const handleAddUser = async () => {
          try {
               const req = await postUser(postObject)
               const res = req.data
               console.log(res)
               res.status === 200 && getUsersInfo()
               res.status === 404 ? setEmaiValidation(true) : setEmaiValidation(false)
               setFormData({ userName: '', email: '', password: '', confirmPassword: '' })
          }
          catch (err) {
               console.log(err)
          }
     }

     React.useEffect(()=>{
          userData&&setFormData(userData)
     },[])
     return (
          <div className='add-form'>
               <div className='form-field'>
                    <input type="text" name='userName' value={formData && formData.userName} onChange={handleChangeForm} placeholder='Enter User Name' autoComplete='off' required />
               </div>
               <div className='form-field'>
                    {EmaiValidation && <span>please Enter currect email</span>}
                    <input type="email" disabled={userData&&true}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" name='email' value={formData && formData.email} onChange={handleChangeForm} placeholder='Enter Email' autoComplete='off' required />
               </div>
               <div className='form-field'>
                    <input type="password" name='password' value={formData && formData.password} onChange={handleChangeForm} placeholder='Enter Password' autoComplete='off' required />
               </div>
               <div className='form-field'>
                    {confirmPassword && <span>please enter currect password</span>}
                    <input type="password" name='confirmPassword' value={formData && formData.confirmPassword} onChange={handleChangeForm} placeholder='confirm password' autoComplete='off' required />
               </div>

               <div className='form-field'>
                    {
                         <button className='add-button' onClick={userData? handleUpdate: handleAddUser}> Submit</button>
                    }
               </div>
          </div>
     );
}

export default Form;
