import { Link } from "react-router-dom"

export const Notfoundpage = () => {
    return (
        <div className="wrapper info_wrapper">
            <h3>Такая страница не найденна</h3>
            <Link to={"/"} className="black_link">Вернуться на Главную страницу</Link>
        </div>
    )
}