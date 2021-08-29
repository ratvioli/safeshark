const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        {video: {} },
        stream => video.srcObject = stream,
        err => console.err(err)
    )
    
}


video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    }, 100);
})




//var alertsound = new Audio('alertjingle.mp3');
//var playSound = async function() {
//    
//        if (faceapi.scoreThreshold < 0.5 ) {
//            alertsound.play();
//            console.log("Alert Sound Played")
//            break;
//        }  
//}

//var alertplay = function() {
//    if (faceapi.scoreThreshold < 0.5) {
//        playAudio("alertjingle.mp3");
//}

// const interval = setInterval(function() {
//     if (faceapi.scoreThreshold < 0.5 ) {
//         alertsound.play();
//         console.log("Alert Sound Played")
//         break;
//     }
// }, 1000);
 
//clearInterval(interval); 

//playSound();