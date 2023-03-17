window.onload = () => {
  getDetails();
};

// funzione che ricava dal URL l'id del prodotto e fa la fetch per ottenere le sue informazioni
const getDetails = async () => {
  try {
    const productId = new URLSearchParams(window.location.search).get("id");
    const response = await doFetch("GET", undefined, `https://striveschool-api.herokuapp.com/api/product/${productId}`);

    // mostra i risultati sulla pagina
    showDetails(response);
  } catch (error) {
    console.log(error);
  }
};

const showDetails = product => {
  // seleziono il contenitore e rimuovo lo spinner
  const container = document.getElementById("productInfo");
  container.textContent = "";

  const img = document.createElement("img");
  img.src = `${product.imageUrl}`;
  img.width = 300;
  container.append(img);

  const name = document.createElement("h2");
  name.textContent = `Name: ${product.name}`;
  container.append(name);

  const description = document.createElement("p");
  description.textContent = `Description: ${product.description}`;
  container.append(description);

  const brand = document.createElement("p");
  brand.textContent = `Brand: ${product.brand}`;
  container.append(brand);

  const price = document.createElement("h4");
  price.textContent = `${product.price} €`;
  container.append(price);
};
