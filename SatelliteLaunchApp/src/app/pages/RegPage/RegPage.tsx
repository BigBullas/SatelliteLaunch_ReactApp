import { FC, useState, useEffect } from 'react'
import './RegPage.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { api } from '../../api';

type Props = {
    changeBreadcrump: Function,
}

const AuthPage: FC<Props> = ({ changeBreadcrump }) => {
    const { authorize } = useUser();
    const [inputLogin, setInputLogin] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [inputEmail, setInputEmail] = useState<string>('');

	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => changeBreadcrump('reg', '/reg'), [])

	const handleBtnAuthClick = async () => {
		setLoading(true);
		try {
			const response = await api.signup.signupCreate({
				login: inputLogin,
				password: inputPassword,
                email: inputEmail,
			})
            console.log("sign_in request: ", response);
			if (response.status === 201) {
				await authorize();
				navigate("/");
			}
            setIsError(false);
		} catch (error: any) {
			console.log(error);
            setIsError(true);
		}
		setLoading(false);
	}

    return (
    <div className="container_auth">
        <div>Регистрация</div>
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
            <button className='btn_auth' onClick={ handleBtnAuthClick }>Зарегистрироваться</button>
        </div>
        <div className='container_err'>
            {loading &&
                (<div className='loading'>Загрузка</div>)
            }
            {isError &&
                (<div className='error'>Неверный логин, пароль или email</div>)
            }
        </div>   
    </div>
    )
}

export default AuthPage;
