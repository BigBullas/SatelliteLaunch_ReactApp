import { FC, useEffect, useState } from 'react';
import './PayloadCard.css';
import defaultImage from '../../assets/default_image.jpg';

import { PayloadCardType } from '../../types';
import { Link } from 'react-router-dom';
import DateView from '../DateView/DateView';
import { api } from '../../api';
import { useUser } from '../../hooks/useUser';

type Props = {
    data: PayloadCardType
    payloadsInDraft: PayloadCardType[]
    setDraftID: Function
}

const PayloadCard: FC<Props> = ({ data, payloadsInDraft, setDraftID }) => {
    const [isInDraft, setIsInDraft] = useState<boolean>(false);

    useEffect(() => {
        payloadsInDraft.forEach((item) => {
            if (item.payload_id === data.payload_id) {
                setIsInDraft(true);
            }
        })
    }, [payloadsInDraft.length])

    const { isAuthorized } = useUser();

    const handleBtnAddClick = async (event: any) => {
        event.preventDefault();
        try {
            console.log("event.target.id: ", event.target.id);
            const response = await api.payloads.rocketFlightCreate(Number(event.target.id))
            setDraftID(response.data);
            setIsInDraft(true);

            console.log("data(draftId): ", response.data);
    
        } catch (error) {
            console.log("Error: ", error);
        }
        
        console.log("setDraftID, btnAddClick, payload_id: ", event.target.id);
    }
    
    return (
        <div id ={ String(data.payload_id) } className="card">
            <Link to={`/payloads/${ data.payload_id }`}>
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
                        <div className="card-btn_container">
                            {isInDraft ? 
                                (<button className='btn_add' id= { String(data.payload_id) } disabled={ true }>В заявке</button>)
                                :
                                (<button className='btn_add' id= { String(data.payload_id) } onClick={ handleBtnAddClick }>Добавить в заявку</button>)
                            }
                        </div>
                        )
                    }
                </div>
            </Link>
        </div>
    )
}

export default PayloadCard;