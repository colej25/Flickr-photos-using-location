// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.

let photosArray = [];
let currentPicIndex = 0;

function locationSuccess(pos) {
  getPictures(pos.coords);
}

function locationFail() {
  getPictures(fallbackLocation);
}

const fallbackLocation = {
  latitude: 27.51716640181345,
  longitude: -82.72740291905009,
}; // Anna Maria

function buildImageUrl(photoObj) {
  return (
    `https://farm${photoObj.farm}.staticflickr.com/` +
    `${photoObj.server}/` +
    `${photoObj.id}_${photoObj.secret}.jpg`
  );
}

function showPictures(data) {
  photosArray = data.photos.photo;

  let img = document.createElement("img");
  img.src = buildImageUrl(photosArray[currentPicIndex]);
  photoContainer.append(img);

  let nextPhoto = document.getElementById("btn");
  nextPhoto.onclick = function () {
    currentPicIndex += 1;

    if (currentPicIndex >= 5) {
      currentPicIndex = 0;
    }

    showPictures(data);
  };
}

function processResponse(response) {
  let responseData = response.json();
  responseData.then(showPictures);
}

function getPictures(location) {
  let url =
    "https://shrouded-mountain-15003.herokuapp.com/https://www.flickr.com/services/rest/?api_key=dad0db4f58bec752144601d8334ef602&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=" +
    location.latitude +
    "&lon=" +
    location.longitude +
    "&text=bbq";

  let fetchPromise = fetch(url);
  fetchPromise.then(processResponse);
}

navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);
