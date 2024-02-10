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
    const { title, minDate, maxDate, status, setStartDateAction, setEndDateAction, setStatusDataAction, setTitleDataAction} = useFlightList();
    const { isAuthorized } = useUser();
    const [loading, setLoading] = useState<boolean>(false);

    const [statusFilter, setStatusFilter] = useState<string>(status ? status : 'Все');
    const [formDateStart, setFormDateStart] = useState<Date | string>(minDate);
    const [formDateEnd, setFormDateEnd] = useState<Date | string>(maxDate);
    const [titleFilter, setTitleFilter] = useState<string>(title);

    const [rocketFlights, setRocketFlights] = useState<RocketFlightType[]>([])

    useEffect(() => {
        getRocketFlightList(statusFilter, formDateStart, formDateEnd, titleFilter);
        changeBreadcrump('Мои полёты', 'rocket_flights');
    }, [])

    const getRocketFlightList = async (statusValue: string, formDateStart: Date | string, formDateEnd: string | Date, titleFilter: string) => {
        setLoading(true);
        try {
            statusValue = statusValue === 'Все' ? '' : statusValue;
            const response = await api.rocketFlights.rocketFlightsList({
                status: statusValue ?? "",
                form_date_start: String(formDateStart) ?? "",
                form_date_end: String(formDateEnd) ?? "",
            })

            console.log("data RocketFlights: ", response.data);

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
            
            console.log("resRocketFlights: ", resRocketFlights);

            if (titleFilter) {
                resRocketFlights = resRocketFlights.filter((item) => item.title?.includes(titleFilter));
            }

            setRocketFlights(resRocketFlights);
                
        } catch (error) {
            console.log("Error: ", error);
        }
        setLoading(false);
     }
    
    const handleStatusFilter = (event: any) => setStatusFilter(event.target.value);
    const handleTitleFilter = (event: any) => setTitleFilter(event.target.value);

    const handleFormDateStart = (event: any) => setFormDateStart(event.target.value);
    const handleFormDateEnd = (event: any) => setFormDateEnd(event.target.value);

    const handleFindBtnClick = () => {
        setStartDateAction(String(formDateStart));
        setEndDateAction(String(formDateEnd));
        setStatusDataAction(statusFilter);
        setTitleDataAction(titleFilter)
        getRocketFlightList(statusFilter,  formDateStart, formDateEnd, titleFilter);
    }

    return (
        <div className='payload_list_container'>
            {loading && <h1>Загрузка</h1>}

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
                    placeholder="Введите название полёта"
                    value={ titleFilter }
                    onChange={ handleTitleFilter }
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
                <div 
                    className="btn_find" 
                    aria-disabled={ !loading }
                    onClick={ handleFindBtnClick }>
                    Найти
                </div>
            </div>
           
            {rocketFlights && rocketFlights.length > 0 && isAuthorized ?
                <div className="card_container">
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Название полёта</th>
                                <th>Номер площадки</th>
                                <th>Дата полёта</th>
                                <th>Дата формирования</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rocketFlights.map((value, index) => (
                                    <tr key={index}>
                                        <td><Link to={`/rocket_flights/${value.flight_id}`}>{index + 1}</Link></td>
                                        <td><Link to={`/rocket_flights/${value.flight_id}`}>{value.title}</Link></td>
                                        <td><Link to={`/rocket_flights/${value.flight_id}`}>{value.place_number}</Link></td>
                                        <td><Link to={`/rocket_flights/${value.flight_id}`}>{dateConversion(value.flight_date)}</Link></td>
                                        <td><Link to={`/rocket_flights/${value.flight_id}`}>{dateConversion(value.formed_at)}</Link></td>
                                        {value.status ? (
                                            <td><Link to={`/rocket_flights/${value.flight_id}`}>{rusStatus[value.status]}</Link></td>    
                                        ) : (
                                            <td><Link to={`/rocket_flights/${value.flight_id}`}>{rusStatus["unknown"]}</Link></td>
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