import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../store/authorization/authReduser"
import { checkAuth } from "../../../store/authorization/authAsyncAction"

import style from "./User.module.css"

import { MyModal } from "../../UI/MyModal/MyModal" 
import { Authorization } from "./Authorization/Authorization"
import { Registration } from "./Registration/Registration"

export const User = () => {
    const dispatch = useDispatch()
    const userState = useSelector(state => state.userState)
    
    const [modalState, setModalState] = useState("auth")
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("token")) {
            dispatch(checkAuth())
        }
    }, [modalVisible])

    const openAuthorizationModal = () => {
        setModalState("auth")
        setModalVisible(true)
    }

    const openRegistrationModal = () => {
        setModalState("reg")
        setModalVisible(true)
    }

    return (
        <div className={style.user}>
            { userState.isAuth 
                ? <>
                    <div>{`${userState.user.firstName} ${userState.user.lastName}`}</div>
                    <button onClick={() => dispatch(logout())} >Выйти</button>
                </>
                : <>
                    <button onClick={openAuthorizationModal}>войти</button>
                    <button onClick={openRegistrationModal}>зарегистрироваться</button>
                </>
            }
            
            <MyModal visible={modalVisible} setVisible={setModalVisible}>
                { modalState === "auth"
                    ? <Authorization setVisible={setModalVisible} />
                    : <Registration setVisible={setModalVisible} />
                }
            </MyModal>
            
        </div>
    )
}