import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getAllCases } from "../../store/cases/casesAsyncAction"

import { MyModal } from "../../components/UI/MyModal/MyModal"
import { CasesReport } from "../../components/Cases/CasesReport/CasesReport"
import { MyButton } from "../../components/UI/MyButton/MyButton"

export const Casespages = () => {
    const dispatch = useDispatch()
    const cases = useSelector(state => state.cases)
    const isApproved = useSelector(state => state.userState.user.approved)

    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        dispatch(getAllCases())
    }, [modalVisible])

    return (
        <div >
            <div className="officers_wrapper">
                <h2 className="h2">Здесь будут все известные случаи краж</h2>
                { !isApproved && 
                    <h3 style ={{color: "red"}}>Только одобренные сотрудники могут редактировать случаи краж</h3>
                }
                <MyButton onClick={() => setModalVisible(true)}>Оставить сообщение о краже</MyButton>
            </div>
            <div >
                {cases.cases.map(cases =>
                    <div key={cases.licenseNumber} className="case_card">
                        <div>{`Номер лицензии: ${cases.licenseNumber}`}</div>
                        <div>{`Заявитель: ${cases.ownerFullName}`}</div>
                        <div>{`Тип: ${cases.type}`}</div>
                        <div>{`Цвет: ${cases.color}`}</div>
                        <div>{`Статус: ${cases.status}`}</div>
                        <div>{`Описание: ${cases.description}`}</div>
                        { isApproved && 
                            <Link to={`/cases/${cases._id}`} className="black_link">Редактировать</Link>
                        }
                        <div>___</div>
                    </div>
                )}
            </div>
            <MyModal visible={modalVisible} setVisible={setModalVisible}>
                <CasesReport setVisible={setModalVisible} />
            </MyModal>
        </div>
    )
}