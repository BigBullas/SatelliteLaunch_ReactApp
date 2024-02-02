import { FC } from 'react'
import './PayloadCard.css'
import defaultImage from '../../assets/default_image.jpg';

import { PayloadCardType } from '../../types';
import { Link } from 'react-router-dom';
import DateView from '../DateView/DateView';

type Props = {
    data: PayloadCardType
}

const PayloadCard: FC<Props> = ({ data }) => (
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
                {/* <div className="card-btn_container">
                    <Link to={`/payloads/${ data.payload_id }`}>Подробнее</Link>
                    {/* <form action={`http://localhost:8080/payload/${ data.payload_id }`} method="get">
                        <input type="submit" value="Подробнее"></input>
                    </form> */}
                    {/* <form action={`http://localhost:8080/payload/${ data.payload_id }`} method="post">
                        <button className="card-button">Удалить услугу</button>
                    </form> */}
                {/* </div> */}
            </div>
        </Link>
    </div>
)

export default PayloadCard;