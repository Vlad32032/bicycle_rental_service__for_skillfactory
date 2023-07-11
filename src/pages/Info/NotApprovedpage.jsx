import { Link } from "react-router-dom"

export const NotApprovedpage = () => {
    return (
        <div className="wrapper info_wrapper">
            <h3>Вы не являетесь одобренным сотрудником, эта страница вам не доступна</h3>
            <Link to="/" className="black_link">Вернуться на главную страницу</Link>
        </div>
    )
}