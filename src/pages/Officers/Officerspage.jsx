import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"

import { getAllOfficers } from "../../store/officers/officersAsyncAction"

export const Officerspages = () => {
    const dispatch = useDispatch()
    const officers = useSelector(state => state.officers)
    const isApproved = useSelector(state => state.userState.user.approved)

    useEffect(() => {
        dispatch(getAllOfficers())
    }, [])

    return (
        <div >
            <div className="officers_wrapper">
                <h2>Cписок сотрудников:</h2>
                { !isApproved && 
                    <h3 style ={{color: "red"}}>Только одобренные сотрудники могут видеть детальные страницы других сотрудников</h3>
                }
                
                { officers.officers.length > 0 
                    ? <div className="officer_wrapper">
                        {officers.officers.map(officer => 
                            <div key={officer._id} className="officer_card">
                                <div>{officer.firstName}</div>
                                <div>{officer.lastName}</div>
                                <div>{officer.email}</div>
                                <div>{`одобрен: ${officer.approved}`}</div>
                                <div>_</div>
                                { isApproved &&
                                    <Link to={`/officers/${officer._id}`} className="black_link">Детальная страница сотрудника</Link>
                                }
                            </div>
                    )}
                    </div>
                    : <div>Ошибка загрузки</div>
                }
            </div>
        </div>
    )
}