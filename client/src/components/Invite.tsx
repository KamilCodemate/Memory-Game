import React, { useEffect, useRef } from 'react';
import CopyToClipboard from './CopyToClipboard';
type Props = {
  code: string | null;
};

const App: React.FC<Props> = ({ code }): React.ReactElement => {
  return (
    <div className='invitationContainer'>
      <h1>Invitation link</h1>
      <div className='codeContainer'>
        <h3>{code}</h3>
        <CopyToClipboard text={code} />
      </div>
    </div>
  );
};
export default App;
