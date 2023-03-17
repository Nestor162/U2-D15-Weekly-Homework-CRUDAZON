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

  // Creo dinamicamente gli elementi del DOM
  const row = document.createElement("div");
  row.className = "row";
  container.append(row);

  const col = document.createElement("div");
  col.className = "col-7";
  row.append(col);

  const col2 = document.createElement("div");
  col2.className = "col-5";
  row.append(col2);

  const img = document.createElement("img");
  img.src = `${product.imageUrl}`;
  img.classList.add("w-100", "rounded", "shadow");
  col.append(img);

  const name = document.createElement("h2");
  name.className = "mt-3";
  name.textContent = `Name: ${product.name}`;
  col2.append(name);

  const description = document.createElement("p");
  description.textContent = `Description: ${product.description}`;
  col2.append(description);

  const brand = document.createElement("p");
  brand.textContent = `Brand: ${product.brand}`;
  col2.append(brand);

  const price = document.createElement("h4");
  price.classList.add("badge", "bg-info", "fs-5");
  price.textContent = `${product.price} €`;
  col2.append(price);
};
