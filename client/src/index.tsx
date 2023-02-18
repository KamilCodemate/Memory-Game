import ReactDOM from 'react-dom/client';
import JoinCode from './Pages/JoinCode';
import Game from './Pages/Game';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/game' element={<Game />} />
      <Route path='/joincode' element={<JoinCode />} />
    </Routes>
  </BrowserRouter>
);
