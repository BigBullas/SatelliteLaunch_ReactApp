import { FC, useEffect, useState } from 'react'
import './FlightsPage.css';
import { RocketFlightType } from '../../types';
import { api } from '../../api';
import { useUser } from '../../hooks/useUser';
import { useFlightList } from '../../hooks/useFlightList';
import { dateConversion } from '../../utils';
import { Link } from 'react-router-dom';

type Props = {
    changeBreadcrump: Function
}

const rusStatus: { [key: string]: string } = {
    "formed": "Сформирован",
    "draft": "Черновик",
    "deleted": "Удален",
    "completed": "Утвержден",
    "rejected": "Отклонен",
    "unknown": "-",
}

const FlightsPage: FC<Props> = ({ changeBreadcrump }) => {
    const { creatorLogin, minDate, maxDate, status, setStartDateAction, setEndDateAction, setStatusDataAction, setCreatorLogin} = useFlightList();
    const { isAuthorized, is_admin } = useUser();

    const [errorStatusFLight, setErrorStatusFLight] = useState<string>(" ");

    const [statusFilter, setStatusFilter] = useState<string>(status ? status : 'Все');
    const [formDateStart, setFormDateStart] = useState<Date | string>(minDate);
    const [formDateEnd, setFormDateEnd] = useState<Date | string>(maxDate);
    const [loginCreatorFilter, setLoginCreatorFilter] = useState<string>(creatorLogin);

    const [rocketFlights, setRocketFlights] = useState<RocketFlightType[]>([])

    useEffect(() => {
        is_admin ? changeBreadcrump('Планируемые полёты', 'rocket_flights') : changeBreadcrump('Мои полёты', 'rocket_flights');
        getRocketFlightList(statusFilter, formDateStart, formDateEnd, loginCreatorFilter);

        const timeout = setInterval(() => {
            getRocketFlightList(statusFilter, formDateStart, formDateEnd, loginCreatorFilter);
        }, 5000);
        return () => clearInterval(timeout);
    }, [status, minDate, maxDate, creatorLogin])

    const getRocketFlightList = async (statusValue: string, formDateStart: Date | string, formDateEnd: string | Date, creatorLoginFilter: string) => {
        try {
            statusValue = statusValue === 'Все' ? '' : statusValue;
            const response = await api.rocketFlights.rocketFlightsList({
                status: statusValue ?? "",
                form_date_start: String(formDateStart) ?? "",
                form_date_end: String(formDateEnd) ?? "",
            });

            let resRocketFlights: RocketFlightType[] = [];
            let resRocketFlight: RocketFlightType = {};

            response.data.forEach((item) => {
                resRocketFlight.flight_id = item.flight_id;

                resRocketFlight.creator_id = item.creator_id;
                resRocketFlight.creator_login = item.creator_login;
                resRocketFlight.moderator_id = item.moderator_id;
                resRocketFlight.moderator_login = item.moderator_login;

                resRocketFlight.created_at = item.created_at ? new Date (item.created_at) : undefined;
                resRocketFlight.formed_at = item.formed_at ? new Date (item.formed_at) : undefined;
                resRocketFlight.confirmed_at = item.confirmed_at ? new Date (item.confirmed_at) : undefined;
                resRocketFlight.flight_date = item.flight_date ? new Date (item.flight_date) : undefined;

                resRocketFlight.place_number = item.place_number;
                resRocketFlight.price = item.price;

                resRocketFlight.status = item.status;
                resRocketFlight.title = item.title;

                resRocketFlights.push(resRocketFlight);

                resRocketFlight = {};
            })
            
            if (creatorLoginFilter) {
                resRocketFlights = resRocketFlights.filter((item) => item.creator_login?.includes(creatorLoginFilter));
            }

            setRocketFlights(resRocketFlights);
                
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    
    const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(event.target.value);
        getFlightListWithFilters();
    }

    const handleFormDateStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormDateStart(event.target.value);
        getFlightListWithFilters();
    }
    const handleFormDateEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormDateEnd(event.target.value);
        getFlightListWithFilters();
    }

    const handleCreatorLoginFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginCreatorFilter(event.target.value);
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            getFlightListWithFilters();
        }
    }
    
    const getFlightListWithFilters = () => {
        setStartDateAction(String(formDateStart));
        setEndDateAction(String(formDateEnd));
        setStatusDataAction(statusFilter);
        setCreatorLogin(loginCreatorFilter);
        getRocketFlightList(statusFilter, formDateStart, formDateEnd, loginCreatorFilter);
    }

    const handleCompleteStatusClick = async (event: any) => {
        event.preventDefault();
        const flight_id = event.target.id;

        try {
            const response = await api.rocketFlights.responseUpdate(flight_id, {status: "completed"});
            
            if (response.status == 200) {
                setErrorStatusFLight("");
                setRocketFlights(rocketFlights.map((value) => {
                    if (value.flight_id === Number(flight_id)) {
                        value.status = "completed";
                    }
                    return value;
                }));
            } else {
                setErrorStatusFLight("Ошибка");
            }

            setTimeout(() => setErrorStatusFLight(" "), 3000);
        } catch(error) {
            console.log("Error in PayloadCard: ", error);
        }   
    }

    const handleRejectStatusClick = async (event: any) => {
        event.preventDefault();
        const flight_id = event.target.id;

        try {
            const response = await api.rocketFlights.responseUpdate(flight_id, {status: "rejected"});
            
            if (response.status == 200) {
                setErrorStatusFLight("");
                setRocketFlights(rocketFlights.map((value) => {
                    if (value.flight_id === Number(flight_id)) {
                        value.status = "rejected";
                    }
                    return value;
                }));
            } else {
                setErrorStatusFLight("Ошибка");
            }

            setTimeout(() => setErrorStatusFLight(" "), 3000);
        } catch(error) {
            console.log("Error in PayloadCard: ", error);
        }
    }

    return (
        <div className='payload_list_container'>
            <div className="list-options">
                <div style={{flexGrow: '2', display: 'flex' }}>
                    <select className="input_search" value={ statusFilter } onChange={ handleStatusFilter }>
                        <option>Все</option>
                        <option value="formed">Сформирован</option>
                        <option value="completed">Утвержден</option>
                        <option value="rejected">Отклонён</option>
                    </select>
                </div>
                <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_search"
                    placeholder="Введите логин руководителя"
                    value={ loginCreatorFilter }
                    onChange={ handleCreatorLoginFilter }
                    onKeyDown={ handleKeyPress }
                    />
                </div>
                <div className="filter__container">
                    <div className='filter__label'>Дата: </div>
                    <div className="filter__input-container">
                        <div>
                            <input 
                            className="input_search" 
                            type='date' 
                            value={ String(formDateStart) } 
                            onChange={ handleFormDateStart }/>
                        </div>
                        <div style={{padding: '0.3em 1em 0 1em' }}> - </div>
                        <div>
                            <input 
                            className="input_search" 
                            type="date" 
                            value={ String(formDateEnd) }
                            onChange={ handleFormDateEnd }/>
                        </div>
                    </div>
                </div>
            </div>
           
            {rocketFlights && rocketFlights.length > 0 && isAuthorized ?
                <div className="card_container">
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Название полёта</th>
                                <th>Руководитель полёта</th>
                                <th>№ площадки</th>
                                <th>Дата полёта</th>
                                <th>Дата формирования</th>
                                <th>Стоимость, млн</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rocketFlights.map((value, index) => (
                                    <tr key={index}>
                                        <td><Link to={`/rocket_flight/${value.flight_id}`}>{index + 1}</Link></td>
                                        <td><Link to={`/rocket_flight/${value.flight_id}`}>{value.title}</Link></td>
                                        <td><Link to={`/rocket_flight/${value.flight_id}`}>{value.creator_login}</Link></td>
                                        <td><Link to={`/rocket_flight/${value.flight_id}`}>{value.place_number}</Link></td>
                                        <td><Link to={`/rocket_flight/${value.flight_id}`}>{dateConversion(value.flight_date)}</Link></td>
                                        <td><Link to={`/rocket_flight/${value.flight_id}`}>{dateConversion(value.formed_at)}</Link></td>
                                        <td><Link to={`/rocket_flight/${value.flight_id}`}>{value.price ?? ' - '}</Link></td>
                                        {value.status ? (
                                            value.status === "formed" && is_admin ? (
                                                <td>
                                                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                                        <button className='btn_flight' id = { String(value.flight_id) } 
                                                            onClick={ handleCompleteStatusClick }>Утвердить</button>
                                                        <button className='btn_exit' id = { String(value.flight_id) }
                                                            onClick={ handleRejectStatusClick }>Отклонить</button>
                                                    </div>
                                                    <div className='error'>{ errorStatusFLight }</div>
                                                    <div className='right'>{ errorStatusFLight === "" && "Успешно"}</div>
                                                </td>    
                                            ) : (
                                                <td><Link to={`/rocket_flight/${value.flight_id}`}>{rusStatus[value.status]}</Link></td>    
                                            ) 
                                        ) : (
                                            <td><Link to={`/rocket_flight/${value.flight_id}`}>{rusStatus["unknown"]}</Link></td>
                                        )}
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                :
                <div style={{textAlign: 'center', padding: '3em 0 3em 0'}}>
                    <h1>Ничего не найдено</h1>
                </div>
            }
        </div>
    )
}

export default FlightsPage