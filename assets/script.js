// La chiamata all’endpoint di JSON Placeholder ci restituisce un array di oggetti con le seguenti proprietà:
// albumId, id, title, url, thumbnailUrl.
const endpoint="https://jsonplaceholder.typicode.com/photos?_limit=6";
const container = document.querySelector(".my-container");
const loader = document.querySelector(".loader-container");
const row = document.getElementById("row");
const overlay = document.querySelector(".overlay");
const photoOverlay = document.querySelector(".photo-overlay")


axios.get(endpoint)
.then(res => {
  loader.classList.add("d-none");
  container.classList.remove("d-none");
  res.data.forEach(photo => printPhoto(photo));

  const photoCards = document.querySelectorAll(".photo-card");

  photoCards.forEach((photoCard, i) => {
    photoCard.addEventListener("click", e => {
    e.preventDefault();
    overlay.classList.remove("d-none");
    printPhotoOverlay(res.data[i]);
    });
  });
})

function printPhotoOverlay(photo){
  const {url} = photo;
  photoOverlay.innerHTML = 
  `
  <img src="${url}" alt="Foto">
  <button type="button" class="m-3 btn btn-light">X</button>
  `

  const exit = document.querySelector(".btn.btn-light");
  exit.addEventListener("click", e =>{
    e.preventDefault();
    overlay.classList.add("d-none")
  })

}

overlay.addEventListener("click", e => {
  if (e.target === overlay) {
    overlay.classList.add("d-none");
  }
});

function printPhoto(photo){
  const {title, url} = photo;
  const upper = title[0].toUpperCase() + title.substring(1);
  row.innerHTML += 
  `
  <div class="mt-5 mb-5 col-12 col-md-6 col-lg-4 d-flex justify-content-center">
    <div class="photo-card">
      <img src="./assets/img/pin.svg" alt="pin">
      <div class="photo">
        <img src="${url}" alt="Foto">
      </div>
      <div class="caption d-flex justify-content-center align-items-center">${upper}</div>
    </div>
  </div>
  
  `
}