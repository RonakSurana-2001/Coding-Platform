import './App.css';
import LoginPage from './Components/LoginPage';
import SampleComponent from './Components/SampleComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SampleComponent2 from './Components/SampleComponent2';
import Profile from './Components/Profile';
import QuestionDetail from './Components/QuestionDetail';

function App() {
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
            path="/saved"
            element={<SampleComponent2 />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/question/:id"
            element={<QuestionDetail />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
