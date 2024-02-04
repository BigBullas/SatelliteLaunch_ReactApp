import { FC, useState, useEffect } from 'react'
import './RegPage.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { api } from '../../api';

type Props = {
    changeBreadcrump: Function,
}

const ProfilePage: FC<Props> = ({ changeBreadcrump }) => {
    const { login, email, authorize, resetUser } = useUser();
    const [inputLogin, setInputLogin] = useState<string>(login);
    const [inputPassword, setInputPassword] = useState<string>('');
    const [inputEmail, setInputEmail] = useState<string>(email);

	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
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
				navigate("/");
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

    const logout = async () => {
        setLoading(true);
        // const resGetDraft = await api.api.eventDetail(draftId);
        // const draftStars = resGetDraft.data.star_list;
        // if (draftStars && draftStars.length !== 0) {
        //   for (let star of draftStars) {
        //     await api.api.starEventStarIdDelete(star.star_id);
        //   }
        // }
    
        // await api.api.logoutCreate();
        setLoading(false);
    
        resetUser();
      }
    

    return (
    <div className="container_auth">
        <div>Личный кабинет</div>
        <div className='container_inputs'>
            <div>Логин</div>
            <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_auth"
                    placeholder="Example123"
                    value={ inputLogin }
                    onChange={(event) => setInputLogin(event.target.value) }
                    />
            </div>

            <div>Пароль</div>
            <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_auth"
                    type='password'
                    placeholder="****"
                    value={ inputPassword }
                    onChange={(event) => setInputPassword(event.target.value) }
                    />
            </div>

            <div>Почта</div>
            <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_auth"
                    type='email'
                    placeholder="example@mail.ru"
                    value={ inputEmail }
                    onChange={(event) => setInputEmail(event.target.value) }
                    />
            </div>
        </div> 
        <div className='' style={{marginTop:'1rem'}}>
            <button className='btn_auth' onClick={ handleBtnAuthClick }>Сохранить</button>
            <button className='btn_exit' onClick={ logout }>Выйти</button>
        </div>
        <div className='container_err'>
            {loading &&
                (<div className='loading'>Загрузка</div>)
            }
            {isError &&
                (<div className='error'>Неверный логин, пароль или email</div>)
            }
            {isRight &&
                (<div className='right'>Успешно</div>)
            }
        </div>   
    </div>
    )
}

export default ProfilePage;
