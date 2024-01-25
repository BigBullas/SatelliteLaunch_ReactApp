import { FC, useEffect, useState } from 'react'
import PayloadCard from '../../components/PayloadCard';
import payloadsMock from '../../mocks/payloads';
import './PayloadsPage.css';
import { PayloadCardType } from '../../types';

const PayloadsPage: FC = () => {
    const [spaceSatellite, setSpaceSatellite] = useState('')
    const [payloads, setPayloads] = useState<PayloadCardType[]>()
    const [loading, setLoading] = useState(false)
    const [searchFlag, setSearchFlag] = useState(false)

    useEffect(() => {
        getPayloadList();
    }, [searchFlag])

    const getPayloadList = async () => {
        setLoading(true);
        try {
            let query = `http://localhost:8080/payloads?space_satellite=${spaceSatellite}`;
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

    // useEffect(() => {
    //     setLoading(true)
    //     fetch(`http://localhost:8080/payloads?space_satellite=${spaceSatellite}`)
    //         .then((response) => {
    //             if (!connection) {
    //                 setConnection(true)
    //             }
    //             return response.text()
    //         })
    //         .then((data) => {
    //             console.log(JSON.parse(data), "Payloads", payloads)
    //             setPayloads(JSON.parse(data).payloads)
    //             console.log("2341", payloads)
    //             setLoading(false)
    //         })
    //         .catch((error: Error) => {
    //             setLoading(false)
    //             console.log("ererer", error)
    //             // if (!connection) setPayloads(payloadsMock)
    //         })
    // }, [searchFlag])

    const handleSearch = () => {
        setSearchFlag(!searchFlag)
    }

    return (
        <div>
            {loading && <h1>Загрузка</h1>}

            <div className="search_container">
                <input placeholder="Введите название КА" value={spaceSatellite} onChange={(event => setSpaceSatellite(event.target.value))}></input>
                <div onClick={handleSearch} aria-disabled={!loading}>Найти</div>
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