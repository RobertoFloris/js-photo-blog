// La chiamata all’endpoint di JSON Placeholder ci restituisce un array di oggetti con le seguenti proprietà:
// albumId, id, title, url, thumbnailUrl.

const endpoint = "https://jsonplaceholder.typicode.com/photos?_limit=6";

const container = document.querySelector(".my-container");
const loader = document.querySelector(".loader-container");
const row = document.getElementById("row");
const overlay = document.querySelector(".overlay");
const photoOverlay = document.querySelector(".photo-overlay");


// Effettua una richiesta GET per ottenere un array di foto
axios.get(endpoint)
  .then(res => {
    loader.classList.add("d-none");
    container.classList.remove("d-none");

    res.data.forEach(photo => printPhoto(photo));

    //Crea l'elemento di tutte le card e mostra nell'overlay l'img della specifica cliccata
    const photoCards = document.querySelectorAll(".photo-card");
    photoCards.forEach((photoCard, i) => {
      photoCard.addEventListener("click", e => {
        e.preventDefault();
        overlay.classList.remove("d-none");
        printPhotoOverlay(res.data[i]); 
      });
    });
  });



// Mostra i dettagli di una foto nell'overlay
function printPhotoOverlay(photo) {
  //Destruttura e assegna a una variabile url il valore della proprietà url dell'oggetto passato come parametro
  const { url } = photo;
  
  photoOverlay.innerHTML = `
    <img src="${url}" alt="Foto">
    <button type="button" class="m-3 btn btn-light">X</button>
  `;

  // Aggiunge l'evento di chiusura al pulsante exit
  const exit = document.querySelector(".btn.btn-light");
  exit.addEventListener("click", e => {
    e.preventDefault();
    overlay.classList.add("d-none");
  });

  // Chiude l'overlay se l'utente clicca fuori dal contenuto
  overlay.addEventListener("click", e => {
    if (e.target === overlay) {
      overlay.classList.add("d-none");
    }
  });

}



// Genera una card HTML per una foto e la aggiunge alla riga principale
function printPhoto(photo) {
  const { title, url } = photo;
  const upper = title[0].toUpperCase() + title.substring(1); // Prima lettera maiuscola
  row.innerHTML += `
    <div class="mt-5 mb-5 col-12 col-md-6 col-lg-4 d-flex justify-content-center">
      <div class="photo-card">
        <img src="./assets/img/pin.svg" alt="pin">
        <div class="photo">
          <img src="${url}" alt="Foto">
        </div>
        <div class="caption d-flex justify-content-center align-items-center">${upper}</div>
      </div>
    </div>
  `;
}
