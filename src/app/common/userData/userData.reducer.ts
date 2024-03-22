import { createReducer,on } from "@ngrx/store"
import { setUserList } from "./userData.action"
import { User } from "../../models/commonModel.interface"


export interface InitialState {
    UserList:User[]
}
const initialState:InitialState ={
    UserList:[]
}

export const userDataReducer = createReducer(
    initialState,
    on(setUserList,(state,{UserList})=>({...state,UserList:UserList}))
)