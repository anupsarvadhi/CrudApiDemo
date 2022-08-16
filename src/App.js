import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TableData from './componant/TableData'
import UserForm from './componant/UserForm'
import Edit from './componant/Edit'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TableData />} />
        <Route path="/adduser" element={<UserForm />} />
        <Route path="/Edit/:id" element={<Edit />} />
      </Routes>
    </>
  )
}

export default App
