import { FC } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const Header: FC = () => {
    const { login, isAuthorized, is_admin } = useUser();

    return (
    <div className="header">
        <header className='text_desc'>
            <div className="header-icon_container">
                <div className="roscosmos_icon"></div>
                <div>Роскосмос</div>
            </div>
            <div className="header-navbar_container">
                <Link to="/">Космические аппараты</Link>

                {isAuthorized && !is_admin &&
                    (
                        <>
                            <Link to="/rocket_flights">Мои заявки</Link>
                        </>
                    )
                }

                {is_admin &&
                    (
                        <>
                            <Link to="/rocket_flights">Планируемые полёты</Link>
                            <Link to="/">Модерация КА</Link>
                        </>
                    )
                }
            </div>
            <div className="header-user_container">
                {isAuthorized ?
                    (<Link to="/profile">{ login }</Link>)
                :
                    (
                    <>
                        <Link to="/auth">Войти</Link>
                        <Link to="/reg">Регистрация</Link>
                    </>
                    )
            }
                
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
}

export default Header;