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

  event.target.reset();
};

document.addEventListener("DOMContentLoaded", () => {
  // Seleziono il form dal DOM e aggiungo un evenlistener
  const form = document.getElementById("productsForm");
  form.addEventListener("submit", handleSubmit);

  //Rricavo il parametro della URL corrispondente al ID prodotto
  const productId = new URLSearchParams(window.location.search).get("id");

  // Se esiste, vuol dire che sono in modalita modifica
  if (productId) {
    // Esegue questa funzione
    getProductToEdit(productId);

    document.querySelector("button[type=submit]").className = "d-none";
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

    const id = new URLSearchParams(window.location.search).get("id");
    // Faccio una fetch di tipo PUT passando al body le nuove info
    const response = await doFetch("PUT", productUpdated, `https://striveschool-api.herokuapp.com/api/product/${id}`);
    alert("modificato!");
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async () => {
  try {
    const id = new URLSearchParams(window.location.search).get("id");

    // Chiedere conferma prima di eliminare
    const confirmation = window.confirm("Sei sicuro di voler eliminare questo prodotto?");

    if (confirmation) {
      const response = await doFetch("DELETE", undefined, `https://striveschool-api.herokuapp.com/api/product/${id}`);
      alert("Prodotto rimosso con successo");
      window.location.assign("./index.html");
    }
  } catch (error) {
    console.log(error);
  }
};
