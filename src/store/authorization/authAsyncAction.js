import AuthSevice from "../../api/services/AuthServise"
import { setAuht, setLoading, setUser } from "./authReduser"

export const registration = (email, password, clientId, firstName, lastName) => {
    return async function(dispatch) {
        try {
            await AuthSevice.registration(email, password, clientId, firstName, lastName)
        } catch (e) {
            console.log(e)
        }
    }
}

export const login = (email, password) => {
    return async function(dispatch) {
        dispatch(setLoading(true))
        try {
            await AuthSevice.login(email, password)
                .then( response => {
                    localStorage.setItem("token", response.data.data.token)
                    dispatch(setAuht(true))
                    dispatch(setUser(response.data.data.user))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export const checkAuth = () => {
    return async function(dispatch) {
        dispatch(setLoading(true))
        try {
            await AuthSevice.check()
                .then(response => {
                    localStorage.setItem("token", response.data.data.token)
                    dispatch(setAuht(true))
                    dispatch(setUser(response.data.data.user))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setLoading(false))
        }
    }
}