import { createFeatureSelector, createSelector } from "@ngrx/store";

import { User } from "../../models/commonModel.interface";
import { InitialState } from "./userData.reducer";



export const userList = createFeatureSelector<InitialState>("UserList")

export const selectUserList = createSelector(
    userList,
    (state)=>state.UserList
)