import './App.css';
import bell from "../src/bell.png"
import {useEffect, useState} from "react";
import io from 'socket.io-client';
function App() {
  const [notiList, setNotiList] = useState([{title:1}, {title:2}]);
  useEffect(()=>{
    let ismounted =false;
    const action = (ismounted)=>{
      ismounted = true;
      loadFromSockets();}
      action(ismounted);
    return()=>{ismounted = false}
    
  },// eslint-disable-next-line
  [])


  const loadFromSockets = ()=>{
    const socket = io.connect("http://localhost:4000");
        // On reciveing new-notification from server through Sockets & Update the View
    socket.on("new-notification", async(data)=>{
      setNotiList([...notiList, {title:data}]);
      console.log("Added new data" + data);
    })
  }

  const handleshow = ()=>{
    document.getElementById("notifications").style.display = "block";
  }
  const handlehide = ()=>{
    document.getElementById("notifications").style.display = "none";
  }
  return (
    <>
    <div onMouseOver={handleshow} onMouseLeave={handlehide} style = {{position:"absolute", top:"20%", left:"50%", margin:"20px", transform:"translate(-50%, -50%)"}}>
    <img src = {bell} alt = "bell" style = {{width:"100px"}}></img>
    <div style={{position:"absolute", top:"5px"}}>{notiList.length}</div>
    <div id = "notifications" style={{position:"absolute", display:"none"}}>
    {notiList.map((elem, index)=>{
      return(<><div key={index}>{elem.title}</div></>);
    })
  }
  </div>
  </div>
    </>
  );
}

export default App;
