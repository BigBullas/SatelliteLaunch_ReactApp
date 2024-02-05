import { FC, useEffect, useState } from 'react'
import PayloadCard from '../../components/PayloadCard';
import './PayloadsPage.css';
import { PayloadCardType } from '../../types';
import { usePayloadList } from '../../hooks/usePayloadList'
import { api } from '../../api';
import { useUser } from '../../hooks/useUser';

type Props = {
    payloads: PayloadCardType[]
    changeBreadcrump: Function
    getPayloadList: Function
    loading: boolean
    setDraftID: Function
    draftID: number | null | undefined
}

const PayloadsPage: FC<Props> = ({ payloads, changeBreadcrump, getPayloadList, loading, draftID, setDraftID }) => {
    const { loadCapStart, loadCapEnd, flDateStart, flDateEnd, spaceSatValue, 
        setLoadCapStart, setLoadCapEnd, setFlDateStart, setFlDateEnd, setSpaceSatValue } = usePayloadList();
    const { isAuthorized } = useUser();

    const [spaceSatellite, setSpaceSatellite] = useState<string>(spaceSatValue);
    const [loadCapacityStart, setLoadCapacityStart] = useState<number | string>(loadCapStart);
    const [loadCapacityEnd, setLoadCapacityEnd] = useState<number | string>(loadCapEnd);
    const [flightDateStart, setFlightDateStart] = useState<Date | string>(flDateStart);
    const [flightDateEnd, setFlightDateEnd] = useState<Date | string>(flDateEnd);

    const [payloadsInDraft, setPayloadsInDraft] = useState<PayloadCardType[]>([])

    useEffect(() => {
        if (typeof(draftID) === 'number' && draftID) {
            getPayloadsFromDraft();
        }
        changeBreadcrump('', '');
    }, [draftID])

    const getPayloadsFromDraft = async () => {
        if (typeof(draftID) === 'number' && draftID && isAuthorized) {
            try {
                const response = await api.rocketFlights.rocketFlightsDetail(draftID);
        
                // @ts-ignore
                const { payloads: receivedPayloadsInDraft } = response.data;
        
                console.log("data List: ", response.data, receivedPayloadsInDraft);
                setPayloadsInDraft(receivedPayloadsInDraft);
        
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    }
    
    const handleSpaceSatellite = (event: any) => setSpaceSatellite(event.target.value);

    const handleFlightDateStart = (event: any) => setFlightDateStart(event.target.value);
    const handleFlightDateEnd = (event: any) => setFlightDateEnd(event.target.value);

    const handleLoadCapacityStart = (event: any) => setLoadCapacityStart(event.target.value);
    const handleLoadCapacityEnd = (event: any) => setLoadCapacityEnd(event.target.value);

    const handleFindBtnClick = () => {
        setLoadCapStart(loadCapacityStart);
        setLoadCapEnd(loadCapacityEnd);
        setFlDateStart(flightDateStart);
        setFlDateEnd(flightDateEnd);
        setSpaceSatValue(spaceSatellite);
        getPayloadList(spaceSatellite, loadCapacityStart, loadCapacityEnd, flightDateStart, flightDateEnd);
    }

    return (
        <div className='payload_list_container'>
            {loading && <h1>Загрузка</h1>}

            <div className="list-options">
                <div style={{flexGrow: '2', display: 'flex' }}>
                    <input
                    className="input_search"
                    placeholder="Введите название КА"
                    value={ spaceSatellite }
                    onChange={ handleSpaceSatellite }
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
                            value={ String(flightDateStart) } 
                            onChange={ handleFlightDateStart }/>
                        </div>
                        <div style={{padding: '0.3em 1em 0 1em' }}> - </div>
                        <div>
                            <input 
                            className="input_search" 
                            type="datetime-local" 
                            value={ String(flightDateEnd) }
                            onChange={ handleFlightDateEnd }/>
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
           
            {payloads && payloads.length > 0 ?
                <div className="card_container">
                    {payloads.map((value, id) => {
                        return (<PayloadCard data={value} key={id} payloadsInDraft = { payloadsInDraft } setDraftID = { setDraftID }></PayloadCard>);
                    })}
                </div> :
                <div style={{textAlign: 'center', padding: '3em 0 3em 0'}}>
                    <h1>Ничего не найдено</h1>
                </div>
            }
        </div>
    )
}

export default PayloadsPage