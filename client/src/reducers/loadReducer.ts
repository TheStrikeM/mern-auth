const SET_LOADING = "SET_LOADING"

const initialState = {
    isLoaded: false
}

export default function(state = initialState, {type, payload}: {type: string, payload: any}) {
    switch(type) {
        case SET_LOADING:
            return {
                ...state,
                isLoaded: payload
            }
        default:
            return state
    }
}

export const setLoading = (payload: boolean) => ({type: SET_LOADING, payload: payload})