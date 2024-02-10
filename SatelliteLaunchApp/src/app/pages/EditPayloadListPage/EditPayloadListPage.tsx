import { FC, useEffect, useState } from 'react'
import './EditPayloadListPage.css';
import { PayloadCardType } from '../../types';
import { api } from '../../api';
import { useUser } from '../../hooks/useUser';
import { dateConversion } from '../../utils';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/default_image.jpg';

type Props = {
    changeBreadcrump: Function
}

const EditPayloadListPage: FC<Props> = ({ changeBreadcrump }) => {
    const { isAuthorized, is_admin } = useUser();
    const [errorDeletePayload, setErrorDeletePayload] = useState<string>(" ");
    const [payloads, setPayloads] = useState<PayloadCardType[]>([])

    useEffect(() => {
        changeBreadcrump('Модерация КА', 'edit_payloads');
        getRocketFlightList();
    }, [])

    const getRocketFlightList = async () => {
        try {
            const response = await api.payloads.payloadsList();

            // @ts-ignore
            console.log("data payloads: ", response.data.payloads);
            // @ts-ignore
            setPayloads(response.data.payloads);
                
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleDeletePayloadClick = async (event: any) => {
        event.preventDefault();
        const payload_id = event.target.id;

        console.log("payload_id: ", payload_id);

        try {
            const response = await api.payloads.payloadsDelete(payload_id);
            
            if (response.status == 200) {
                setErrorDeletePayload("");
                await getRocketFlightList();
            } else {
                setErrorDeletePayload("Ошибка")
            }

            setTimeout(() => setErrorDeletePayload(" "), 3000);
        } catch(error) {
            console.log("Error in EditPayloadList: ", error);
        }   
    }

    return (
        <div className='payload_list_container'> 
            {is_admin && (
                <div className='btn-container_add-payload'>
                    <Link className='btn_add-payload' to={`/edit_payload/0`}>Добавить КА</Link>
                </div>
            )}
            {payloads && payloads.length > 0 && is_admin && isAuthorized ?
                <div className="card_container" style={{margin: 0}}>
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Фото</th>
                                <th>Название КА</th>
                                <th>Описание</th>
                                <th>Вес, т</th>
                                <th>Дата полёта, с</th>
                                <th>Дата полёта, по</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {payloads.map((value, index) => (
                                    <tr key={index}>
                                        <td><Link to={`/edit_payload/${value.payload_id}`}>{index + 1}</Link></td>
                                        <td>
                                            <Link className='cell-with-img'  to={`/edit_payload/${value.payload_id}`}>
                                                <div className="card-img_container__payload-table">
                                                    <div className="card-img__payload-table" style={{ backgroundImage: `url(${ value.img_url ||  defaultImage })` }}></div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td><Link to={`/edit_payload/${value.payload_id}`}>{value.title}</Link></td>
                                        <td><Link to={`/edit_payload/${value.payload_id}`}>{value.description}</Link></td>
                                        <td><Link to={`/edit_payload/${value.payload_id}`}>{value.load_capacity}</Link></td>
                                        <td><Link to={`/edit_payload/${value.payload_id}`}>{dateConversion(value.flight_date_start)}</Link></td>
                                        <td><Link to={`/edit_payload/${value.payload_id}`}>{dateConversion(value.flight_date_end)}</Link></td>
                                        
                                        {is_admin && (
                                            <td>
                                                <button className='btn_exit' id = { String(value.payload_id) }
                                                    onClick={ handleDeletePayloadClick }>Удалить</button>

                                                <div className='error'>{ errorDeletePayload }</div>
                                                <div className='right'>{ errorDeletePayload === "" && "Успешно"}</div>
                                            </td>
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

export default EditPayloadListPage