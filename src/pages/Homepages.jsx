import { useState } from "react"
import { useSelector } from "react-redux"

import { MyModal } from "../components/UI/MyModal/MyModal"
import { MyButton } from "../components/UI/MyButton/MyButton" 
import { CasesReport } from "../components/Cases/CasesReport/CasesReport"

export const Homepages = () => {
    const isAuth = useSelector(state => state.userState.isAuth)
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <div className="wrapper home_wrapper">
            <h1>Сервис проката велосипедов</h1>
            <p>Известная компания, занимающаяся прокатом велосипедов в крупных городах России,
                испытывает проблемы с частой кражей их имущества (велосипедов). Как возможное решение проблемы,
                компания хочет вести учёт этих случаев и отслеживать прогресс.</p>
            <p>Клиентская часть предназначена как для сотрудников компании, так и для обычных пользователей.
                Обычному пользователю доступна только ограниченная часть функционала: главная страница и возможность сообщить о новом случае кражи.</p>

            { isAuth
                ? <>
                    
                </>
                : <>
                    <p>Если вы видете это сообщение, значит вы <strong>не зарегистрированный</strong> пользователь<br />
                        Но вы все равно можте оставить сообщение о карже<br />
                        нажмите на кнопку и заполните форму
                    </p>
                    <MyButton onClick={() => setModalVisible(true)} className="myButton">Оставить сообщение о краже</MyButton>
                </>
            }
            <MyModal visible={modalVisible} setVisible={setModalVisible}>
                <CasesReport pablic setVisible={setModalVisible} />
            </MyModal>
        </div>
    )
}