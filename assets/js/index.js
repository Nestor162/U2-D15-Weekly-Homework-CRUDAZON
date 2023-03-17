// Funzione per ottenere i prodotti dalla API
const getContent = async () => {
  try {
    // Questa funzione (doFetch) si trova su 'fetch.js' fa una chiamata fetch ricevendo come parametro il metodo (GET, POST, PUT, DELETE)
    // L'ho creata su un file separato per riutilizzarla in diversi contesti
    const fetched = await doFetch();
    console.log(fetched);

    createCards(fetched);
  } catch (error) {
    console.log(error);
  }
};

// Funzione per creare dinamicamente i card da mostrare sul HTML
const createCards = products => {
  const container = document.createElement("div");
  container.className = "container mt-5";
  document.body.appendChild(container);

  const row = document.createElement("div");
  row.className = "row";
  container.appendChild(row);

  products.forEach(el => {
    const col = document.createElement("div");
    col.className = "col";
    row.appendChild(col);

    const cardWrapper = document.createElement("div");
    cardWrapper.className = "card";
    col.appendChild(cardWrapper);

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = `${el.imageUrl}`;
    img.alt = `image of ${el.name}`;
    cardWrapper.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardWrapper.appendChild(cardBody);

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = `${el.name}`;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement("p");
    cardTitle.className = "card-text";
    cardText.textContent = `${el.description}`;
    cardBody.appendChild(cardText);

    const link = document.createElement("a");
    link.href = `./details.html?id=${el._id}`;
    link.className = "btn, btn-primary";
    link.textContent = "Scopri di più";
    cardBody.appendChild(link);
  });
};

// Al caricamento della pagina viene eseguita la funzione 'getContent'
window.onload = () => {
  getContent();
};
