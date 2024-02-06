import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PayloadCardType, RocketFlightType } from '../../types';
import payloadsMock from '../../mocks/payloads'
// import './SinglePayloadPage.css'
import defaultImage from '../../assets/default_image.jpg';
import DateView from '../../components/DateView/DateView';
import { useDraft } from '../../hooks/useDraft';
import { api } from '../../api';
import { dateConversion } from '../../utils';

type Props = {
    changeBreadcrump: Function
    draftId: number | null | undefined
    setDraftId: Function
}

const SingleFlightPage: FC<Props> = ({changeBreadcrump, draftId, setDraftId}) => {
    const id = Number(useParams().id);
    const [isDraft] = useState<boolean>(id === draftId)
    
    // const [payload, setPayload] = useState<PayloadCardType>()

    // useEffect(() => {
    //     getPayloadById();
    // }, [])

    // const getPayloadById = async () => {
    //     try {
    //         let query = `http://localhost:8080/payloads/${ id }`;

    //         const response = await fetch(query);

    //         // console.log(response);

    //         const data = await response.json();
            
    //         console.log("data: ", data);

    //         setPayload(data.payload);
    //         changeBreadcrump(data.payload?.title, `payloads/${ data.payload?.payload_id }`);
    //     } catch (error) {
    //         console.log("Error: ", error);
    //         setPayload(payloadsMock[Number(id) - 1]);
    //         changeBreadcrump(payloadsMock[Number(id) - 1]?.title, `payloads/${ payloadsMock[Number(id) - 1]?.payload_id }`);
    //     }
    // }
    const { flight_id, title, flight_date, place_number, price, setDraft, resetDraft } = useDraft();
    const [rocketFlight, setRocketFlight] = useState<RocketFlightType>({})
    const [inputTitle, setInputTitle] = useState<string>(title);
    const [inputFlightDate, setInputFlightDate] = useState<Date | string>(flight_date);
    const [inputPlaceNumber, setInputPlaceNumber] = useState<number>(place_number);
    const [inputPrice, setInputPrice] = useState<number>(price);
    

	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isFormError, setIsFormError] = useState<boolean>(false);
    const [isDeleteDraftError, setIsDeleteDraftError] = useState<boolean>(false);
    const [isRight, setIsRight] = useState<boolean>(false);

    useEffect(() => {
        // getRocketFlightById();
        changeBreadcrump(['Мои полёты', `Полёт №${id}`], ['/rocket_flights', `/rocket_flights/${id}`])
    }, [])

    // const getRocketFlightById = async () => {
    //     try {
    //         const response = await api.rocketFlights.rocketFlightsDetail(id);
    //         const {resRocketFlight}
    //         // setRocketFlight(response.data.rocket_flight);
    //     } catch(error) {
    //         console.log("Error in SingleFlightPage: ", error);
    //     }
        
    // }

	// const saveDraftFlight = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const response = await api.profile.profileUpdate({
	// 			login: inputTitle,
	// 			password: inputFlightDate,
    //             email: inputPlaceNumber,
	// 		})
    //         console.log("profile_update request: ", response);
	// 		if (response.status === 201) {
	// 			await authorize();
	// 		}
    //         setIsError(false);
    //         setIsRight(true);
	// 	} catch (error: any) {
	// 		console.log(error);
    //         setIsError(true);
    //         setIsRight(false);
	// 	}
	// 	setLoading(false);
	// }

    const formDraftFlight = async () => {
        setLoading(true);

        // await saveDraftFlight();

		const response = await api.rocketFlights.formCreate({status: "formed"});
        if (response.status === 200) {
            resetDraft();
            setDraftId(0);
            
            setIsDeleteDraftError(false);
            setIsFormError(false);
            setIsError(false);
            // navigate("/");
        } else {
            setIsDeleteDraftError(false);
            setIsFormError(true);
            setIsError(false);
        }

        setLoading(false);
	}

    const deleteDraft = async () => {
        setLoading(true);

        if (typeof(flight_id) === 'number' && flight_id > 0) {
            const resDraftDeleting = await api.rocketFlights.rocketFlightsDelete();
            if (resDraftDeleting.status === 200) {
                setIsDeleteDraftError(false);
                setDraftId(0);
                resetDraft();
                setIsFormError(false);
                setIsError(false);
                // navigate('/');
            } else {
                setIsDeleteDraftError(true);
                setIsFormError(false);
                setIsError(false);
            }
        }
        setLoading(false);
    }
    

    return (
    <div className="container_flight">
        {isDraft ? (
            <div className='title'>Полёт-черновик</div>
        ) : (
            <div className='title'>{ `Полёт №${ id }` }</div>
        )}
        
        <div className='container_inputs_and_buttons'>
            {isDraft ? (
                <div className='container_inputs'>
                    <div>Название полёта</div>
                    <div style={{flexGrow: '2', display: 'flex' }}>
                            <input
                            className="input_flight"
                            value={ inputTitle }
                            onChange={(event) => setInputTitle(event.target.value) }
                            />
                    </div>

                    <div>Дата полёта</div>
                    <div style={{flexGrow: '2', display: 'flex' }}>
                            <input
                            className="input_flight"
                            type='datetime-local'
                            value={ String(inputFlightDate) }
                            onChange={(event) => setInputFlightDate(event.target.value) }
                            />
                    </div>

                    <div>Место посадки</div>
                    <div style={{flexGrow: '2', display: 'flex' }}>
                            <input
                            className="input_flight"
                            type='number'
                            min={ 1 }
                            value={ inputPlaceNumber }
                            onChange={(event) => setInputPlaceNumber(Number(event.target.value)) }
                            />
                    </div>

                    <div>Цена</div>
                    <div style={{flexGrow: '2', display: 'flex' }}>
                            <input
                            className="input_flight"
                            type='number'
                            value={ inputPlaceNumber }
                            onChange={(event) => setInputPlaceNumber(Number(event.target.value)) }
                            /> рублей
                    </div>
                </div> 
            ) : (
                <>
                    <div>
                        <div>
                            Название полёта: <span>{ rocketFlight?.title }</span>
                        </div>
                        <div>
                            Дата полёта: <span>{ dateConversion(rocketFlight?.flight_date) }</span>
                        </div>
                        <div>
                            Номер взлётной площадки: <span>{ rocketFlight?.place_number }</span>
                        </div>
                        <div>
                            Стоимость полёта: {rocketFlight.price ? (<span>{ rocketFlight?.price } рублей</span>) : (<span> - </span>)}
                        </div>
                    </div>
                </>
            )}
        </div>

        
        <div className='container_buttons_and_errors'>
            {isDraft ? (
                <>
                    <div className='' style={{marginTop:'1rem'}}>
                        <button className='btn_flight' onClick={ formDraftFlight }>Сформировать</button>
                        <button className='btn_flight' onClick={ saveDraftFlight }>Сохранить</button>
                        <button className='btn_exit' onClick={ deleteDraft }>Удалить</button>
                    </div>
                    <div className='container_err'>
                        {loading &&
                            (<div className='loading'>Загрузка</div>)
                        }
                        {isError &&
                            (<div className='error'>Неверный логин, пароль или email</div>)
                        }
                        {isFormError &&
                            (<div className='error'>Возникла ошибка при выходе, повторите позже</div>)
                        }
                        {isDeleteDraftError &&
                            (<div className='error'>Возникла ошибка при удалении вашей заявки, повторите позже</div>)
                        }
                        {isRight &&
                            (<div className='right'>Успешно</div>)
                        }
                    </div>  
                </>  
            ) : (
                <></>
            )}
        </div>
    </div>
    )
}

export default SingleFlightPage


/**
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
 */