import React from 'react';
import '../../assets/styles/JoinCodeProvider.scss';

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string;
};

const JoinCodeProvider: React.FC<Props> = ({ handleChange, handleSubmit, value }): React.ReactElement => {
  const retElement = (
    <div className='inputCode'>
      <h1>Or enter your friend's game</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <input type='text' placeholder='Enter join code...' onChange={handleChange} value={value} />
        <input type='submit' value='Join' />
      </form>
    </div>
  );
  return retElement;
};

export default JoinCodeProvider;
