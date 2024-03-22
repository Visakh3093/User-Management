import { createFeatureSelector, createSelector } from "@ngrx/store";



const modalInitialState = createFeatureSelector<{popup:boolean,email?:string}>("modal")

export const selectModal = createSelector(
    modalInitialState,
    (state)=>state
)
