const initialState = {
    officers: [],
    selectedOfficer: {},
    isLoading: false
}

const SET_OFFICERS = "SET_OFFICERS"
const SET_OFFICERS_LOADING = "SET_OFFICERS_LOADING"
const SET_SELECTED_OFFICER = "SET_SELECTED_OFFICER"

export const officersReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_OFFICERS:
            return {...state, officers: action.payload}
        case SET_OFFICERS_LOADING:
            return {...state, isLoading: action.payload}
        case SET_SELECTED_OFFICER:
            return {...state, selectedOfficer: action.payload}
        default:
            return state
    }
}

export const setOfficers = (payload) => ({type: SET_OFFICERS, payload})
export const setOfficersLoading = (payload) => ({type: SET_OFFICERS_LOADING, payload})
export const setSelectedOfficer = (payload) => ({type: SET_SELECTED_OFFICER, payload})