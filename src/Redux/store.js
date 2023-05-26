import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import errorsReducer from "./error";

export default configureStore({
    reducer:{
        user: userReducer,
        errors: errorsReducer
    }
})