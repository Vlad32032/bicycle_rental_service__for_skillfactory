import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { approvedOfficer, deleteOfficer, getSelectedOfficer, redactFirstNameOfficer, redactLastNameOfficer } from "../../store/officers/officersAsyncAction"
import { logout } from "../../store/authorization/authReduser"

import { useInput } from "../../hooks/useInput"

import { MyModal } from "../../components/UI/MyModal/MyModal"

export const OfficerDetailpage = () => {
    const dispatch = useDispatch()
    const selectedOfficer = useSelector(state => state.officers.selectedOfficer)
    const isLoading = useSelector(state => state.officers.isLoading)
    const authUserId = useSelector(state => state.userState.user.id)

    const { id } = useParams()
    const navigate = useNavigate()
    
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [redactModalVisible, setRedactModalVisible] = useState(false)
    const [redactMod, setRedactMod] = useState("")
    const [approved, setApproved] = useState(false)

    const firstName = useInput("", {isEmpty: true, minLength: 3})
    const lastName = useInput("", {isEmpty: true, minLength: 3})

    useEffect(() => {
        dispatch(getSelectedOfficer(id))
    }, [])

    const openRedactModal = (type) => {
        setRedactMod(type)
        setRedactModalVisible(true)
    }

    const redactThisOfficer = () => {
        if(redactMod === "firstName") {
            dispatch(redactFirstNameOfficer(id, firstName.value))
            firstName.setValue("")
            firstName.setIsDirty(false)
        }
        if(redactMod === "lastName") {
            dispatch(redactLastNameOfficer(id, lastName.value))
            lastName.setValue("")
            lastName.setIsDirty(false)
        }
        setRedactModalVisible(false)
    }

    const deleteThisOfficer = () => {
        dispatch(deleteOfficer(id))
        setDeleteModalVisible(false)

        if (authUserId === id) {
            logout()
        }
        
        navigate(-1)
    }

    
    return (
        <div>
            <div className="officer_card">
                <button onClick={() => navigate(-1)}>Вернуться назад</button>
                <h2>Сотрудник:</h2>
                { isLoading
                    ? <>
                        <div>Идет загрузка:</div>
                    </>
                    : <>
                        <div>
                            <h3>{`${selectedOfficer.firstName} ${selectedOfficer.lastName}`}</h3>
                            { selectedOfficer.approved 
                                ? <h4 style={{color: "green"}}>Одобренный сотрудник</h4>
                                : <h4 style={{color: "red"}}>сотрудник не одобрен</h4>
                            }
                            
                            <div>{`Email сотрудника: ${selectedOfficer.email}`}</div>
                            <div>{`ID сотрудника: ${selectedOfficer._id}`}</div>
                        </div>

                        <div>___</div>

                        <div>
                            { (firstName.isDirty && firstName.isEmpty) && <div style={{color: "red"}}>{firstName.emptyError}</div>}
                            { (firstName.isDirty && firstName.minLength) && <div style={{color: "red"}}>{firstName.minLengthError}</div>}
                            <input
                                onChange={(e) => firstName.onChange(e)}
                                onBlur={(e) => firstName.onBlur(e)}
                                value={firstName.value}
                                name="firstNam"
                                type="text"
                                placeholder="Изменить имя"
                            />
                            <button 
                                onClick={() => openRedactModal("firstName")}
                                disabled={!firstName.isInputValid}
                            >редактировать</button>
                        </div>
                        <div>
                            { (lastName.isDirty && lastName.isEmpty) && <div style={{color: "red"}}>{lastName.emptyError}</div>}
                            { (lastName.isDirty && lastName.minLength) && <div style={{color: "red"}}>{lastName.minLengthError}</div>}
                            <input
                                onChange={(e) => lastName.onChange(e)}
                                onBlur={(e) => lastName.onBlur(e)}
                                value={lastName.value}
                                name="lastName"
                                type="text"
                                placeholder="Изменить фамилию"
                            />
                            <button 
                                onClick={() => openRedactModal("lastName")}
                                disabled={!lastName.isInputValid}
                            >редактировать</button>
                        </div>

                        <div>___</div>

                        { !selectedOfficer.approved && 
                            <div>
                                Одобрить сотрудника
                                <input
                                    onChange={() => setApproved(!approved)}
                                    checked={approved}
                                    type="checkbox"
                                />
                            { approved && 
                                <button onClick={() => dispatch(approvedOfficer(id, approved))}>Подтвердить</button>
                            }
                            </div>
                        }
                        <div>___</div>

                        <button onClick={() => setDeleteModalVisible(true)}>Удалить этого сотрудника</button>

                        {/* Модальное окно редактирования */}
                        { redactModalVisible && 
                            <MyModal visible={redactModalVisible} setVisible={setRedactModalVisible}>
                                <h3>Подтвердить изменения?</h3>
                                <button 
                                    style={{color: "green"}}
                                    onClick={redactThisOfficer}
                                >Подтвердить</button>
                                <button
                                    style={{color: "red"}}
                                    onClick={() => setRedactModalVisible(false)}
                                >Отменить</button>
                            </MyModal>
                        }

                        {/* Модальное окно удаления */}
                        { deleteModalVisible &&
                            <MyModal visible={deleteModalVisible} setVisible={setDeleteModalVisible}>
                                <h2>Вы уверенны?</h2>
                                <h3>Сотрудник будет удален навсегда, без возможности восстановления</h3>
                                <button 
                                    style={{color: "green"}}
                                    onClick={deleteThisOfficer}
                                >Подтвердить</button>
                                <button
                                    style={{color: "red"}}
                                    onClick={() => setDeleteModalVisible(false)}
                                >Отменить</button>
                            </MyModal>
                        }
                    
                </>
            }
            </div>
        </div>
    )
}