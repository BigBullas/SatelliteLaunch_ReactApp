import { FC } from 'react'
import './Header.css'

const Header: FC = () => (
    <div className="header">
        <header>
            <div className="header-icon_container">
                <div className="roscosmos_icon"></div>
                <div>Роскосмос</div>
            </div>
            <div className="header-navbar_container">
                <div>Запросы на полёт</div>
            </div>
            <div className="header-user_container">
                <div>Иконка</div>
                <div>Алик Нигматуллин</div>
            </div>
        </header>

        <div className="header-title">
        Космодром Восточный
        </div>

        <div className="header-subtitle">
        Один из самых масштабных проектов России ХХI века
        </div>
     </div>
)

export default Header;