import React from 'react'
import Grid from './component/grid'
import CreateData from './component/uploadData'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Router>

    <Routes>
        <Route path={`/`} element={<Grid/>} />
        <Route path={`/create`} element={<CreateData/>} />
      
    </Routes>
</Router>
  )
}

export default App
