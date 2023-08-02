import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './Components/LoginPage';
import SampleComponent from './Components/SampleComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SampleComponent2 from './Components/SampleComponent2';

function App() {
  // Load isAuth from localStorage or default to false if not available
  const [isAuth, setIsAuth] = useState(() => {
    const storedAuth = localStorage.getItem('isAuth');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  // Save isAuth to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth));
  }, [isAuth]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/homePage"
            element={<SampleComponent />}
          />
          <Route
            path="/videos"
            element={<SampleComponent2 />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
