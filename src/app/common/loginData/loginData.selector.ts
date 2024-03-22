import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginValue } from "./loginData.action";
import { User } from "../../models/commonModel.interface";


const loginValueState = createFeatureSelector<LoginValue>("loginValue")
const currentValueState = createFeatureSelector<User>("currentUser")

export const selectLoginValue = createSelector(
    loginValueState,
    (state)=>state.isLogin
)

export const selectCurrentValue = createSelector(
    currentValueState,
    (state)=>state
)

