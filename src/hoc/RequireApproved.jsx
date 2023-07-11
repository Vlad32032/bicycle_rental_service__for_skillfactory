import { useSelector } from "react-redux"
import { useLocation, Navigate } from "react-router-dom"

export const RequireApproved = ({ children }) => {
    const location = useLocation()
    const isApproved = useSelector(state => state.userState.user.approved)

    if ( !isApproved) {
        return <Navigate to="/not_approved" state={{from: location}}/>
    }

    return children
}