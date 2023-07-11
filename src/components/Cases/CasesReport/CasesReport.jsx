import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { postCase, postCasePablic } from "../../../store/cases/casesAsyncAction"

import { useInput } from "../../../hooks/useInput"

export const CasesReport = ({ pablic, setVisible }) => {
    const dispatch = useDispatch()

    const ownerFullName = useInput("", {isEmpty: true, minLength: 7})
    const description = useInput("", {isEmpty: true, minLength: 10, maxLength: 100})

    const [caseValue, setCaseValue] = useState({
        licenseNumber: "",
        type: "sport",
        color: "red"
    })

    const getRandomLicenseNumber = () => {
        return (Math.random() + 1).toString(36).substring(2)
    }

    useEffect(() => {
        setCaseValue({...caseValue, licenseNumber: getRandomLicenseNumber()})
    }, [])

    const postNewCase = (e) => {
        const { licenseNumber, type, color } = caseValue
        if (pablic) {
            dispatch(postCasePablic(ownerFullName.value, licenseNumber, type, color, description.value))
        } else {
            dispatch(postCase(ownerFullName.value, licenseNumber, type, color, description.value))
        }
        ownerFullName.setValue("")
        description.setValue("")
        ownerFullName.setIsDirty(false)
        description.setIsDirty(false)

        setCaseValue({
            ...caseValue,
            type: "sport",
            color: "red"
        })
        setVisible(false)
    }


    return (
        <>
            <div>Сообщить о краже</div>
            <div>
                { (ownerFullName.isDirty && ownerFullName.isEmpty) && <div style={{color: "red"}}>{ownerFullName.emptyError}</div>}
                { (ownerFullName.isDirty && ownerFullName.minLength) && <div style={{color: "red"}}>{ownerFullName.minLengthError}</div>}
                <input 
                    onChange={(e) => ownerFullName.onChange(e)}
                    onBlur={(e) => ownerFullName.onBlur(e)}
                    value={ownerFullName.value}
                    name="ownerFullName"
                    type="text"
                    placeholder="Имя и фамилия"
                />
            </div>
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
                    placeholder="Описание"
                />
            </div>
            <button
                onClick={postNewCase}
                disabled={!ownerFullName.isInputValid || !description.isInputValid}
            >Отправить</button>
        </>
    )
}