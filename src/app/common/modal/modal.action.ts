import { createAction, props } from "@ngrx/store";

export const setModal = createAction('[modal] modalValue',props<{popup:boolean,email?:string}>())