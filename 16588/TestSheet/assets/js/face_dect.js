
<script>

  const video = document.getElementById("video");
  
  let noFaceCounter = 0;
  const warningTime = 10; // Time in seconds
  
  
  const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';

console.log("Loading models...");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
])
.then(() => {
  console.log("Models loaded successfully.");
  startVideo();
})
.catch(err => {
  console.error("Error loading models:", err);
  alert("Face API models failed to load. Check internet connection or model URL.");
});

  function startVideo() {
    console.log("Requesting camera access...");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Camera access granted.");
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        alert("Camera access denied. Please allow camera permissions to proceed.");
      });
  }
  
  video.addEventListener("play", () => {
    console.log("Video started playing. Setting up canvas...");
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
  
  
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
  
    setInterval(async () => {
      console.log("Running face detection...");
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      
      console.log(`Detections count: ${detections.length}`);
  
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw detections
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  
      // 👇 Show number of persons detected
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.fillText(`Persons: ${detections.length}`, 10, 40);
  
      // 🚩 No face detection logic
      if (detections.length === 0) {
        noFaceCounter++;
        console.log(`No face detected for ${noFaceCounter} seconds`);
  
        if (noFaceCounter === warningTime) {
          alert(
            "Your face is not detected. Please come in front of the camera or your exam may be cancelled."
          );
          // Optional: Take any action like submitting exam or cancelling
          // window.location.href = "exam_cancelled.html";
        }
      } else {
        noFaceCounter = 0; // Reset counter if face is detected
      }
  
      // 🚩 Multiple person detection logic
      if (detections.length > 1) {
        alert(
          "Multiple persons detected! Your test is being submitted for security reasons."
        );
        // ✅ Action: Submit test or redirect
        //window.location.href = "submit_test.php"; // Replace with your submission file
      }
    }, 1000); // Check every 1 second
  });
  </script>