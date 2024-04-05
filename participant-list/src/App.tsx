import React, {useEffect, useState } from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import { codeType, participantsType } from './types';

function App() {

  const sortFunction = (type:string, isAscending:boolean) => {
    if(type === "COUNT") participants.sort((a, b)=>(isAscending?1:-1)*(a.count-b.count))
    else if(type === "NAME") participants.sort((a, b) => {
      let comp = a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      return (isAscending?1:-1)*comp;
    })
  }

  const [participants,setParticipants] = useState<participantsType["participants"]>([]);
  const [dataLoaded,setDataLoaded] = useState<boolean>(false);

  
  useEffect(()=>{
    
    let baseurl = "http://localhost:5000/participants"
    const getData = async () => {
      const response = await axios.get(baseurl)
      let patients = response.data
  
      let temp_list:participantsType['participants'] = []
      let id = 1
      patients.forEach((item: { firstName: string; lastName: string; diagnoses: codeType[]; }) => {
        temp_list.push({
          name: item.firstName + " " + item.lastName,
          diagnoses: item.diagnoses,
          count: item.diagnoses.length,
          id: id 
        })
        id+=1
      })
      temp_list.sort((a,b)=>b.count-a.count)
      setParticipants(temp_list);
      setDataLoaded(true);
    }

    getData();
  },[])

  const ParticipantInfo = React.lazy(() => import("./ParticipantInfo/index"))
  const ParticipantList = React.lazy(() => import("./ParticipantList/index"))

  const routes = [
      { path: "/", element: <ParticipantList participants={participants} sortFunction={sortFunction} dataLoaded={dataLoaded}/> },
      { path: "/info/:id", element: <ParticipantInfo participants={participants} dataLoaded={dataLoaded} /> },
      { path: "*", element: <Navigate to="/" />}
  ]

  const router = createBrowserRouter([
    {
      element: <Layout />,
      // specify the routes defined in the
      // routing layer directly
      children: routes
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
