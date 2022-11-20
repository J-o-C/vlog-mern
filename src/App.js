import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";
import Navigator from "./components/Navigator";
import Timeline from "./components/Timeline";
import Banner from "./components/Banner";
import Compose from "./components/Compose";

function App() {
  
  const [doRender, setDoRender] = useState(true);

  function changeDoRender () {
    setDoRender(prevValue => !prevValue);
  }


  return (
  <div>
    {doRender ? <Navigator /> : null}
    {doRender ? <Banner /> : null}
    <Routes>
      <Route path="/" element={doRender ? <Timeline changeDoRender={changeDoRender} /> : <Compose changeDoRender={changeDoRender} />} />
      <Route path="/about" element={<h1>about</h1>} />
      <Route path="/contact-us" element={<h1>contact us</h1>} />
    </Routes>


  </div>);
}

export default App;
