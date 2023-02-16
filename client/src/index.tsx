import ReactDOM from 'react-dom/client';
import JoinCode from './Pages/JoinCode';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/game' element={null} />
      <Route path='/joincode' element={<JoinCode />} />
    </Routes>
  </BrowserRouter>
);
