const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        {video: {} },
        stream => video.srcObject = stream,
        err => console.err(err)
    )
    
}


video.addEventListener('play', () => {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        console.log(detections)
    }, 100);
})