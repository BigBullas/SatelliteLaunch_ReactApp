import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SinglePayloadPage from './pages/SinglePayloadPage'
import PayloadsPage from './pages/PayloadsPage'
import Header from './components/Header/Header'
import { usePayloadList } from './hooks/usePayloadList'
import { PayloadCardType } from './types'
import payloadsMock from './mocks/payloads';
import { dateComparison } from './utils';
import { api } from './api'
import AuthPage from './pages/AuthPage'
import RegPage from './pages/RegPage'
import ContainerUnderHeader from './components/ContainerUnderHeader/ContainerUnderHeader'

const App: React.FC = () => {
  const [draftID, setDraftID] = useState(0);
  const [payloads, setPayloads] = useState<PayloadCardType[]>([]);
  const { loadCapStart, loadCapEnd, flDateStart, flDateEnd, spaceSatValue } = usePayloadList();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPayloadList(spaceSatValue, loadCapStart, loadCapEnd, flDateStart, flDateEnd);
  }, [])

  const getPayloadList = async (spaceSatValue: string, loadCapStart: string | number,
     loadCapEnd: string | number, flDateStart: Date | string, flDateEnd: string | Date) => {
      setLoading(true);
      try {
        const response = await api.payloads.payloadsList({
          space_satellite: spaceSatValue ?? "",
          load_capacity_start: String(loadCapStart) ?? "",
          load_capacity_end: String(loadCapEnd) ?? "",
          flight_date_start: String(flDateStart) ?? "",
          flight_date_end: String(flDateEnd) ?? "",
        })

        // @ts-ignore
        const { draftRocketFlightId, payloads: receivedPayloads } = response.data;

        console.log("data: ", response.data, draftRocketFlightId, receivedPayloads);

        setPayloads(receivedPayloads);
        setDraftID(draftRocketFlightId);
        
        console.log("draftID: ", draftID, draftRocketFlightId)

      } catch (error) {
          console.log("Error: ", error);

          setPayloads(payloadsMock.filter((item) =>{
              return  (item.title.includes(spaceSatValue)
              && (loadCapStart === '' || loadCapStart === 0 || item.load_capacity >= Number(loadCapStart))
              && (loadCapEnd ==='' || loadCapEnd === 500 || item.load_capacity <= Number(loadCapEnd)) 
              && (dateComparison(item.flight_date_end, flDateStart))
              && (dateComparison(flDateEnd, item.flight_date_start))
              )
          }));
      }
      setLoading(false);
  }

  const [desc, setDesc] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const changeBreadcrump = (newDesc: string, newPath: string) => {
    setDesc(newDesc);
    setPath(newPath);
  }
  return (
    <BrowserRouter>
      <Header />
      <ContainerUnderHeader desc={ desc } path={ path } draftID={ draftID }/>
      
      <Routes>
        <Route path="/" element={<PayloadsPage changeBreadcrump = {changeBreadcrump} payloads={ payloads }
         loading = { loading } getPayloadList={ getPayloadList } draftID = { draftID } setDraftID = { setDraftID }/>} />
        <Route path="/payloads/:id" element = {<SinglePayloadPage changeBreadcrump = {changeBreadcrump} />} />
        <Route path="/rocket_flights" element = { <h1>RocketFlightList</h1> }/>
        <Route path="/rocket_flights/:id" element = { <h1>SingleRocketFlight</h1> }/>
        <Route path="/auth" element = { <AuthPage changeBreadcrump = {changeBreadcrump}/> }/>
        <Route path="/reg" element = { <RegPage  changeBreadcrump = {changeBreadcrump}/> }/>
        <Route path="/profile" element = { <h1>Profile</h1> }/>
      </Routes>
    </BrowserRouter>
  )
}

{/* </HashRouter> */}

export default App