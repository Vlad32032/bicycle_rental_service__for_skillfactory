import { NavLink, Outlet } from "react-router-dom"
import { User } from "./User/User"

export const Layout = () => {
    return (
        <>
            <header className="header">
                <div className="header_wrapper">
                    <nav>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/cases">Известные случаи</NavLink>
                        <NavLink to="/officers">Сотрудники</NavLink>
                    </nav>

                    <User />
                </div>
                
            </header>
            <main className="main">
                <Outlet />
            </main>
            <footer className="footer">
            </footer>
        </>
    )

}