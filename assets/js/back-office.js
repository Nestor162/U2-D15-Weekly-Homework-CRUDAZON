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
  } catch (error) {
    console.log(error);
  }
};

// const editProduct = async id => {
//   try {
//     const response = await doFetch("PUT", productUpdated, `https://striveschool-api.herokuapp.com/api/product/${id}`);
//     console.log(response + "edit");
//   } catch (error) {
//     console.log(error);
//   }
// };
