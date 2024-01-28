import { FC, useEffect, useState } from 'react'
import PayloadCard from '../../components/PayloadCard';
import payloadsMock from '../../mocks/payloads';
import './PayloadsPage.css';
import { PayloadCardType } from '../../types';
import { dateComparison } from '../../utils';

type Props = {
    changeBreadcrump: Function
}

const PayloadsPage: FC<Props> = ({ changeBreadcrump }) => {
    const [spaceSatellite, setSpaceSatellite] = useState<string>('');
    const [loadCapacityStart, setLoadCapacityStart] = useState<number | string>(0);
    const [loadCapacityEnd, setLoadCapacityEnd] = useState<number | string>(500);
    const [flightDateStart, setFlightDateStart] = useState<Date | string>('');
    const [flightDateEnd, setFlightDateEnd] = useState<Date | string>('');
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

            // TODO: добавить фильтры на бэкенде
            
            console.log("data: ", data);

            setPayloads(data.payloads);
        } catch (error) {
            console.log("Error: ", error);
            
            setPayloads(payloadsMock.filter((item) =>{
                return  (item.title.includes(spaceSatellite)
                && (loadCapacityStart === '' || loadCapacityStart === 0 || item.load_capacity >= Number(loadCapacityStart))
                && (loadCapacityEnd ==='' || loadCapacityEnd === 500 || item.load_capacity <= Number(loadCapacityEnd)) 
                && (dateComparison(item.flight_date_end, flightDateStart))
                && (dateComparison(flightDateEnd, item.flight_date_start))
                )
            }));
        }
        changeBreadcrump('', '');
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
        <div className='payload_list_container'>
            {loading && <h1>Загрузка</h1>}

            <div className="list-options">
                <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_search"
                    placeholder="Введите название КА"
                    defaultValue=""
                    value={ spaceSatellite }
                    onChange={(event => setSpaceSatellite(event.target.value))}
                    />
                </div>
                <div className="filter__container">
                    <div className='filter__label'>Вес, т: </div>
                    <div className="filter__input-container">
                        <div>
                            <input
                            className="input_search"
                            id="load_capacity_min"
                            type="number"
                            min={0}
                            max={500}
                            placeholder='0'
                            defaultValue=""
                            value={ loadCapacityStart }
                            onChange={ handleLoadCapacityStart }
                            />
                        </div>
                        <div style={{padding: '0.3em 1em 0 1em' }}> - </div>
                        <div>
                            <input
                            className="input_search"
                            id="load_capacity_max"
                            type="number"
                            min={0}
                            max={500}
                            placeholder='500'
                            defaultValue=""
                            value={ loadCapacityEnd }
                            onChange={ handleLoadCapacityEnd }
                            />
                        </div>
                    </div>
                </div>
                <div className="filter__container">
                    <div className='filter__label'>Дата: </div>
                    <div className="filter__input-container">
                        <div>
                            <input 
                            className="input_search" 
                            type="datetime-local" 
                            defaultValue="" 
                            value={ String(flightDateStart) } 
                            onChange={ handleFlightDateStart }/>
                        </div>
                        <div style={{padding: '0.3em 1em 0 1em' }}> - </div>
                        <div>
                            <input 
                            className="input_search" 
                            type="datetime-local" 
                            defaultValue=""
                            value={ String(flightDateEnd) }
                            onChange={ handleFlightDateEnd }/>
                        </div>
                    </div>
                </div>
                <div 
                    className="btn_find" 
                    aria-disabled={ !loading }
                    onClick={() => setSearchFlag(!searchFlag)}>
                    Найти
                </div>
            </div>
           
            {payloads && payloads.length > 0 ?
                <div className="card_container">
                    {payloads.map((value, id) => (
                        <PayloadCard data={value} key={id}></PayloadCard>
                    ))}
                </div> :
                <div style={{textAlign: 'center', padding: '3em 0 3em 0'}}>
                    <h1>Ничего не найдено</h1>
                </div>
            }
        </div>
    )
}

export default PayloadsPage