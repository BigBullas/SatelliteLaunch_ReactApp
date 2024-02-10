import { FC, useState, useEffect } from 'react'
import './ProfilePage.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { api } from '../../api';
import { useDraft } from '../../hooks/useDraft';

type Props = {
    draftID: number | null | undefined,
    changeBreadcrump: Function,
    setDraftID: Function
}

const ProfilePage: FC<Props> = ({ draftID, changeBreadcrump, setDraftID }) => {
    const { resetDraft } = useDraft();
    const { login, email, authorize, resetUser } = useUser();
    const [inputLogin, setInputLogin] = useState<string>(login);
    const [inputPassword, setInputPassword] = useState<string>('');
    const [inputEmail, setInputEmail] = useState<string>(email);

	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLogoutError, setIsLogoutError] = useState<boolean>(false);
    const [isDeleteDraftError, setIsDeleteDraftError] = useState<boolean>(false);
    const [isRight, setIsRight] = useState<boolean>(false);

    useEffect(() => changeBreadcrump('profile', '/profile'), [])

	const handleBtnAuthClick = async () => {
		setLoading(true);
		try {
			const response = await api.profile.profileUpdate({
				login: inputLogin,
				password: inputPassword,
                email: inputEmail,
			})
            console.log("profile_update request: ", response);
			if (response.status === 201) {
				await authorize();
			}
            setIsError(false);
            setIsRight(true);
		} catch (error: any) {
			console.log(error);
            setIsError(true);
            setIsRight(false);
		}
		setLoading(false);
	}

    const logoutRequest = async () => {
        const resLogout = await api.logout.logoutCreate();
        if (resLogout.status === 200) {
            resetUser();
            resetDraft();
            setDraftID(0);
            setIsLogoutError(false);
            
            navigate('/');
        } else {
            setIsLogoutError(true);
        }
    }

    const logout = async () => {
        setLoading(true);

        if (typeof(draftID) === 'number' && draftID > 0) {
            const resDraftDeleting = await api.rocketFlights.rocketFlightsDelete();
            if (resDraftDeleting.status === 200) {
                setIsDeleteDraftError(false);
    
                await logoutRequest();
            } else {
                setIsDeleteDraftError(true);
            }
        } else {
            await logoutRequest();
        }
        setLoading(false);
      }
    

    return (
    <div className="container_profile">
        <div>Личный кабинет</div>
        <div className='container_inputs'>
            <div>Логин</div>
            <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_profile"
                    placeholder="Example123"
                    value={ inputLogin }
                    onChange={(event) => setInputLogin(event.target.value) }
                    />
            </div>

            <div>Пароль</div>
            <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_profile"
                    type='password'
                    placeholder="****"
                    value={ inputPassword }
                    onChange={(event) => setInputPassword(event.target.value) }
                    />
            </div>

            <div>Почта</div>
            <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_profile"
                    type='email'
                    placeholder="example@mail.ru"
                    value={ inputEmail }
                    onChange={(event) => setInputEmail(event.target.value) }
                    />
            </div>
        </div> 
        <div className='' style={{marginTop:'1rem'}}>
            <button className='btn_profile' onClick={ handleBtnAuthClick }>Сохранить</button>
            <button className='btn_exit' onClick={ logout }>Выйти</button>
        </div>
        <div className='container_err'>
            {loading &&
                (<div className='loading'>Загрузка</div>)
            }
            {isError &&
                (<div className='error'>Неверный логин, пароль или email</div>)
            }
            {isLogoutError &&
                (<div className='error'>Возникла ошибка при выходе, повторите позже</div>)
            }
            {isDeleteDraftError &&
                (<div className='error'>Возникла ошибка при удалении вашей заявки, повторите позже</div>)
            }
            {isRight &&
                (<div className='right'>Успешно</div>)
            }
        </div>   
    </div>
    )
}

export default ProfilePage;
