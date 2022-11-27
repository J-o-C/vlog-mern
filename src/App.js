import React, {useState} from "react";
import Navigator from "./components/Navigator";
import Timeline from "./components/Timeline";
import Banner from "./components/Banner";
import Compose from "./components/Compose";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";




function App() {
  
  const [doRender, setDoRender] = useState(true);

  function addEntry(data) {
    fetch("http://localhost:5000/compose", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    setDoRender(prevValue => !prevValue);
  }


  return (
  <div>
    {doRender ? <Navigator /> : null}
    {doRender ? <Banner /> : null}
    <Routes>
      <Route path="/" element={doRender ? <Timeline changeDoRender={() => {setDoRender(prevValue => !prevValue);}} /> : <Compose addEntry={addEntry} />} />
      <Route path="/about" element={<h1>about</h1>} />
      <Route path="/contact-us" element={<h1>contact us</h1>} />
    </Routes>


  </div>);
}

export default App;
