import React, {useState} from "react";
import Navigator from "./components/Navigator";
import Timeline from "./components/Timeline";
import Banner from "./components/Banner";
import Compose from "./components/Compose";
import Single from "./components/Single";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";

function addEntry(data) {
  fetch("http://localhost:5000/compose", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigator />
        <Banner />
        <Timeline />
      </>
    )
  },

  {
    path:"timeline/:id",
    element: (
      <>
        <Navigator />
        <Single />
      </>
    )
  },

  {
    path: "/compose",
    element: (
      <>
        <Compose addEntry={addEntry}/>
      </>
    )
  }
]);


function App() {

  return (
  <div>

    <RouterProvider router={router} />

    {/* {doRender ? <Navigator /> : null}
    {doRender ? <Banner /> : null}
    <Routes>
      <Route path="/" element={doRender ? <Timeline changeDoRender={() => {setDoRender(prevValue => !prevValue);}} /> : <Compose addEntry={addEntry} />} />
      <Route path="/about" element={<h1>about</h1>} />
      <Route path="/contact-us" element={<h1>contact us</h1>} />
    </Routes> */}


  </div>);
}

export default App;
