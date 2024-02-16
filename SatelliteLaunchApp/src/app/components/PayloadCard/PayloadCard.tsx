import { FC, useState } from 'react';
import './PayloadCard.css';
import defaultImage from '../../assets/default_image.jpg';

import { PayloadCardType } from '../../types';
import { Link } from 'react-router-dom';
import DateView from '../DateView/DateView';
import { api } from '../../api';
import { useUser } from '../../hooks/useUser';

type Props = {
    data: PayloadCardType
    setDraftID: Function
    container: "payloadList" | "flightRequest" | "draftFlightRequest"
    deletePayloadCard: Function
}

const PayloadCard: FC<Props> = ({ data, setDraftID, container, deletePayloadCard }) => {
    const [count, setCount] = useState<number | undefined>(data.count)
    const [errorCount, setErrorCount] = useState<string>(" ");

    const { isAuthorized } = useUser();

    const handleBtnAddClick = async (event: any) => {
        event.preventDefault();
        try {
            const responseCreate = await api.payloads.rocketFlightCreate(Number(event.target.id));
            if (responseCreate.status === 200) {
                const responseGetPayloadList = await api.payloads.payloadsList();
                // @ts-ignore
                console.log("draftId from getList: ", responseGetPayloadList.data, responseGetPayloadList.data.draftRocketFlightId);
                if (responseGetPayloadList.status === 200) {
                    // @ts-ignore
                    setDraftID(responseGetPayloadList.data.draftRocketFlightId);
                }
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleChangeCountClick = (event: any) => {
        event.preventDefault();
        setCount(Number(event.target.value));
    }

    const handleSaveCountClick = async (event: any) => {
        event.preventDefault();
        try {
            const response = await api.flightsPayloads.payloadCountUpdate(data.payload_id, count || 1);
            
            if (response.status == 200) {
                setErrorCount("");
            } else {
                setErrorCount("Ошибка, повторите изменение позже")
            }

            setTimeout(() => setErrorCount(" "), 3000);
        } catch(error) {
            console.log("Error in PayloadCard: ", error);
        }    
    }

    const handleDeletePayloadClick = async (event: any) => {
        event.preventDefault();
        try {
            const response = await api.flightsPayloads.payloadDelete(data.payload_id);
            
            if (response.status == 200) {
                setErrorCount("");
                deletePayloadCard(data.payload_id);
            } else {
                setErrorCount("Ошибка, повторите удаление позже")
            }

            setTimeout(() => setErrorCount(" "), 3000);
        } catch(error) {
            console.log("Error in PayloadCard: ", error);
        }    
    }
    
    return (
        <div id ={ String(data.payload_id) } className="card">
            <Link to={`/payload/${ data.payload_id }`}>
                <div className="card-img_container">
                    <div className="card-img" style={{ backgroundImage: `url(${ data.img_url ||  defaultImage })` }}></div>
                </div>
                <div className="card-content">
                    <div className="card-text_container">
                        <div className='title'>
                            { data.title }
                        </div>
                        <div className='text_desc'>
                            <div style={{marginBottom: '5px', fontSize: '15px' }}>
                                <span>{ data.description }</span>
                            </div>
                            <div>
                                Грузоподъёмность: <span>{ data.load_capacity } тонн</span>
                            </div>
                            <div>
                                Желаемая дата полёта: <DateView dateStart={data?.flight_date_start} dateEnd={data?.flight_date_end} isShort={true}></DateView>
                            </div>
                            <div>
                                Желаемя цена услуги: <span>{ data.desired_price } млн рублей</span>
                            </div>
                        </div>
                    </div>
                    {isAuthorized && (
                        container === "payloadList" ? (
                            <div className="card-btn_container">
                                <button className='btn_add' id= { String(data.payload_id) } onClick={ handleBtnAddClick }>Добавить в заявку</button>
                            </div>
                        ) : (
                            container == "draftFlightRequest" ? (
                                <div>
                                {/* <div className="card-btn_container"> */}
                                    <div>Количество</div>
                                    <div>
                                            <input
                                            style={{padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px'}}
                                            // className="input_flight"
                                            type='number'
                                            min={ 1 }
                                            value={ count }
                                            onChange={ handleChangeCountClick }
                                            onClick={(event) => event.preventDefault()}
                                            />
                                    </div>
                                    <button className='btn_flight' onClick={ handleSaveCountClick }>Сохранить</button>
                                    <button className='btn_exit' onClick={ handleDeletePayloadClick }>Удалить</button>

                                    <div className='error'>{ errorCount }</div>
                                    <div className='right'>{ errorCount === "" && "Успешно"}</div>
                                </div>
                            ) : (
                                <div className="card-btn_container">
                                    Количество: { data.count }
                                </div>
                            )
                        )
                    )
                    }
                </div>
            </Link>
        </div>
    )
}

export default PayloadCard;