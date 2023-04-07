import './App.css';
import Calculate from './components/Calculate';
import { useState } from 'react';
function App() {
  const [cPeopleNumber,sPeopleNumber] = useState<number>(1)
  return (
  <div className='container'>
    <Calculate cPeopleNumber={cPeopleNumber} sPeopleNumber={sPeopleNumber}/>
  </div>
  );
}

export default App;
