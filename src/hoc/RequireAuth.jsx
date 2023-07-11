import { useSelector } from "react-redux"
import { useLocation, Navigate } from "react-router-dom"

export const RequireAuth = ({ children }) => {
    const location = useLocation()
    const isAuth = useSelector(state => state.userState.isAuth)

    if ( !isAuth ) {
        return <Navigate to="/not_auth" state={{from: location}}/>
    }

    return children
}