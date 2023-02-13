import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Invite: React.FC<{}> = (): React.ReactElement => {
  const [joinCode, setJoinCode] = useState<null | string>(null);

  useEffect(() => {
    const downloadCode = async () => {
      const response = await axios.get('/api/code');
      console.log(response);
    };
    downloadCode();
  }, []);

  return <div></div>;
};
export default Invite;
