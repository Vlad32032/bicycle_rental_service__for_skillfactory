import { Routes, Route } from 'react-router-dom'

import { Homepages } from './pages/Homepages'
import { Casespages } from './pages/Cases/Casespages'
import { CaseDetailpage } from './pages/Cases/CaseDetailpage'
import { Officerspages } from './pages/Officers/Officerspage' 
import { OfficerDetailpage } from './pages/Officers/OfficerDetailpage'
import { Notfoundpage } from './pages/Info/Notfoundpage'
import { NotAuthpage } from './pages/Info/NotAuthpage'
import { NotApprovedpage } from './pages/Info/NotApprovedpage'

import { Layout } from './components/Layaot/Layaot'

import { RequireAuth } from './hoc/RequireAuth'
import { RequireApproved } from './hoc/RequireApproved'

import './App.css'


function App() {

return (
  <div className="App">
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Homepages />} />
        <Route path="/cases" element={
          <RequireAuth>
            <Casespages />
          </RequireAuth>
        } />
        <Route path="/cases/:id" element={
          <RequireApproved>
            <CaseDetailpage />
          </RequireApproved>
        } />
        <Route path="/officers" element={
          <RequireAuth>
            <Officerspages/>
          </RequireAuth>
        } />
        <Route path="/officers/:id" element={
          <RequireApproved>
            <OfficerDetailpage />
          </RequireApproved>
        } />
        <Route path="/not_auth" element={<NotAuthpage />}/>
        <Route path="/not_approved" element={<NotApprovedpage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Route>
    </Routes>
  </div>
  )
}

export default App
