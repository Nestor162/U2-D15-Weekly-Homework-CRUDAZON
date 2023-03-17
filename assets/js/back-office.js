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
});
