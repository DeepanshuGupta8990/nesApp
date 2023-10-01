import { useRef, useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import News from './News';

export default function App() {
  const [mode, setMode] = useState('light');
  const [alert1, setAlert1] = useState(false);
  const alert1Ref = useRef(null);
  const [category, setCategory] = useState('general')
 

 function passFuncToNavBar(data){
  setCategory(data)
 }

 document.title = "News app - "+ (category.charAt(0).toUpperCase()+category.slice(1))

  function ontoggle1() {
    if (mode === 'light') {
      setMode('dark');
      setAlert1(true)
      clearInterval(alert1Ref.current)
      alert1Ref.current = setTimeout(() => {
        setAlert1(false);
      }, 1500)
    }
    else {
      setMode('light');
      setAlert1(true)
      clearInterval(alert1Ref.current)
      alert1Ref.current = setTimeout(() => {
        setAlert1(false);
      }, 1500)
    }
  }

  return (
    <>

      <Navbar modeVal={mode} comingFunc={passFuncToNavBar}/>
     
     <div id='box2'>
      <h1 className={`${mode}h1`}>Welcome to reliable news channel - {(category.charAt(0).toUpperCase()+category.slice(1))} category</h1>
      <Toggle ontoggle1={ontoggle1} mode={mode}/>
     </div>
      {alert1 && <div className="alert alert-success" role="alert">
         {(mode.charAt(0).toUpperCase()+mode.slice(1))} mode active
      </div>}
      <News modeVal={mode} newsCatg={category}/>
    </>
  );
}

function Toggle({ontoggle1,mode}){
  return(
<>
<div id="toggle" className="form-check form-switch">
        <input className="form-check-input input" onClick={ontoggle1} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked"><p id='para1' className={mode}>{mode}</p></label>
      </div>
</>
  );
}

// business entertainment general health science sports technology