import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FacialExpression from "./components/FacialExpression";
import Moodsongs from "./components/MoodSongs";

function App() {
  const [Songs, setSongs] = useState([]);
  const [mood, setMood] = useState("")

  return (
    <>
      <FacialExpression setSongs={setSongs} setMood={setMood}/>
      <Moodsongs Songs={Songs} mood={mood} />
    </>
  );
}

export default App;
