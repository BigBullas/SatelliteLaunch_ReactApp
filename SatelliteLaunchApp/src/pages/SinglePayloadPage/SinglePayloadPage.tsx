import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PayloadCardType } from '../../types';
import payloadsMock from '../../mocks/payloads'
import './SinglePayloadPage.css'
import defaultImage from '../../assets/default_image.jpg';
import DateView from '../../components/DateView/DateView';

type Props = {
    changeBreadcrump: Function
}

const SinglePayloadPage: FC<Props> = ({changeBreadcrump}) => {
    const { id } = useParams<string>();
    const [payload, setPayload] = useState<PayloadCardType>()

    useEffect(() => {
        getPayloadById();
    }, [])

    const getPayloadById = async () => {
        try {
            let query = `http://localhost:8080/payloads/${ id }`;

            const response = await fetch(query);

            console.log(response);

            const data = await response.json();
            
            console.log("data: ", data);

            setPayload(data.payload);
            changeBreadcrump(data.payload?.title, `payloads/${ data.payload?.payload_id }`);
        } catch (error) {
            console.log("Error: ", error);
            setPayload(payloadsMock[Number(id) - 1]);
            changeBreadcrump(payloadsMock[Number(id) - 1]?.title, `payloads/${ payloadsMock[Number(id) - 1]?.payload_id }`);
        }
    }

    return (
        <div>
            <div className="card_container__simple">
                <div id={ String(payload?.payload_id) } className="card__detailed">
                    <div className="card-img_container__detailed">
                        <div className="card-img" style={{ backgroundImage: `url(${ payload?.img_url || defaultImage})` }}></div>
                    </div>
                    <div className="card-content">
                        {/* <div className="card-btn_container"> */}
                            {/* <Link to="/payloads">Назад</Link> */}
                            {/* <a href='http://localhost:3000/payloads'>Назад</a> */}
                            {/* <form action="/home">
                            <input type="submit" defaultValue="Назад" />
                            </form> */}
                            {/* <form action="http://localhost:8080/payload/{{ .card.PayloadId }}" method="post">
                            <button className="card-button">Удалить услугу</button>
                            </form> */}
                        {/* </div> */}
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
        </div>
    )
}

export default SinglePayloadPage