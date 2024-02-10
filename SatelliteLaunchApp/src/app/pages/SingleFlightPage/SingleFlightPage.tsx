import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PayloadCardType, RocketFlightType } from '../../types';
import './SingleFlightPage.css'
import { useDraft } from '../../hooks/useDraft';
import { api } from '../../api';
import { dateConversion } from '../../utils';
import PayloadCard from '../../components/PayloadCard';

type Props = {
    changeBreadcrump: Function
    draftId: number | null | undefined
    setDraftId: Function
}

const SingleFlightPage: FC<Props> = ({changeBreadcrump, draftId, setDraftId}) => {
    const id = Number(useParams().id);
    const [isDraft, setIsDraft] = useState<boolean>(id === draftId); 
    
    const [payloads, setPayloads] = useState<PayloadCardType[]>();

    const deletePayloadCard = (deleted_id: number) => {
        setPayloads(payloads?.filter(item => item.payload_id !== deleted_id));
    }

    const { title, flight_date, place_number, setDraft, resetDraft } = useDraft();
    const [rocketFlight, setRocketFlight] = useState<RocketFlightType>({})

    const [inputTitle, setInputTitle] = useState<string>(title);
    const [inputFlightDate, setInputFlightDate] = useState<Date | string>(flight_date);
    const [inputPlaceNumber, setInputPlaceNumber] = useState<number>(place_number);
    

	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isFormError, setIsFormError] = useState<boolean>(false);
    const [isDeleteDraftError, setIsDeleteDraftError] = useState<boolean>(false);
    const [isRight, setIsRight] = useState<boolean>(false);

    useEffect(() => {
        getRocketFlightById();
        setIsDraft(id === draftId);

        changeBreadcrump(['Мои полёты', id === draftId ? 'Полёт-черновик' : `Полёт №${id}`], ['rocket_flights', `rocket_flights/${id}`]);
    }, [id, draftId])

    const getRocketFlightById = async () => {
        try {
            const response = await api.rocketFlights.rocketFlightsDetail(id);
            // @ts-ignore
            const {rocket_flight: resRocketFlight, payloads: resPayloads} = response.data;

            setRocketFlight(resRocketFlight);
            setPayloads(resPayloads);
        } catch(error) {
            console.log("Error in SingleFlightPage: ", error);
        }       
    }

	const saveDraftFlight = async () => {
		setLoading(true);

        setDraft({
            draftInfo: {
                Data: {
                    flight_id: id,
                    title: inputTitle,
                    flight_date: inputFlightDate ? inputFlightDate : undefined,
                    place_number: inputPlaceNumber,
                }
            }
        });

		try {
			const response = await api.rocketFlights.rocketFlightsUpdate({
                flight_id: id,
                title: inputTitle,
                flight_date: inputFlightDate ? (new Date(inputFlightDate)).toISOString() : "",
                place_number: inputPlaceNumber,
            });

			if (response.status === 201) {
                setIsDeleteDraftError(false);
                setIsFormError(false);
                setIsError(false);
                setIsRight(true);
			}
		} catch (error: any) {
			console.log(error);
            setIsDeleteDraftError(false);
            setIsFormError(true);
            setIsError(true);
            setIsRight(false);
		}
		setLoading(false);
	}

    const formDraftFlight = async () => {
        setLoading(true);

        await saveDraftFlight();

		const response = await api.rocketFlights.formCreate({status: "formed"});
        if (response.status === 200) {
            resetDraft();
            setDraftId(0);
            
            setIsDeleteDraftError(false);
            setIsFormError(false);
            setIsError(false);
            setIsRight(true);

            navigate("/");
        } else {
            setIsDeleteDraftError(false);
            setIsFormError(true);
            setIsError(false);
            setIsRight(false);
        }

        setLoading(false);
	}

    const deleteDraft = async () => {
        setLoading(true);

        if (typeof(id) === 'number' && id > 0) {
            const resDraftDeleting = await api.rocketFlights.rocketFlightsDelete();
            if (resDraftDeleting.status === 200) {
                setDraftId(0);
                resetDraft();

                setIsDeleteDraftError(false);
                setIsFormError(false);
                setIsError(false);
                setIsRight(true);

                navigate('/');
            } else {
                setIsDeleteDraftError(true);
                setIsFormError(false);
                setIsError(false);
                setIsRight(false);
            }
        }
        setLoading(false);
    }
    

    return (
    <div className="container_flight">
        <div>
            {isDraft ? (
                <div className='title_flight'>Полёт-черновик</div>
            ) : (
                <div className='title_flight'>{ `Полёт №${ id }` }</div>
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
        
        <hr></hr>

        <div>
            {payloads && payloads.length > 0 ?
                <div className="card_container">
                    {payloads.map((value, id) => {
                        return (<PayloadCard data={value} key={id} payloadsInDraft = { [] } deletePayloadCard={ deletePayloadCard }
                             setDraftID = { () => {} } container={ isDraft ? 'draftFlightRequest' : 'flightRequest'}></PayloadCard>);
                    })}
                </div> :
                <div style={{textAlign: 'center', padding: '3em 0 3em 0'}}>
                    <h1>Ничего не найдено</h1>
                </div>
            }
        </div>
    </div>
    )
}

export default SingleFlightPage
