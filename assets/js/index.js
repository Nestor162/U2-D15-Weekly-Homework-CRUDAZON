// Funzione per ottenere i prodotti dalla API
const getContent = async () => {
  // Questa funzione che si trova su 'fetch.js' fa una chiamata fetch ricevendo come parametro il metodo (GET, POST, PUT, DELETE)
  // L'ho creata su un file separato per riutilizzarla in diversi contesti
  doFetch();
};

// Al caricamento della pagina viene eseguita la funzione 'getContent'
window.onload = () => {
  getContent();
};
