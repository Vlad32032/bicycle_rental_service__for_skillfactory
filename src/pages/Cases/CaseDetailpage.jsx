import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"

import { deleteSelectedCases, getSelectedCases, putCaseDescription, putCaseOfficer, putCasesColor, putCasesOwnerFullName, putCasesResolution, putCasesStatus, putCasesType } from "../../store/cases/casesAsyncAction"

import { useInput } from "../../hooks/useInput"

import { MyModal } from "../../components/UI/MyModal/MyModal"
import { getAllOfficers } from "../../store/officers/officersAsyncAction"

export const CaseDetailpage = () => {
    const dispatch = useDispatch()
    const officers = useSelector(state => state.officers.officers)
    const selectedCase = useSelector(state => state.cases.selectedCase)
    const isLoading = useSelector(state => state.cases.isLoading)

    const { id } = useParams()
    const navigate = useNavigate()

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [redactModalVisible, setRedactModalVisible] = useState(false)
    const [redactMod, setRedactMod] = useState("")
    const [approved, setApproved] = useState(false)
    const [status, setStatus] = useState("")

    const [caseValue, setCaseValue] = useState({
        type: "sport",
        color: "red"
    })
    const [officerId, setOfficerId] = useState("")
    const ownerFullName = useInput("", {isEmpty: true, minLength: 7})
    const description = useInput("", {isEmpty: true, minLength: 10, maxLength: 100})
    const resolution = useInput("", {isEmpty: true, minLength: 10, maxLength: 100})

    useEffect(() => {
        dispatch(getSelectedCases(id))
        dispatch(getAllOfficers())
    }, [])

    useEffect(() => {
        if (selectedCase.status === "new") {
            setStatus("in_progress")
        }
        if (selectedCase.status === "in_progress") {
            setStatus("done")
        }
    }, [approved])

    const openRedactModal = (type) => {
        setRedactMod(type)
        setRedactModalVisible(true)
    }

    const redactThisCase = () => {
        const { type, color } = caseValue

        if(redactMod === "type") {
            dispatch(putCasesType(id, type))
        }
        if(redactMod === "color") {
            dispatch(putCasesColor(id, color))
        }
        if(redactMod === "ownerFullName") {
            dispatch(putCasesOwnerFullName(id, ownerFullName.value))
            ownerFullName.setValue("")
            ownerFullName.setIsDirty(false)
        }
        if(redactMod === "description") {
            dispatch(putCaseDescription(id, description.value))
            description.setValue("")
            description.setIsDirty(false)
        }
        if(redactMod === "officer") {
            dispatch(putCaseOfficer(id, officerId))
        }

        setRedactModalVisible(false)
    }

    const changeStatus = () => {
        if (selectedCase.status === "in_progress") {
            dispatch(putCasesResolution(id, status, resolution.value))
        } else {
            dispatch(putCasesStatus(id, status))
        }
        
        setApproved(!approved)
    }

    const deleteThisCase = () => {
        dispatch(deleteSelectedCases(id))
        setDeleteModalVisible(false)
        navigate(-1)
    }

    return (
        <div className="selected_case">
            <button onClick={() => navigate(-1)}>Вернуться назад</button>
            <h2>Выбранный случай</h2>
            { isLoading
                ? <>
                    <div>Идет загрузка:</div>
                </>
                :<>
                    <div>{`Номер лицензии: ${selectedCase.licenseNumber}`}</div>
                    <div>{`Заявитель: ${selectedCase.ownerFullName}`}</div>
                    <div>{`Тип: ${selectedCase.type}`}</div>
                    <div>{`Цвет: ${selectedCase.color}`}</div>
                    <div>{`Описание: ${selectedCase.description}`}</div>
                    <div>{`Id cотрудника: ${selectedCase.officer}`}</div>
                    <div>{`Статус: ${selectedCase.status}`}</div>
                    

                    <div>___</div>

                    <div>
                        <div>
                            { (ownerFullName.isDirty && ownerFullName.isEmpty) && <div style={{color: "red"}}>{ownerFullName.emptyError}</div>}
                            { (ownerFullName.isDirty && ownerFullName.minLength) && <div style={{color: "red"}}>{ownerFullName.minLengthError}</div>}
                            <input 
                                onChange={(e) => ownerFullName.onChange(e)}
                                onBlur={(e) => ownerFullName.onBlur(e)}
                                value={ownerFullName.value}
                                name="ownerFullName"
                                type="text"
                                placeholder="Редактировать Имя и Фамилию"
                            />
                            <button 
                                onClick={() => openRedactModal("ownerFullName")}
                                disabled={!ownerFullName.isInputValid}
                            >Подтвердить</button>
                        </div>
                        <div>
                            { (description.isDirty && description.isEmpty) && <div style={{color: "red"}}>{description.emptyError}</div>}
                            { (description.isDirty && description.minLength) && <div style={{color: "red"}}>{description.minLengthError}</div>}
                            { (description.isDirty && description.maxLength) && <div style={{color: "red"}}>{description.maxLengthError}</div>}
                            <input 
                                onChange={(e) => description.onChange(e)}
                                onBlur={(e) => description.onBlur(e)}
                                value={description.value}
                                name="description"
                                type="text"
                                placeholder="Редактировать описание"
                            />
                            <button 
                                onClick={() => openRedactModal("description")}
                                disabled={!description.isInputValid}
                            >Подтвердить</button>
                        </div>
                    </div>

                    <div>___</div>

                    <div>
                        <label htmlFor="typeSelect">Выберете тип:</label>
                        <select 
                            onChange={e => {setCaseValue({...caseValue, type: e.target.value})}}
                            value={caseValue.type}
                            name="type"
                            id="typeSelect"
                        >
                            <option value="sport">sport</option>
                            <option value="general">general</option>
                        </select>
                        <button onClick={() => openRedactModal("type")}>Подтвердить</button>
                    </div>
                    <div>
                        <label htmlFor="typeSelect">Выберете цвет:</label>
                        <select 
                            onChange={e => {setCaseValue({...caseValue, color: e.target.value})}}
                            value={caseValue.color}
                            name="type"
                            id="typeSelect"
                        >
                            <option value="red">red</option>
                            <option value="blue">blue</option>
                            <option value="green">green</option>
                            <option value="yellow">yellow</option>
                        </select>
                        <button onClick={() => openRedactModal("color")}>Подтвердить</button>
                    </div>
                    <div>
                        <label htmlFor="typeSelect">Выберете сотрудника:</label>
                        <select 
                            onChange={e => setOfficerId(e.target.value)}
                            value={officerId}
                            name="type"
                            id="typeSelect"
                        >   
                            <option value="">выбрать:</option>

                            { officers.map((officer) => {
                                if(officer.approved ) {
                                    return (
                                        <option value={officer._id}>{`${officer.firstName} ${officer.lastName}`}</option>
                                    )
                                }
                            })}
                        </select>
                        <button onClick={() => openRedactModal("officer")}>Подтвердить</button>
                    </div>

                    <div>___</div>

                    { (selectedCase.status === "new") && 
                        <div>
                            Изменить статус на "in_progress"
                            <input
                                onChange={() => setApproved(!approved)}
                                checked={approved}
                                type="checkbox"
                            />
                            { approved && 
                                <button onClick={changeStatus}>Подтвердить</button>
                            }
                        </div>
                    }
                    
                    { (selectedCase.status === "in_progress") && 
                        <div>
                            Изменить статус на "done"
                            <input
                                onChange={() => setApproved(!approved)}
                                checked={approved}
                                type="checkbox"
                            />
                            { approved && 
                                <div>
                                    <div>Введите завершающий коментарий</div>
                                    <div>
                                        { (resolution.isDirty && resolution.isEmpty) && <div style={{color: "red"}}>{resolution.emptyError}</div>}
                                        { (resolution.isDirty && resolution.minLength) && <div style={{color: "red"}}>{resolution.minLengthError}</div>}
                                        { (resolution.isDirty && resolution.maxLength) && <div style={{color: "red"}}>{resolution.maxLengthError}</div>}
                                        <input 
                                            onChange={(e) => resolution.onChange(e)}
                                            onBlur={(e) => resolution.onBlur(e)}
                                            value={resolution.value}
                                            name="resolution"
                                            type="text"
                                            placeholder="Завершающий комментарий"
                                        />
                                    </div>
                                    <button 
                                        onClick={changeStatus}
                                        disabled={!resolution.isInputValid}
                                    >Подтвердить</button>
                                </div>
                                // 
                            }
                        </div>
                    }

                    { (selectedCase.status === "done") && 
                        <div>{`Завершающий комментарий: ${selectedCase.resolution}`}</div>
                    }
                    
                    <button onClick={() => console.log(officerId)}>info</button>    

                    <button onClick={() => setDeleteModalVisible(true)}>Удалить</button>
                </>
            }
            <div></div>

            {/* Модальное окно редактирования */}
            { redactModalVisible && 
                <MyModal visible={redactModalVisible} setVisible={setRedactModalVisible}>
                    <h3>Подтвердить изменения?</h3>
                    <button 
                        style={{color: "green"}}
                        onClick={redactThisCase}
                    >Подтвердить</button>
                    <button
                        style={{color: "red"}}
                        onClick={() => setRedactModalVisible(false)}
                    >Отменить</button>
                </MyModal>
            }

            {/* Модальное окно удаления */}
            <MyModal visible={deleteModalVisible} setVisible={setDeleteModalVisible}>
                <h2>Вы уверенны?</h2>
                <h3>Случай будет удален навсегда, без возможности восстановления</h3>
                <button 
                    style={{color: "green"}}
                    onClick={deleteThisCase}
                >Подтвердить</button>
                <button
                    style={{color: "red"}}
                    onClick={() => setDeleteModalVisible(false)}
                >Отменить</button>
            </MyModal>
        </div>
    )
}