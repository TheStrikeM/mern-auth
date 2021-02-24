import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import userReducer from "./userReducer";
import loadReducer from "./loadReducer";


const rootReducer = combineReducers({
    user: userReducer,
    loading: loadReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store