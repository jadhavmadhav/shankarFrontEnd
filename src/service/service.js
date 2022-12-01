import http from "../httpCommn"


export const getAllUsers=()=>{
     return http.get('/users')
}

export const deleteUserById=(userId)=>{
     return http.delete(`/delete-user/${userId}`)
}

export const putUserData = (userId,updateObject)=>{
     return http.put(`/putuser/${userId}`,updateObject)
}

export const postUserLogin=(user)=>{
     return http.post(`/userlogin`,user)
}


export const postUser = (postObject)=>{
     return http.post(`/user`,postObject)
}

export const getUserById =(userId)=>{
     return http.get(`/user/${userId}`)
}