// La chiamata all’endpoint di JSON Placeholder ci restituisce un array di oggetti con le seguenti proprietà:
// albumId, id, title, url, thumbnailUrl.
const endpoint="https://jsonplaceholder.typicode.com/photos?_limit=6";
const photoCard = document.getElementById("card")

axios.get(endpoint)
.then(res => {
   console.log(res.data);
   res.data.forEach(photo => printPhoto(photo))
})

function printPhoto(photo){
  const {title, url} = photo;
  photoCard.innerHTML += 
  `
  <div class="mt-5 col-12 col-md-6 col-lg-4 d-flex justify-content-center">
    <div class="photo-card">
      <img src="./assets/img/pin.svg" alt="pin">
      <div class="photo">
        <img src="${url}" alt="Foto">
      </div>
      <div class="caption d-flex justify-content-center align-items-center">${title}</div>
    </div>
  </div>
  
  `
}