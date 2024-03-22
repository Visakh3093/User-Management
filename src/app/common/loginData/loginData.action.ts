import { createAction, props } from "@ngrx/store";
import { User } from "../../models/commonModel.interface";

export interface LoginValue {
    isLogin:boolean
}


export const setLoginValue = createAction('[userLogin] loginValue',props<LoginValue>())

export const setCurrentUser = createAction('[userLogin] currentUser',props<User>())