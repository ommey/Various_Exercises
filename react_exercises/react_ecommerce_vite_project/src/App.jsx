import { HomePage } from './Pages/HomePage'
import './App.css'
import { Routes, Route } from 'react-router'

function App() {

  return (
    < Routes>
      <Route path="/" element={< HomePage />}></Route>
      <Route path="/checkout" element={<div>TEST</div>}></Route>

    </Routes>
  )
}

export default App
