import { useState, useRef } from 'react';
import { Camera, Check, AlertCircle } from 'lucide-react';

export default function StudentView() {
  const [captureState, setCaptureState] = useState('ready'); // ready, capturing, processing, success, error
  const [message, setMessage] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start webcam
  const startWebcam = async () => {
    try {
      setCaptureState('capturing');
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      // Store stream in ref
      streamRef.current = stream;
      
      // Set video source
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setCaptureState('error');
      setMessage('Could not access camera. Please check permissions.');
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (captureState !== 'capturing') return;
    
    setCaptureState('processing');
    setMessage('Verifying your face...');
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data as base64
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Stop webcam
      stopWebcam();
      
      // Send to backend
      sendImageToBackend(imageData);
    }
  };

  // Stop webcam
  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // Send image to backend
  const sendImageToBackend = (imageData) => {
    // Mock API call - in a real app this would be a fetch request
    console.log(imageData)
    setTimeout(() => {
      // Simulate successful face matching
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setCaptureState('success');
        setMessage('Attendance Marked');
      } else {
        setCaptureState('error');
        setMessage('Face not recognized or outside attendance time');
      }
    }, 1500);
  };

  // Reset everything
  const reset = () => {
    setCaptureState('ready');
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-6">
          Student Attendance
        </h1>
        
        <div className="flex flex-col items-center">
          {/* Webcam display */}
          {captureState === 'capturing' && (
            <div className="relative w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Hidden canvas for capturing */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Status and messages */}
          {captureState === 'success' && (
            <div className="flex flex-col items-center mb-6">
              <div className="bg-green-100 rounded-full p-4 mb-2">
                <Check size={40} className="text-green-600" />
              </div>
              <p className="text-xl font-medium text-green-600">{message}</p>
            </div>
          )}
          
          {captureState === 'error' && (
            <div className="flex flex-col items-center mb-6">
              <div className="bg-red-100 rounded-full p-4 mb-2">
                <AlertCircle size={40} className="text-red-600" />
              </div>
              <p className="text-md text-red-600">{message}</p>
            </div>
          )}
          
          {captureState === 'processing' && (
            <div className="flex flex-col items-center mb-6">
              <div className="animate-pulse">
                <div className="w-12 h-12 rounded-full bg-blue-300 mb-2"></div>
              </div>
              <p className="text-md text-blue-600">{message}</p>
            </div>
          )}
          
          {/* Action buttons */}
          {captureState === 'ready' && (
            <button 
              onClick={startWebcam}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full"
            >
              <Camera size={20} />
              Mark Attendance with Face ID
            </button>
          )}
          
          {captureState === 'capturing' && (
            <button 
              onClick={capturePhoto}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg w-full"
            >
              <Camera size={20} />
              Capture Photo
            </button>
          )}
          
          {(captureState === 'success' || captureState === 'error') && (
            <button 
              onClick={reset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg mt-4"
            >
              Try Again
            </button>
          )}
          
          {/* Simple instructions */}
          {captureState === 'ready' && (
            <p className="text-gray-600 text-sm mt-6 text-center">
              Click the button above to use your camera and mark your attendance.
              Make sure your face is clearly visible.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}