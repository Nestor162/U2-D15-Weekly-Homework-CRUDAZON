// al invio del form viene scatenata la seguente funzione
const handleSubmit = event => {
  event.preventDefault();

  // creo un oggetto da inviare come payload (body)
  const newProduct = {
    name: document.getElementById("productName").value,
    description: document.getElementById("productDesc").value,
    brand: document.getElementById("productBrand").value,
    imageUrl: document.getElementById("productPic").value,
    price: document.getElementById("productPrice").value
  };
  console.log(newProduct);

  doFetch("POST", newProduct);

  // Mostra messagio creazione prodotto, dopo due secondi scompare.
  // Non viene fatto il redirect al index perche si prevede anche l'inserimento di vari prodotti di fila
  showAlert(`Inserimento del prodotto ${newProduct.name} avvenuto con successo`, "alert-success");
  const alertTimeout = setInterval(() => {
    document.querySelector(".alert").remove();
  }, 2000);

  event.target.reset();
};

document.addEventListener("DOMContentLoaded", () => {
  // Seleziono il form dal DOM e aggiungo un evenlistener
  const form = document.getElementById("productsForm");
  form.addEventListener("submit", handleSubmit);
  const btnReset = document.querySelector("#reset");
  btnReset.addEventListener("click", () => {
    form.reset();
  });

  //Rricavo il parametro della URL corrispondente al ID prodotto
  const productId = new URLSearchParams(window.location.search).get("id");

  // Se esiste, vuol dire che sono in modalita modifica
  if (productId) {
    // Esegue questa funzione
    getProductToEdit(productId);

    document.querySelector("button[type=submit]").className = "d-none";
    btnReset.className = "d-none";
  } else {
    console.log("nope");
  }
});

// La seguente funzione fa una fetch per ottenere le info del prodotto il cui ID si trova sul URL
// Quindi mostra le informazioni del prodotto da modificare sui campi del form
const getProductToEdit = async id => {
  try {
    const response = await doFetch("GET", undefined, `https://striveschool-api.herokuapp.com/api/product/${id}`);

    document.getElementById("productName").value = response.name;
    document.getElementById("productDesc").value = response.description;
    document.getElementById("productBrand").value = response.brand;
    document.getElementById("productPic").value = response.imageUrl;
    document.getElementById("productPrice").value = response.price;

    // Vengono attivati i bottoni di modifica ed eliminazione
    const btnEdit = document.getElementById("edit");
    btnEdit.className = "btn btn-success";
    const btnDelete = document.getElementById("delete");
    btnDelete.className = "btn btn-danger";
    btnEdit.addEventListener("click", editProduct);
    btnDelete.addEventListener("click", deleteProduct);
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async id => {
  try {
    // ricavo le nuove info aggiornate
    const productUpdated = {
      name: document.getElementById("productName").value,
      description: document.getElementById("productDesc").value,
      brand: document.getElementById("productBrand").value,
      imageUrl: document.getElementById("productPic").value,
      price: document.getElementById("productPrice").value
    };

    // Chiedo conferma prima di modificare
    const confirmation = window.confirm("Sei sicuro di voler MODIFICARE questo prodotto?");
    if (confirmation) {
      const id = new URLSearchParams(window.location.search).get("id");

      // Faccio una fetch di tipo PUT passando al body le nuove info
      const response = await doFetch("PUT", productUpdated, `https://striveschool-api.herokuapp.com/api/product/${id}`);

      // Mostra il messaggio e dopo due secondi reindirizza al index
      showAlert("Prodotto modificato con successo", "alert-warning");
      const alertTimeout = setTimeout(() => {
        window.location.assign("./index.html");
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async () => {
  try {
    const id = new URLSearchParams(window.location.search).get("id");

    // Chiedo conferma prima di eliminare
    // showModal("Sei sicuro di voler ELIMINARE questo prodotto?");
    const confirmation = window.confirm("Sei sicuro di voler ELIMINARE questo prodotto?");

    if (confirmation) {
      const response = await doFetch("DELETE", undefined, `https://striveschool-api.herokuapp.com/api/product/${id}`);

      // Mostra il messaggio e dopo due secondi reindirizza al index
      showAlert("Prodotto rimosso con successo", "alert-danger");
      const alertTimeout = setTimeout(() => {
        window.location.assign("./index.html");
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
};

/*  Questa funzione mostra un 'alert' de Bootstrap che mostra messaggio personalizzato e si puo scegliere il colore a seconda del tipo */
const showAlert = (message, type) => {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add("alert", `${type}`);
  alertContainer.textContent = message;
  document.body.prepend(alertContainer);
};

// const showModal = message => {
//   const div = document.createElement("div");

//   div.innerHTML = `
//   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>

//   `;
//   document.body.append("div");
//   console.log("aaa");
// };
