const imageConrainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosarray = [];

const coust = 30;
const apiKey = 'gjcx_G4Kc5TGaPUlXpap-5NVxYru9bMzDDe4EkKlzUY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${coust}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

    }

}


//create elements for link & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosarray.length;

    photosarray.forEach((photo) => {
        //create <a>
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //create <img>
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        //event Listener check when each is finished loading
        img.addEventListener('load', imageLoaded)
        //put <img> inside <a> and <a> inside imageConrainer
        item.appendChild(img);
        imageConrainer.appendChild(item);
    });
}

//get Photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosarray = await response.json();
        displayPhotos();
    }
    catch {
        //catch
    }

}
// check to see if scrolling near bottom
window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }

});

//on Load
getPhotos();