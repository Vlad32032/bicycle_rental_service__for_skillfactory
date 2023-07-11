import { useEffect, useState } from "react"

export const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const emptyError = "Поле не может быть пустым"

    const [minLength, setMinLength] = useState(false)
    const [minLengthError, setMinLengthError] = useState("")

    const [maxLength, setMaxLength] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState("")

    const [isEmail, setIsEmail] = useState(false)
    const isEmailError = "Некоректный email"

    const [isInputValid, setIsInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "isEmpty" :
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break

                case "minLength" :
                    if (value.length < validations[validation]) {
                        setMinLength(true)
                        setMinLengthError(`Минимальная длина ${validations[validation]} символа`)
                    } else {
                        setMinLength(false)
                        setMinLengthError("")
                    }
                    break

                case "maxLength" :
                    if (value.length > validations[validation]) {
                        setMaxLength(true)
                        setMaxLengthError(`Mаксимальная длина ${validations[validation]} символа`)
                    } else {
                        setMaxLength(false)
                        setMaxLengthError("")
                    }
                    break
                
                case "isEmail" :
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    re.test(String(value).toLowerCase()) 
                        ? setIsEmail(false)
                        : setIsEmail(true)
                    
                    break
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLength || maxLength || isEmail) {
            setIsInputValid(false)
        } else {
            setIsInputValid(true)
        }
    }, [isEmpty, minLength, maxLength, isEmail])

    return {
        isEmpty,
        emptyError,

        minLength,
        minLengthError,

        maxLength,
        maxLengthError,

        isEmail,
        isEmailError,

        isInputValid
    }
}