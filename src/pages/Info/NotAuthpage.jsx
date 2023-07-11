import { Link } from "react-router-dom"

export const NotAuthpage = () => {
    return (
        <div className="wrapper info_wrapper">
            <h3>Вы не авторизованный сотрудник, эта страница вам не доступна</h3>
            <Link to="/" className="black_link">Вернуться на главную страницу</Link>
        </div>
    )
}