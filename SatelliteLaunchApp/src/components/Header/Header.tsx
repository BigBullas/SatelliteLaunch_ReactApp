import { FC } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

const Header: FC = () => (
    <div className="header">
        <header className='text_desc'>
            <div className="header-icon_container">
                <div className="roscosmos_icon"></div>
                <div>Роскосмос</div>
            </div>
            <div className="header-navbar_container">
                {/* <div>Запросы на полёт</div> */}
                <Link to="/payloads/">Космические аппараты</Link>
            </div>
            <div className="header-user_container">
                <div>Иконка</div>
                <div>Алик Нигматуллин</div>
            </div>
        </header>

        <div className="title header-title">
            Космодром Восточный
        </div>

        <div className="text_desc header-subtitle">
            Один из самых масштабных проектов России ХХI века
        </div>
     </div>
)

export default Header;