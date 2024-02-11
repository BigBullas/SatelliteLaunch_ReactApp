import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PayloadCardType } from '../../types';
import payloadsMock from '../../mocks/payloads'
import './SinglePayloadPage.css'
import defaultImage from '../../assets/default_image.jpg';
import DateView from '../../components/DateView/DateView';
import { useUser } from '../../hooks/useUser';
import { api } from '../../api';

type Props = {
    changeBreadcrump: Function
    isEdit: boolean
}

function formatIsoDate(isoDateString: string | Date): string {
    const date = new Date(isoDateString);
    return date.toLocaleString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false // Используйте  24-часовой формат
        }).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$2-$1').replace(',', '');
}

const SinglePayloadPage: FC<Props> = ({changeBreadcrump, isEdit}) => {
    const { id: strId } = useParams<string>();
    const id = Number(strId);
    const startValue: PayloadCardType = {
        payload_id: 0,
        title: '',
        description: '',
        detailed_desc: '',
        load_capacity: 0,
        desired_price: 0,
    }; 
    const [payload, setPayload] = useState<PayloadCardType>(startValue); 

    const [file, setFile] = useState<File>();
	const [filepath, setFilepath] = useState("");
	const changeFile = (event: any) => {
		setFile(event.target.files[0]);
		setFilepath(URL.createObjectURL(event.target.files[0]));
	}

    const { isAuthorized, is_admin } = useUser();

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isRight, setIsRight] = useState<boolean>(false);

    useEffect(() => {
        if (id !== 0) {
            getPayloadById();
        } else {
            changeBreadcrump(['Модерация КА', 'Создание КА'], ['edit_payloads', 'edit_payload/0']);
        }
    }, [id, isEdit]);

    const getPayloadById = async () => {
        try {
            const response = await api.payloads.payloadsDetail(Number(id));

            const data = response.data;
            
            console.log("data: ", data);
            // @ts-ignore
            data.payload.flight_date_start = formatIsoDate(data.payload?.flight_date_start);
            // @ts-ignore
            data.payload.flight_date_end = formatIsoDate(data.payload?.flight_date_end);
            // @ts-ignore
            setPayload(data.payload);

            if (isEdit) {
                // @ts-ignore
                changeBreadcrump(['Модерация КА', `Редактирование ${ data.payload?.title }`], ['edit_payloads', `edit_payload/${ data.payload?.payload_id }`]);
            } else {
                // @ts-ignore
                changeBreadcrump(data.payload?.title, `payload/${ data.payload?.payload_id }`);
            }
        } catch (error) {
            console.log("Error: ", error);
            setPayload(payloadsMock[Number(id) - 1]);
            changeBreadcrump(payloadsMock[Number(id) - 1]?.title, `payload/${ payloadsMock[Number(id) - 1]?.payload_id }`);
        }
    }

    const savePayload = async () => {
        if (payload.title) {
            setIsError(false);
            setLoading(true);

            let newPayload: any = { title: payload.title }
			if (payload.description?.length) {
				newPayload.description = payload.description;
			}
            if (payload.detailed_desc?.length) {
				newPayload.detailed_desc = payload.detailed_desc;
			}
			if (payload.load_capacity) {
				newPayload.load_capacity = payload.load_capacity;
			}
			if (payload.desired_price) {
				newPayload.desired_price = payload.desired_price;
			}
			if (payload.flight_date_start) {
				newPayload.flight_date_start = payload.flight_date_start;
			}
            if (payload.flight_date_end) {
				newPayload.flight_date_end = payload.flight_date_end;
			}
			if (file) {
				newPayload.image = file;
			}

            console.log(newPayload);

            try {
                const response = id !== 0 ? await api.payloads.payloadsUpdate(id, newPayload) :
                    await api.payloads.payloadsCreate(newPayload);

                if (response.status === 201) {
                    setIsError(false);
                    setIsRight(true);
                    id !== 0 ? await getPayloadById() : navigate('/edit_payloads');
                }
    
            } catch (error: any) {
                console.log(error);
                setIsError(true);
                setIsRight(false);
            }
            setLoading(false);
        } else {
            setIsError(true);
        }
	}

    const handleChangeTitleInput = (event: any) => {
        if (payload) {
            setPayload({
                ...payload,
                title: event.target.value
            });
        }
    }

    const handleChangeDescInput = (event: any) => {
        if (payload) {
            setPayload({
                ...payload,
                description: event.target.value
            });
        }
    }

    const handleChangeDetailedDescInput = (event: any) => {
        if (payload) {
            setPayload({
                ...payload,
                detailed_desc: event.target.value
            });
        }
    }

    const handleChangeLoadCapInput = (event: any) => {
        if (payload) {
            setPayload({
                ...payload,
                load_capacity: event.target.value
            });
        }
    }

    const handleChangeDesPriceInput = (event: any) => {
        if (payload) {
            setPayload({
                ...payload,
                desired_price: event.target.value
            });
        }
    }

    const handleChangeStartDateInput = (event: any) => {
        if (payload) {
            setPayload({
                ...payload,
                flight_date_start: event.target.value
            });
        }
    }

    const handleChangeEndDateInput = (event: any) => {
        if (payload) {
            setPayload({
                ...payload,
                flight_date_end: event.target.value
            });
        }
    }

    return (
        <div>
            {isEdit ? (
                isAuthorized && is_admin ? (
                    <div className="container_flight">
                        <div>
                            {Number(id) === 0 ? (
                                <h2 className='title_flight'>Новый космический аппарат</h2>
                            ) : (
                                <h2 className='title_flight'>Редактирование космического аппарата</h2>
                            )}
                            <div>
                                <div className="card-img_container__detailed">
                                    <div className="card-img" style={{ backgroundImage: `url(${ filepath || payload?.img_url || defaultImage})` }}></div>
                                </div>
                                <div className="form-group mb-1" style={{ padding: "1em" }}>
                                    <label htmlFor="formFile" className="form-label">Выберите фото</label>
                                    <input
                                        id="formFile"
                                        className="input__field black-placeholder"
                                        onChange={changeFile}
                                        type="file"
                                    />
                                </div>
                            </div>

                            
                            <div className='container_inputs_and_buttons'>
                                <div className='container_inputs'>
                                    <div>Название КА</div>
                                    <div style={{flexGrow: '2', display: 'flex' }}>
                                            <input
                                            className="input_flight"
                                            value={ payload.title }
                                            onChange={ handleChangeTitleInput }
                                            />
                                    </div>

                                    <div>Описание</div>
                                    <div style={{flexGrow: '2', display: 'flex' }}>
                                            <input
                                            className="input_flight"
                                            value={ payload.description }
                                            onChange={ handleChangeDescInput }
                                            />
                                    </div>

                                    <div>Доп. детали</div>
                                    <div style={{flexGrow: '2', display: 'flex' }}>
                                            <input
                                            className="input_flight"
                                            value={ payload.detailed_desc }
                                            onChange={ handleChangeDetailedDescInput }
                                            />
                                    </div>

                                    <div>Вес, т</div>
                                    <div style={{flexGrow: '2', display: 'flex' }}>
                                            <input
                                            className="input_flight"
                                            type='number'
                                            min={ 1 }
                                            value={ payload.load_capacity }
                                            onChange={ handleChangeLoadCapInput }
                                            />
                                    </div>
            
                                    <div>Планируемая дата полёта, с</div>
                                    <div style={{flexGrow: '2', display: 'flex' }}>
                                            <input
                                            className="input_flight"
                                            type='datetime-local'
                                            value={ String(payload.flight_date_start) || "" }
                                            onChange={ handleChangeStartDateInput }
                                            />
                                    </div>

                                    <div>Планируемая дата полёта, по</div>
                                    <div style={{flexGrow: '2', display: 'flex' }}>
                                            <input
                                            className="input_flight"
                                            type='datetime-local'
                                            value={ String(payload.flight_date_end) || ""}
                                            onChange={ handleChangeEndDateInput }
                                            />
                                    </div>
            
                                    <div>Планируемая цена, млн рублей</div>
                                    <div style={{flexGrow: '2', display: 'flex' }}>
                                            <input
                                            className="input_flight"
                                            type='number'
                                            min={ 1 }
                                            value={ payload.desired_price }
                                            onChange={ handleChangeDesPriceInput }
                                            />
                                    </div>
                                </div> 
                            </div>
                
                            
                            <div className='container_buttons_and_errors'>
                                <div className='' style={{marginTop:'1rem'}}>
                                    <button className='btn_flight' onClick={ savePayload }>Сохранить</button>
                                </div>
                                <div className='container_err'>
                                    {loading &&
                                        (<div className='loading'>Загрузка</div>)
                                    }
                                    {isError &&
                                        (<div className='error'>Неверно введены данные в требуемые поля</div>)
                                    }
                                    {isRight &&
                                        (<div className='right'>Успешно</div>)
                                    }
                                </div>  
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>Упс! Для начала получите права администратора</h1>
                )
                
            ) : (
                <div className="card_container__simple">
                <div id={ String(payload?.payload_id) } className="card__detailed">
                    <div className="card-img_container__detailed">
                        <div className="card-img" style={{ backgroundImage: `url(${ payload?.img_url || defaultImage})` }}></div>
                    </div>
                    <div className="card-content">
                        <div className="card-text_container">
                            <h3 className='title'>
                            { payload?.title }
                            </h3>
                            <div>
                                <div>
                                    Описание: <span>{ payload?.description }</span>
                                </div>
                                <div>
                                    Грузоподъёмность: <span>{ payload?.load_capacity } тонн</span>
                                </div>
                                <div>
                                    Планируемая дата полёта: <DateView dateStart={payload?.flight_date_start} dateEnd={payload?.flight_date_end} isShort={true}></DateView>
                                </div>
                                <div>
                                    Желаемая цена услуги: <span>{ payload?.desired_price } млн рублей</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card__description'>
                    { payload?.detailed_desc }
                </div>
            </div>
            )}
        </div>
    )
}

export default SinglePayloadPage