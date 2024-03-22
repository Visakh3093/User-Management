import { createAction, props } from "@ngrx/store";
import { User } from "../../models/commonModel.interface";

export const setUserList = createAction('[userData] UserList',props<{UserList:User[]}>())
