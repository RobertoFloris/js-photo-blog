// La chiamata all’endpoint di JSON Placeholder ci restituisce un array di oggetti con le seguenti proprietà:
// albumId, id, title, url, thumbnailUrl.
const endpoint="https://jsonplaceholder.typicode.com/photos?_limit=6";
const col = document.getElementById("col");
const overlay = document.querySelector(".overlay");
const exit = document.querySelector(".btn.btn-light");

axios.get(endpoint)
.then(res => {
   console.log(res.data);
   res.data.forEach(photo => printPhoto(photo))
})

col.addEventListener("click", e => {
  e.preventDefault();
  
  // Il listener viene aggiunto all'elemento genitore col perché le photo-card vengono create in modo asincrono con il ciclo forEach, quindi non esisterebbero nel DOM al momento del caricamento della pagina e non sarebbe possibile aggiungere un event listener direttamente a ciascuna di esse. L'event listener su col cattura i clic effettuati su qualsiasi elemento figlio, e con e.target.closest(".photo-card") controlla se l'elemento cliccato o uno dei suoi antenati ha la classe photo-card. Se sì, significa che le card sono state già create, e la classe d-none viene rimossa dall'overlay, rendendolo visibile. 

  // e -> event
  // e.target -> Oggetto Element
  // closest -> Metodo che appartiene agli oggetti Element
  if (e.target.closest(".photo-card")) { 
    overlay.classList.remove("d-none");
  }
});

exit.addEventListener("click", e =>{
  e.preventDefault();
  overlay.classList.add("d-none")
})

function printPhoto(photo){
  const {title, url} = photo;
  col.innerHTML += 
  `
  <div class="mt-5 mb-5 col-12 col-md-6 col-lg-4 d-flex justify-content-center">
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