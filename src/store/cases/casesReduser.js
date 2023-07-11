const initialState = {
    cases: [],
    selectedCase: {},
    isLoading: false
}

const SET_CASES = "SET_CASES"
const SET_CASES_LOADING = "SET_CASES_LOADING"
const SET_SELECTED_CASE = "SET_SELECTED_CASE"

export const casesReduser = (state = initialState, action) => {
    switch(action.type) {
        case SET_CASES:
            return {...state, cases: action.payload}
        case SET_CASES_LOADING:
            return {...state, isLoading: action.payload}
        case SET_SELECTED_CASE:
            return {...state, selectedCase: action.payload}
        default:
            return state
    }
}

export const setCases = (payload) => ({type: SET_CASES, payload})
export const setCasesLoading = (payload) => ({type: SET_CASES_LOADING, payload})
export const setSelectedCase = (payload) => ({type: SET_SELECTED_CASE, payload})

