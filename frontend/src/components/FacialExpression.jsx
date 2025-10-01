import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./facialExpression.css";
import axios from "axios";
import MoodSongs from './MoodSongs'

export default function FacialExpression({ setSongs, setMood }) {
  const videoRef = useRef(); // <video> tag ka reference

  // Step 1: Models load karna
  const loadModels = async () => {
    const MODEL_URL = "/models"; // models folder ka path
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  // Step 2: Webcam start karna
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true }) // webcam access maangna
      .then((stream) => {
        videoRef.current.srcObject = stream; // stream ko video tag me dalna
        console.log("Camera started:", stream);
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  // Step 3: Mood detect karna (sirf jab button press ho)
  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    let mostProbableExpression = 0;
    let _expression = "";

    // expressions object me se sabse zyada probability wala nikalna
    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbableExpression) {
        mostProbableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }
    console.log(_expression);
    setMood(_expression)
    
    // get -> localhost:3000/songs?mood=happy
    axios
      .get(`http://localhost:3000/songs?mood=${_expression}`)
      .then((response) => {
        // console.log(response.data);
        setSongs(response.data.songs);
      });
  }

  // useEffect sirf ek dafa run hoga jab component mount hoga
  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  // Step 4: UI render karna
  return (
    <div className="mood-element">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />
      <button onClick={detectMood}>Detect</button>
      
    </div>
  );
}
