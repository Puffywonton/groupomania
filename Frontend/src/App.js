import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import { DataProvider } from './Context/userContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import CreateBill from './Pages/CreateBill';
import ModifyBill from './Pages/ModifyBill';

const App = () => {
  const [currentUser, setCurrentUser] = useState('')
  return (
      <DataProvider value={{currentUser, setCurrentUser}}>
        <div className='bg-slate-50'>
          <Router>
            <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/createbill" element={<CreateBill />} />
                <Route path="/modifybill/:id" element={<ModifyBill />} />
              </Routes>
            <Footer />
          </Router>    
        </div>        
      </DataProvider>
  );
}

export default App;
