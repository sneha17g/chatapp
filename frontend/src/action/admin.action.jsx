 import { postrequest } from "./helper"
 export const signupAction = (data)=>{
     return  postrequest("user/signup",data).then(res => { return res?.data})
}
 export const userLoginAction = (data)=>{
     return  postrequest("user/userlogin",data).then(res => { return res?.data})
}