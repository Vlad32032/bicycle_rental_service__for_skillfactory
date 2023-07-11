import CasesSevice from "../../api/services/CasesServise";
import { setCases, setCasesLoading, setSelectedCase } from "./casesReduser";

export const postCasePablic = (ownerFullName, licenseNumber, type, color, description) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.createCasePublic(ownerFullName, licenseNumber, type, color, description)
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
            console.log("pablic post")
        }
    }
}

export const postCase = (ownerFullName, licenseNumber, type, color, description) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.createCase(ownerFullName, licenseNumber, type, color, description)
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const getAllCases = () => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.getAllCases()
                .then(response => {
                    dispatch(setCases(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const getSelectedCases = (id) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.getOneCase(id)
                .then(response => {
                    dispatch(setSelectedCase(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const putCasesStatus = (id, status) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.putCaseStatus(id, status)
                .then(response => {
                    dispatch(setSelectedCase(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const putCasesResolution = (id, status, resolution) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.putCaseResolution(id, status, resolution)
                .then(response => {
                    dispatch(setSelectedCase(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const putCasesType = (id, type) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.putCaseType(id, type)
                .then(response => {
                    dispatch(setSelectedCase(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const putCasesColor = (id, color) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.putCaseColor(id, color)
                .then(response => {
                    dispatch(setSelectedCase(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const putCaseDescription = (id, description) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.putCaseDescription(id, description)
                .then(response => {
                    dispatch(setSelectedCase(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const putCasesOwnerFullName = (id, ownerFullName) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.putCaseOwnerFullName(id, ownerFullName)
                .then(response => {
                    dispatch(setSelectedCase(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const putCaseOfficer = (id, officer) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.putCaseOfficer(id, officer)
                .then(response => {
                    dispatch(setSelectedCase(response.data.data))
                })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}

export const deleteSelectedCases = (id) => {
    return async function(dispatch) {
        dispatch(setCasesLoading(true))
        try {
            await CasesSevice.deleteCase(id)
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setCasesLoading(false))
        }
    }
}
