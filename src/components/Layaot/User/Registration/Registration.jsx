import { useState } from "react"
import { useDispatch } from "react-redux"

import { registration } from "../../../../store/authorization/authAsyncAction"

import { useInput } from "../../../../hooks/useInput"

export const Registration = ({ setVisible }) => {
    const dispatch = useDispatch()

    const email = useInput("", {isEmpty: true, isEmail: true})
    const password = useInput("", {isEmpty: true, minLength: 3, maxLength: 8})
    const firstName = useInput("", {isEmpty: true, minLength: 3})
    const lastName = useInput("", {isEmpty: true, minLength: 3})

    const onRegistration = () => {
        dispatch(registration(email.value, password.value, firstName.value, lastName.value))
        email.setValue("")
        email.setIsDirty(false)
        password.setValue("")
        password.setIsDirty(false)
        firstName.setValue("")
        firstName.setIsDirty(false)
        lastName.setValue("")
        lastName.setIsDirty(false)
        setVisible(false)
    }

    return (
        <>
            <div>
                <h2>Регистрация</h2>
                <div>
                    { (email.isDirty && email.isEmpty) && <div style={{color: "red"}}>{email.emptyError}</div>}
                    { (email.isDirty && email.isEmail) && <div style={{color: "red"}}>{email.isEmailError}</div>}
                    <input 
                        onChange={(e) => email.onChange(e)}
                        onBlur={(e) => email.onBlur(e)}
                        value={email.value}
                        name="email"
                        type="text"
                        placeholder="Введите email"
                    />
                </div>
                <div>
                    { (password.isDirty && password.isEmpty) && <div style={{color: "red"}}>{password.emptyError}</div>}
                    { (password.isDirty && password.minLength) && <div style={{color: "red"}}>{password.minLengthError}</div>}
                    { (password.isDirty && password.maxLength) && <div style={{color: "red"}}>{password.maxLengthError}</div>}
                    <input 
                        onChange={(e) => password.onChange(e)}
                        onBlur={(e) => password.onBlur(e)}
                        value={password.value}
                        name="password"
                        type="password"
                        placeholder="Введите пароль"
                    />
                </div>
                <div>
                    { (firstName.isDirty && firstName.isEmpty) && <div style={{color: "red"}}>{firstName.emptyError}</div>}
                    { (firstName.isDirty && firstName.minLength) && <div style={{color: "red"}}>{firstName.minLengthError}</div>}
                    <input 
                        onChange={(e) => firstName.onChange(e)}
                        onBlur={(e) => firstName.onBlur(e)}
                        value={firstName.value}
                        name="firstName"
                        type="text"
                        placeholder="Введите Имя"
                    />
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
                        placeholder="Введите Фамилию"
                    />
                </div>

                <div>___</div>

                <button 
                    onClick={onRegistration}
                    disabled={!email.isInputValid || !password.isInputValid || !firstName.isInputValid || !lastName.isInputValid}
                >Зарегистрироваться</button>
            </div>
        </>
    )
}