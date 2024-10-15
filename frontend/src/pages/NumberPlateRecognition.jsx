// src/pages/NumberPlateRecognition.js

import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

const NumberPlateRecognition = ({ addParkingLog }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
    setIsCameraActive(false);
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    recognizePlate(imageData);
  };

  const recognizePlate = (image) => {
    setLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => console.log(m), // Optional: log progress
      }
    ).then(({ data: { text } }) => {
      const recognizedPlate = text.trim();
      setRecognizedText(recognizedPlate);
      stopCamera(); // Stop the camera after capturing
      setLoading(false);
      setShowConfirmation(true); // Show confirmation dialog
    }).catch((error) => {
      console.error('Error recognizing text:', error);
      setLoading(false);
    });
  };

  const handleConfirm = () => {
    addParkingLog(recognizedText); // Log the entry
    setShowConfirmation(false); // Hide confirmation dialog
    setRecognizedText(''); // Reset recognized text
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Hide confirmation dialog
    setRecognizedText(''); // Reset recognized text
  };

  return (
    <div className="npr-section mb-10" style={{ backgroundColor: '#FFDFB0', borderRadius: '8px', padding: '20px' }}>
      <h3 className="text-3xl font-semibold mb-6" style={{ color: '#4A6D0A' }}>
        Number Plate Recognition
      </h3>

      {/* Video Feed */}
      <div className="mb-6">
        <video ref={videoRef} style={{ width: '100%', borderRadius: '8px' }}></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>

      {!isCameraActive ? (
        <button
          className="py-3 px-6 rounded-lg bg-[#4A6D0A] hover:bg-[#5d80ff] transition text-white mb-4"
          onClick={startCamera}
        >
          Start Camera
        </button>
      ) : (
        <button
          className="py-3 px-6 rounded-lg bg-[#4A6D0A] hover:bg-[#5d80ff] transition text-white mb-4"
          onClick={captureImage}
        >
          Capture Image
        </button>
      )}

      {/* Display Recognized Text */}
      {recognizedText && (
        <div className="mt-6 p-4 rounded-lg bg-[#FFDFB0] text-[#C03A3A]">
          <h4 className="text-2xl">Recognized Number Plate:</h4>
          <p className="text-xl font-semibold">{recognizedText}</p>
        </div>
      )}

      {loading && <p>Recognizing...</p>}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <h4>Do you want to add the recognized number plate to the log?</h4>
          <button onClick={handleConfirm} className="confirm-button">Yes</button>
          <button onClick={handleCancel} className="cancel-button">No</button>
        </div>
      )}
    </div>
  );
};

export default NumberPlateRecognition;
