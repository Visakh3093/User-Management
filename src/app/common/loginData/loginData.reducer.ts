import { createReducer, on } from "@ngrx/store";
import { LoginValue, setCurrentUser, setLoginValue } from "./loginData.action";
import { User } from "../../models/commonModel.interface";



const initialValue:LoginValue = {
    isLogin:false
} 

const currentUserinitialValue:User = {
email:'',
isAdmin:false,
mobile:'',
password:'',
student_name:''
}


export const loginValueReducer = createReducer(
    initialValue,
    on(setLoginValue,(state,{isLogin})=>({...state,isLogin:isLogin}))
)

export const currentUserReducer = createReducer(
    currentUserinitialValue,
    on(setCurrentUser,(state,{email,isAdmin,mobile,password,student_name})=>({...state,email,isAdmin,mobile,password,student_name}))
)