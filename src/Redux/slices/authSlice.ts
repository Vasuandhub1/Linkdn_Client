import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


export interface AuthState{
    name:string,
    email:string,
    _id:string,
    profile:string,
    loading:boolean,
    profiletag:string
}


const initialState:AuthState = {
    name:"",
    email:"",
    _id:"",
    profile:"",
    loading:true,
    profiletag:""
} 

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        login:(state,action:PayloadAction<AuthState>)=>{
            state._id=action.payload._id
            state.email=action.payload.email
            state.name=action.payload.name
            state.profile=action.payload.profile
            state.loading=action.payload.loading||false
            state.profiletag=action.payload.profiletag
        },
        logout:(state)=>{
            state._id=""
            state.email=""
            state.name=""
        },
        update:(state,action:PayloadAction<AuthState>)=>{
            if(action.payload._id){
                state._id=action.payload._id
            }
            if(action.payload.email){
                state.email=action.payload.email
            }
            if(action.payload.name){
                state.name=action.payload.name
            }
            if(action.payload.profile){
                state.profile=action.payload.profile
            }
            if(action.payload.profiletag){
                state.profiletag=action.payload.profiletag
            }
            
        }
    }
})

export const {login,logout,update} = authSlice.actions
export default authSlice.reducer