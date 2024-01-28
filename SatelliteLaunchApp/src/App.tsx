import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SinglePayloadPage from './pages/SinglePayloadPage'
import PayloadsPage from './pages/PayloadsPage'
import Header from './components/Header/Header'
import Breadcrump from './components/Breadcrump/Breadcrump'

const App: React.FC = () => {
  const [desc, setDesc] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const changeBreadcrump = (newDesc: string, newPath: string) => {
    setDesc(newDesc);
    setPath(newPath);
  }
  return (
    <BrowserRouter>
      <Header />
      <Breadcrump desc={ desc } path= { path } />
      <Routes>
        <Route path="/payloads" element={<PayloadsPage changeBreadcrump = {changeBreadcrump} />} />
        <Route path="/payloads/:id" element={<SinglePayloadPage changeBreadcrump = {changeBreadcrump} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


/* CSS styles */

// body {
//   background-color: #ECE9F2;
//   /* background-color: #ECF0F1; */
// }

// .search_container {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 5px;
//     justify-content: left;
//     margin-top: 20px;
// }

// input {
//   all: unset;
// }

// .input_search {
//   border-style: solid;
  
//   border: 1px solid white;
// }

// <!DOCTYPE html>
// <html>
// <head>
// <title>HTML CSS JS</title>
// </head>
// <body>
//   <div class="search_container">
//     <input class="input_search" placeholder="Введите название КА" value="">
//     <div aria-disabled="true">Найти</div>
//   </div>
//   <div class="filter_container">
//     <div class="search_container">
//       <label for="">По весу</label>
      
//       <label for="load_capacity_min">От: </label>
//       <input id="load_capacity_min" type="number" min=0 max=500 placeholder="Минимальный вес КА" value="">
//       <label for="load_capacity_max">До: </label>
//       <input id="load_capacity_max" type="number" placeholder="Максимальный вес КА" value="">
//     </div>
//     <div class="search_container">
//       <label for="">Дата планируемого полёта</label>
//       от <input type="datetime-local" placeholder="Начальна дата" value="">
//       до <input type="datetime-local" placeholder="Конечная дата" value="">
//     </div>
//   </div>
// </body>
// </html>