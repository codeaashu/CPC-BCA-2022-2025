const video = document.getElementById("video");

let noFaceCounter = 0;
const warningTime = 10; // seconds

// Load the face-api models first
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("models"),
  faceapi.nets.faceExpressionNet.loadFromUri("models"),
]).then(() => {
  console.log("Face API models loaded");
});

// ✅ Function to start webcam
function startVideo() {
  return navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      return true;
    })
    .catch((err) => {
      console.error("Error accessing webcam:", err);
      alert("Please allow camera access to proceed.");
      return false;
    });
}

// ✅ Function to start monitoring faces
function startMonitoring() {
  startVideo().then((cameraStarted) => {
    if (cameraStarted) {
      monitorFace();
      openFullScreen();
      showForm();
    } else {
      alert("Waiting for camera access. Please enable the camera to start the test.");
    }
  });
}

// ✅ Function for face detection and monitoring
function monitorFace() {
  video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(
        detections,
        displaySize
      );

    //   const ctx = canvas.getContext("2d");
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw detections
    //   faceapi.draw.drawDetections(canvas, resizedDetections);
    //   faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    //   faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    // Number of persons detected
    //   ctx.font = "30px Arial";
    //   ctx.fillStyle = "red";
    //   ctx.fillText(`Persons: ${detections.length}`, 10, 40);

      // No face detection handling
      if (detections.length === 0) {
        noFaceCounter++;
        console.log(`No face detected for ${noFaceCounter} seconds`);

        if (noFaceCounter === warningTime) {
          // ✅ Show modal instead of alert
          document.querySelector('#modalContent p:first-child').innerText =
            'No Person Detected in front.';
          document.querySelector('#modalContent p:nth-child(2)').innerText =
            'Click "Submit Test" to submit the test, or "Go Back to Full-Screen" to continue.';
          document.getElementById('exitModal').style.display = 'flex';
        }
      } else {
        noFaceCounter = 0; // Reset counter if face is detected
      }

      // Multiple person detection handling
      if (detections.length > 1) {
        alert(
          "Multiple persons detected! Your test is being submitted for security reasons."
        );
        document.getElementById("myForm").submit();
      }
    }, 1000);
  });
}
