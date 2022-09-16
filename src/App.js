import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import { DataProvider } from './Context/userContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home'
import About from './Pages/About'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Bill from './Pages/Bill';
import CreateBill from './Pages/CreateBill';
import Billboard from './Pages/Billboard';

const App = () => {
  const [currentUser, setCurrentUser] = useState('')
  return (
      <DataProvider value={{currentUser, setCurrentUser}}>
        <div className="relative pb-10 min-h-screen">
          <Router>
            <Header /> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/bill/:id" element={<Bill />} />
              <Route path="/billboard" element={<Billboard />} />
              <Route path="/createbill" element={<CreateBill />} />
            </Routes>
            <Footer />
          </Router>    
        </div>        
      </DataProvider>
      
  );
}

export default App;
