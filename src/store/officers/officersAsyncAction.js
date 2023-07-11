import OfficersServise from "../../api/services/OfficersServise"
import { setOfficers, setOfficersLoading, setSelectedOfficer } from "./officersReduser"

export const createNewOffcer = () => {
    return async function(dispatch) {
        dispatch(setOfficersLoading(true))
        try {
            await OfficersServise.getAllOfficers()
                // .then( response => {
                //     dispatch(setOfficers(response.data.officers))
                // })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setOfficersLoading(false))
        }
    }
}

export const getAllOfficers = () => {
    return async function(dispatch) {
        dispatch(setOfficersLoading(true))
        try {
            await OfficersServise.getAllOfficers()
                .then( response => {
                    dispatch(setOfficers(response.data.officers))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setOfficersLoading(false))
        }
    }
}

export const getSelectedOfficer = (id) => {
    return async function(dispatch) {
        dispatch(setOfficersLoading(true))
        try {
            await OfficersServise.getOfficer(id)
            .then(response => {
                dispatch(setSelectedOfficer(response.data.data))
            })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setOfficersLoading(false))
        }
    }
}



export const approvedOfficer = (id, approved) => {
    return async function(dispatch) {
        dispatch(setOfficersLoading(true))
        try {
            await OfficersServise.approvedOfficer(id, approved)
                .then(response => {
                    dispatch(setSelectedOfficer(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setOfficersLoading(false))
        }
    }
}

export const redactFirstNameOfficer = (id, firstName) => {
    return async function(dispatch) {
        dispatch(setOfficersLoading(true))
        try {
            await OfficersServise.redactFirstNameOfficer(id, firstName)
                .then(response => {
                    dispatch(setSelectedOfficer(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setOfficersLoading(false))
        }
    }
}

export const redactLastNameOfficer = (id, lastName) => {
    return async function(dispatch) {
        dispatch(setOfficersLoading(true))
        try {
            await OfficersServise.redactLastNameOfficer(id, lastName)
                .then(response => {
                    dispatch(setSelectedOfficer(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setOfficersLoading(false))
        }
    }
}

export const deleteOfficer = (id) => {
    return async function(dispatch) {
        dispatch(setOfficersLoading(true))
        try {
            await OfficersServise.deleteOfficer(id)
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setOfficersLoading(false))
        }
    }
}