import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../assets/styles/JoinCode.scss';
import Invite from '../components/JoinCode/Invite';
import JoinCodeProvider from '../components/JoinCode/JoinCodeProvider';
const JoinCode: React.FC<{}> = (): React.ReactElement => {
  const [joinCode, setJoinCode] = useState<null | string>(null);
  const [joinCodeProvider, setJoinCodeProvider] = useState<string>('');
  useEffect(() => {
    const downloadCode = async () => {
      try {
        const response = await axios.get('/api/code');
        console.log(response);
        const joinCode = response.data.joinCode;

        if (response && joinCode) setJoinCode(joinCode);
      } catch (err) {
        console.log(err);
      }
    };
    downloadCode();
  }, []);

  useEffect(() => {
    console.log(joinCodeProvider);
  }, [joinCodeProvider]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setJoinCodeProvider(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    //request code
  };
  return (
    <div className='container'>
      <Invite code={joinCode} />
      <JoinCodeProvider handleChange={handleChange} handleSubmit={handleSubmit} value={joinCodeProvider} />
    </div>
  );
};
export default JoinCode;
