// Funzione per ottenere i prodotti dalla API
const getContent = async () => {
  try {
    // Questa funzione (doFetch) si trova su 'fetch.js' fa una chiamata fetch ricevendo come parametro il metodo (GET, POST, PUT, DELETE)
    // L'ho creata su un file separato per riutilizzarla in diversi contesti
    const fetched = await doFetch();

    createCards(fetched);
  } catch (error) {
    console.log(error);
  }
};

// Funzione per creare dinamicamente i card da mostrare sul HTML
const createCards = products => {
  const container = document.createElement("div");
  container.classList.add("container", "mt-5");
  document.body.appendChild(container);

  const row = document.createElement("div");
  row.className = "row";
  container.appendChild(row);

  products.forEach(el => {
    const col = document.createElement("div");
    col.classList.add("col-3", "mb-5");
    row.appendChild(col);

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card", "h-100", "shadow-sm");
    col.appendChild(cardWrapper);

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = `${el.imageUrl}`;
    img.alt = `image of ${el.name}`;
    cardWrapper.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column");
    cardWrapper.appendChild(cardBody);

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = `${el.name}`;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement("p");
    cardTitle.className = "card-text";
    cardText.textContent = `${el.description}`;
    cardBody.appendChild(cardText);

    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("d-flex", "justify-content-between", "mt-auto");
    cardBody.appendChild(btnWrapper);

    const link = document.createElement("a");
    link.href = `./details.html?id=${el._id}`;
    link.classList.add("btn", "btn-primary");
    link.textContent = "Scopri di più";
    btnWrapper.appendChild(link);

    const btnEdit = document.createElement("a");
    btnEdit.href = `./back-office.html?id=${el._id}`;
    btnEdit.classList.add("btn", "btn-secondary", "gap-3");
    btnEdit.textContent = "Edit";
    btnWrapper.appendChild(btnEdit);
  });
};

// Al caricamento della pagina viene eseguita la funzione 'getContent'
window.onload = () => {
  getContent();
  document.getElementById("spinner").remove();
};
