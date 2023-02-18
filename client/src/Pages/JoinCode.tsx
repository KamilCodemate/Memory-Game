import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/JoinCode.scss';
import Invite from '../components/JoinCode/Invite';
import JoinCodeProvider from '../components/JoinCode/JoinCodeProvider';

const JoinCode: React.FC<{}> = (): React.ReactElement => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState<null | string>(null);
  const [gameId, setGameId] = useState<null | string>(null);
  const [gameId2, setGameId2] = useState<null | string>(null);
  const [playerId, setPlayerId] = useState<null | string>(null);
  const [joinCodeProvider, setJoinCodeProvider] = useState<string>('');

  useEffect(() => {
    const downloadCode = async () => {
      try {
        const response = await axios.get('/api/code');
        console.log(response);
        const joinCode = response.data.joinCode;
        setPlayerId(response.data.playerId);
        setGameId(response.data.gameId);
        if (response && joinCode) setJoinCode(joinCode);
      } catch (err) {
        console.log(err);
      }
    };
    downloadCode();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const checkGame = await axios.post('/api/checkgame', { gameId: gameId2 || gameId });
        if (checkGame) {
          if (checkGame.data.success) {
            navigate('/game');
          }
        }
        console.log(checkGame);
      } catch (err) {
        console.log(err);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameId, gameId2]);

  useEffect(() => {
    console.log(joinCodeProvider);
  }, [joinCodeProvider]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setJoinCodeProvider(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const sendCode = async () => {
      try {
        const response = await axios.post('/api/join', { joinCode: joinCodeProvider });
        setGameId2(response.data.gameId);
      } catch (err) {
        console.log(err);
      }
    };
    localStorage.setItem('gameData', JSON.stringify({ gameId: gameId2 ? (gameId2 as string) : (gameId as string), playerId: playerId as string }));
    sendCode();
  };
  return (
    <div className='container'>
      <Invite code={joinCode} />
      <JoinCodeProvider handleChange={handleChange} handleSubmit={handleSubmit} value={joinCodeProvider} />
    </div>
  );
};

export default JoinCode;
