import { useState } from "react"
import { useDispatch } from "react-redux"

import { login } from "../../../../store/authorization/authAsyncAction"

import { useInput } from "../../../../hooks/useInput"

export const Authorization = ({ setVisible }) => {
    const dispatch = useDispatch()

    const email = useInput("", {isEmpty: true, isEmail: true})
    const password = useInput("", {isEmpty: true, minLength: 3, maxLength: 8})

    const onLogin = () => {
        dispatch(login(email.value, password.value))
        email.setValue("")
        email.setIsDirty(false)
        password.setValue("")
        password.setIsDirty(false)
        setVisible(false)
    }

    return (
        <>
            <div>Авторизация</div>
            <div>
                { (email.isDirty && email.isEmpty) && <div style={{color: "red"}}>{email.emptyError}</div>}
                { (email.isDirty && email.isEmail) && <div style={{color: "red"}}>{email.isEmailError}</div>}
                <input
                    onChange={(e) => email.onChange(e)}
                    onBlur={(e) => email.onBlur(e)} 
                    value={email.value}
                    name="email"
                    type="text"
                    placeholder="Введите Email"
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
            <button
                onClick={onLogin}
                disabled={!email.isInputValid || !password.isInputValid}
            >login</button>
        </>
    )
}