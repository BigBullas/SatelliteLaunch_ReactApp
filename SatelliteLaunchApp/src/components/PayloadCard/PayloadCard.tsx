import { FC } from 'react'
import './PayloadCard.css'
import { dateConversion } from '../../utils';
import { PayloadCardType } from '../../types';

type Props = {
    data: PayloadCardType
}

const PayloadCard: FC<Props> = ({ data }) => (
    <div id ={ String(data.payload_id) } className="card">
    <div className="card-img_container">
        <div className="card-img" style={{ backgroundImage: `url(${ data.img_url })` }}></div>
    </div>
    <div className="card-content">
        <div className="card-text_container">
        <h3>
            { data.title }
        </h3>
        <div>
            <div>
                Описание: <span>{ data.description }</span>
            </div>
            <div>
                Грузоподъёмность: <span>{ data.load_capacity } тонн</span>
            </div>
            <div>
                Планируемая дата полёта: от { dateConversion(data.flight_date_start) } до { dateConversion(data.flight_date_end) }
            </div>
            <div>
                Цена услуги: <span>{ data.desired_price } млн рублей</span>
            </div>
        </div>
        </div>
        <div className="card-btn_container">
        <form action={`http://localhost:8080/payload/${ data.payload_id }`} method="get">
            <input type="submit" value="Подробнее"></input>
        </form>
        <form action={`http://localhost:8080/payload/${ data.payload_id }`} method="post">
            <button className="card-button">Удалить услугу</button>
        </form>
        </div>
    </div>
</div>
)

export default PayloadCard;