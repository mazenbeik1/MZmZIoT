import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: "user",
    initialState:{
        uid: '',
        email: 'Guest',
        signStatus: 'Signin'
    },
    reducers:{
        _setUser:(state, action)=>{
            state.email = action.payload.email;
            state.uid = action.payload.uid;
            console.log('user was set');
            state.signStatus = "Signout";
            localStorage.setItem('aguid', action.payload.uid);
            localStorage.setItem('email', action.payload.email);
        },
        _resetUser:(state)=>{
            state.email = "Guest";
            state.uid = "";
            console.log('user was reset');
            state.signStatus = "Signin";
            localStorage.removeItem("aguid");
            localStorage.removeItem("email");
        }
    }
});

export const {_setUser,_resetUser} = userReducer.actions;

export default userReducer.reducer;
