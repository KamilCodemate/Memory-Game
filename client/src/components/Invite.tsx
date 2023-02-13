type Props = {
  code: string;
};

const App: React.FC<Props> = ({ code }): React.ReactElement => {
  return (
    <div className='codeContainer'>
      <input type='text' value={code} readOnly />
    </div>
  );
};
export default App;
