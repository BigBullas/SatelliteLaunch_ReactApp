import { FC, useEffect, useState } from 'react'
import PayloadCard from '../../components/PayloadCard';
import payloadsMock from '../../mocks/payloads';
import './PayloadsPage.css';
import { PayloadCardType } from '../../types';

const PayloadsPage: FC = () => {
    const [spaceSatellite, setSpaceSatellite] = useState('');
    const [loadCapacityStart, setLoadCapacityStart] = useState<string>('');
    const [loadCapacityEnd, setLoadCapacityEnd] = useState<string>('');
    const [flightDateStart, setFlightDateStart] = useState<string>('');
    const [flightDateEnd, setFlightDateEnd] = useState<string>('');
    // const [desiredPriceStart, setDesiredPriceStart] = useState();
    // const [desiredPriceEnd, setDesiredPriceEnd] = useState();

    const [payloads, setPayloads] = useState<PayloadCardType[]>();

    const [loading, setLoading] = useState(false);
    const [searchFlag, setSearchFlag] = useState(false);

    useEffect(() => {
        getPayloadList();
    }, [searchFlag])

    const getPayloadList = async () => {
        setLoading(true);
        try {
            let query = `http://localhost:8080/payloads?`;

            if (spaceSatellite) {
                query += `space_satellite=${ spaceSatellite }&`;
            }

            if (loadCapacityStart) {
                query += `load_capacity_start=${ loadCapacityStart }&`;
            }

            if (loadCapacityEnd) {
                query += `load_capacity_end=${ loadCapacityEnd }&`;
            }

            if (flightDateStart) {
                query += `flight_date_start=${ flightDateStart }&`;
            }

            if (flightDateEnd) {
                query += `flight_date_end=${ flightDateEnd }&`;
            }

            // if (desiredPriceStart) {
            //     query += `desired_price_start=${ desiredPriceStart }&`;
            // }

            // if (desiredPriceEnd) {
            //     query += `desired_price_end=${ desiredPriceEnd }&`;
            // }

            const response = await fetch(query);
            const data = await response.json();
            
            console.log("data: ", data);

            setPayloads(data.payloads);
        } catch (error) {
            console.log("Error: ", error);
            setPayloads(payloadsMock);
        }
        setLoading(false);
    }

    const handleFlightDateStart = (event: any) => {
        setFlightDateStart(event.target.value)
    }

    const handleFlightDateEnd = (event: any) => {
        setFlightDateEnd(event.target.value)
    }

    const handleLoadCapacityStart = (event: any) => {
        setLoadCapacityStart(event.target.value);
        console.log(loadCapacityStart);
    }

    const handleLoadCapacityEnd = (event: any) => {
        setLoadCapacityEnd(event.target.value);
    }

    return (
        <div>
            {loading && <h1>Загрузка</h1>}

            <div className="search_container">
                <input min="0" placeholder="Введите название КА" value={spaceSatellite} onChange={(event => setSpaceSatellite(event.target.value))}></input>
                <div onClick={() => setSearchFlag(!searchFlag)} aria-disabled={!loading}>Найти</div>
            </div>

            <div className="filter_container">
                <div className="search_container">
                    <label htmlFor="">Вес КА</label>
                    от <input type="number" placeholder="Минимальный вес КА" value={loadCapacityStart} onChange={ handleLoadCapacityStart }></input>
                    до <input type="number" placeholder="Максимальный вес КА" value={loadCapacityEnd} onChange={ handleLoadCapacityEnd }></input>
                </div>

                <div className="search_container">
                    <label htmlFor="">Дата планируемого полёта</label>
                    от <input type="datetime-local" placeholder="Начальна дата" value={flightDateStart} onChange={ handleFlightDateStart }></input>
                    до <input type="datetime-local" placeholder="Конечная дата" value={flightDateEnd} onChange={ handleFlightDateEnd }></input>
                </div>
            </div>
           
            {payloads && payloads.length > 0 ?
                <div className="card_container">
                    {payloads.map((value, id) => (
                        <PayloadCard data={value} key={id}></PayloadCard>
                    ))}
                </div> :
                <div>
                    <h1>Ничего не найдено</h1>
                </div>
            }
        </div>
    )
}

export default PayloadsPage