const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Prompt to select media stream, pass to video element, then play. Async function
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia(); // this waits until the user selects what screen is to be shared
    videoElement.srcObject = mediaStream; // passing mediaStream into videoElement as its srcObject
    videoElement.onloadedmetadata = () => {
      videoElement.play(); // when metadata is loaded, the video will be played
    };
  } catch (error) {
    // Catch Error Here
    console.log("oppsie, error happened", error);
  }
}

// Event listener for the button
button.addEventListener("click", async () => {
  // Disable Button
  button.disabled = true;
  // Start Picture in Picture, more on this at: https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/
  await videoElement.requestPictureInPicture(); // does the picture in picture magic
  // Reset Button
  button.disabled = false;
});

// On Load
selectMediaStream();
