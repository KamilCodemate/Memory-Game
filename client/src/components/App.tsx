import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../assets/styles/App.scss';
import Invite from './Invite';
const App: React.FC<{}> = (): React.ReactElement => {
  const [joinCode, setJoinCode] = useState<null | string>(null);

  useEffect(() => {
    const downloadCode = async () => {
      try {
        const response = await axios.get('/api/code');
        const joinCode = response.data.joinCode;

        if (response && joinCode) setJoinCode(joinCode);
      } catch (err) {
        console.log(err);
      }
    };
    downloadCode();
  }, []);

  return (
    <div className='container'>
      <Invite code={joinCode} />
    </div>
  );
};
export default App;
