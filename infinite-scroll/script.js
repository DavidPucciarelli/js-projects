const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false; // starts as false to be true later when it is ready to load
let imagesLoaded = 0; // starts on zero, then goes to 30
let totalImages = 0; // to know when it is done loading everything
let photosArray = [];
let isInitialLoad = true;

// Unsplash API - taken from https://unsplash.com/documentation#location
let initialCount = 5;
const apiKey = "ADD_OWN_UNSPLASH_API_KEY"; // from account Keys, note that you have to insert your own account key to get this working
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Updating the API URL with the new count
function updateAPIURLWithNewCount(pictureCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${pictureCount}`;
}

// check if all images were loaded
function imageLoaded() {
  // this is called for every photo
  imagesLoaded++;
  //   console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true; // loading icon will hide after the initial loading
    // console.log("ready =", ready);
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0; // must be 0 each time it load otherwise the imageLoaded condition wont work
  totalImages = photosArray.length;
  //   console.log("total images", totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // each object will be assigned to the variable "photo" as forEach method runs through the object
    // Create <a> to link to Unsplash
    const item = document.createElement("a"); // Creates a blank <a> element
    // item.setAttribute("href", photo.links.html); // .setAttribute populates the item with "href", that is set to photo.links.html
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular); // try full instead of regular
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img); // Puts image into the item ==> <a>
    imageContainer.appendChild(item); // Puts item into the imageContainer div
  });
}

// Get photos from Unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    // console.log(photosArray); // this shows in network (ctrl+r) what is loaded. From there I can take info
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false; // if wont go ever again unless reloaded
    }
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready // ready must be true to load again
  ) {
    // Testing what is happening
    // console.log("window.innerHeight:", window.innerHeight);
    // console.log("window.scrollY", window.scrollY);
    // console.log(
    //   "window.innerHeight + scrollY",
    //   window.innerHeight + window.scrollY
    // );
    // console.log(
    //   "document.body.offsetHeight - 1000:",
    //   document.body.offsetHeight - 1000
    // );
    ready = false; // so it will be ready again if imagesLoaded === totalImages
    getPhotos();
  }
}); // window is a parent of the document and grandparent of the body

// On Load
getPhotos();
