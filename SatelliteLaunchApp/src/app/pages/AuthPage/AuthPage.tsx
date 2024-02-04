import { FC, useEffect, useState } from 'react'
import './AuthPage.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { api } from '../../api';

type Props = {
    changeBreadcrump: Function
}

const AuthPage: FC<Props> = ({  changeBreadcrump }) => {
    const { authorize } = useUser();
    const [inputLogin, setInputLogin] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => changeBreadcrump('auth', '/auth'), [])

	const handleBtnAuthClick = async () => {
		setLoading(true);
		try {
			const response = await api.signIn.signInCreate({
				login: inputLogin,
				password: inputPassword,
			})
            console.log("sign_in request: ", response);
			if (response.status === 200) {
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
        <div>Войти</div>
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
        </div> 
        <div className='' style={{marginTop: '1rem'}}>
            <button className='btn_auth' onClick={ handleBtnAuthClick }>Войти</button>
        </div>
        <div className='container_err'>
            {loading &&
                (<div className='loading'>Загрузка</div>)
            }
            {isError &&
                (<div className='error'>Неверный логин или пароль</div>)
            }
        </div>   
    </div>
    )
}

export default AuthPage;