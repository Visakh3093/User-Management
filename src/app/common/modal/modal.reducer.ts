import { createReducer, on } from "@ngrx/store"
import { setModal } from "./modal.action"


export const initialState:{popup:boolean,email?:string} = {
    popup:false,
    email:''
}

export const modalReducer = createReducer(
    initialState,
    on(setModal,(state,{popup,email})=>({...state,popup,email}))
)
