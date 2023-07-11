const initialState = {
    user: {},
    isLoading: false,
    isAuth: false
}

const SET_AUHT = "SET_AUHT"
const SET_USER = "SET_USER"
const SET_LOADING = "SET_LOADING"
const SET_LOGOUT = "SET_LOGOUT"

export const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUHT:
            return {...state, isAuth: action.payload}
        case SET_USER:
            return {...state, user: action.payload}
        case SET_LOADING:
            return {...state, isLoading: action.payload}
        case SET_LOGOUT:
            return {...state, isAuth: false, user: {}}
        default:
            return state
    }
}

export const setAuht = (payload) => ({type: SET_AUHT, payload})
export const setUser = (payload) => ({type: SET_USER, payload})
export const setLoading = (payload) => ({type: SET_LOADING, payload})
export const logout = () => {
    localStorage.removeItem("token")
    return ({type: SET_LOGOUT})
}