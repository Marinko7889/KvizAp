import {combineReducers, configureStore} from "@reduxjs/toolkit"
import  questionReducer  from "./question_reducer"
import  resultReducer  from "./result_reducer"
import  authSlice  from "./inde"
const rootReducer=combineReducers({
    questions:questionReducer,
    result:resultReducer,
    auth:authSlice
})

export default configureStore({reducer:rootReducer})