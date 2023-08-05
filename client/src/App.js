import React from "react"
import Liste from './Components/Liste'
import Create from './Components/Create'
import Edit from './Components/Edit'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Liste/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </Router>
  )
}