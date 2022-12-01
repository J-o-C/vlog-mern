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

  </div>);
}

export default App;
