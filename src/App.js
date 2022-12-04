import React, {useState} from "react";
import Navigator from "./components/Navigator";
import Timeline from "./components/Timeline";
import Banner from "./components/Banner";
import Compose from "./components/Compose";
import Single from "./components/Single";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";




function App() {
  const [message, setMessage] = useState();

  function addEntry(data) {
    fetch("http://localhost:5000/compose", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data)
    })
    .catch(err => {
      setMessage(data);
    })
  }

  function deleteEntry(id) {

    fetch("http://localhost:5000/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(response => response.json())
    .then(data => {
        setMessage(data);
    });
    
}

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navigator />
          <Banner />
          <Timeline message={message} setMessage={setMessage}/>
        </>
      )
    },
  
    {
      path:"timeline/:id",
      element: (
        <>
          <Navigator />
          <Single deleteEntry={deleteEntry} setMessage={setMessage} />
        </>
      )
    },
  
    {
      path: "/compose",
      element: (
        <>
          <Compose addEntry={addEntry} />
        </>
      )
    }
  ]);

  return (
  <div>

    <RouterProvider router={router} />

  </div>);
}

export default App;
