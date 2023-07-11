import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { authReduser } from "./authorization/authReduser";
import { officersReduser } from "./officers/officersReduser";
import { casesReduser } from "./cases/casesReduser";

const rootReduser = combineReducers({
    userState: authReduser,
    officers: officersReduser,
    cases: casesReduser
});

export const store = createStore(rootReduser, applyMiddleware(thunk));