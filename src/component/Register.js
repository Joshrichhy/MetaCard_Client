import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import * as faceapi from "face-api.js";
import axios from "axios"

function Register({ isOpen, isClose }) {
    const [isFaceDeteceted, setIsFaceDetected] = useState(false);
    const[Message, setMessage] = useState("");
    const[confirmedPassword, setConfirmedPassword] = useState("")
    const[passwordMessage, setPasswordMessage] = useState("")
    const [formData, setFormData] = useState({
        emailAddress: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if(formData.password == confirmedPassword){
            const response = await axios.post('http://localhost:8081/api/v1/customer/register', formData);
            setMessage(response.data)}
            else{
               formData.password = "";
               setConfirmedPassword("")
                setPasswordMessage("password doesn't match")
            }
                        // Handle successful registration response, e.g. show a success message.
        } catch (error) {
            if(error.response.status === 400){
                setMessage("User already exist")
            }

            // Handle registration error, e.g. display an error message.
        }
    };


    useEffect(() => {
        async function loadFaceAPI() {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

            // Models are loaded, start face recognition
            startFaceRecognition();
        }

        // Access user's camera and start face recognition
        async function startFaceRecognition() {
            const video = document.getElementById("camera");
            const constraints = { video: true };

            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                video.srcObject = stream;

                video.addEventListener("play", async () => {
                    const canvas = faceapi.createCanvasFromMedia(video);
                    document.body.append(canvas);

                    const displaySize = { width: video.width, height: video.height };
                    faceapi.matchDimensions(canvas, displaySize);

                    setInterval(async () => {
                        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

                        if (detections.length > 0) {
                            setIsFaceDetected(true);
                        } else {
                            setIsFaceDetected(false);
                        }

                        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                        faceapi.draw.drawDetections(canvas, detections);
                    }, 100);
                });
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        }

        if (isOpen) {
            loadFaceAPI();
        }
    }, [isOpen]);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                Registration Form
                <form onSubmit={handleSubmit} onClick={isClose}>
                    <br />
                    <input className = "email"
                           name = "emailAddress"
                           type="email" placeholder="Enter your email address"
                           required={true}
                           value={formData.emailAddress}
                           onChange={handleChange}/>
                    <br />
                    <br />
                    <input className = "password" 
                           name = "password"
                           required={true}
                           type="password" placeholder="Enter password"
                           value={formData.password}
                           onChange={handleChange} />
                   <br/>
                    <br/>
                    <input className = "confirmPassword"
                           name = "confirmPassword"
                           required={true}
                           onChange={(e) => setConfirmedPassword(e.target.value)}
                           type="password" placeholder="confirm password" />
                    <p className="passwordMessage">{passwordMessage}</p>
                    <br />
                    <button disabled={isFaceDeteceted} type="submit">
                        Submit
                    </button>
                    <p>{Message}</p>
                </form>
                <video id="camera" autoPlay muted style={{ display: "block" }}></video>
            </div>
        </div>
    );
}

export default Register;
