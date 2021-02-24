const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"

const initialState = {
    currentUser: {},
    isAuth: false
}

export default function(state = initialState, {type, payload}: {type: string, payload: any}) {
    switch(type) {
        case SET_USER:
            return {
                ...state,
                currentUser: payload,
                isAuth: true
            }

        case LOGOUT:
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
            return state
    }
}

export const setUser = (user: any) => ({type: SET_USER, payload: user})
export const logoutUser = () => ({type: LOGOUT})