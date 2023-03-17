// Parametri per la fetch (endpoint, autorizzazione, etc)
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MjA5NWY4MWI0MjAwMTM5YjI3YzIiLCJpYXQiOjE2NzkwNDA2NjIsImV4cCI6MTY4MDI1MDI2Mn0.5y8d8JwcZ5cbBO-aAdINDcyBNxKpQ-K-1Y0crjekibM";

// Questa funzione puo essere riutilizzata per fare diverse fetch scegliendo il metodo.
// Il metodo default e GET
const doFetch = async (selectedMethod = "GET", body, url = API_URL) => {
  try {
    const response = await fetch(url, {
      method: selectedMethod,
      body: JSON.stringify(body),
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json"
      }
    });

    // Gestione dei principali errori
    if (response.status === 400)
      throw new Error(
        `La tua richiesta non è stata elaborata dal server perché contiene errori di sintassi o di formato. Controlla la tua richiesta e riprova. 🫤 (codice: ${response.status})`
      );
    if (response.status === 401)
      throw new Error(
        `La tua richiesta richiede credenziali di autenticazione valide per accedere alla risorsa. Inserisci le tue credenziali e riprova. 🫢 (Codice ${response.status})`
      );
    if (response.status === 403)
      throw new Error(
        `Non hai il permesso di accedere a questa risorsa. Contatta l’amministratore del sito per maggiori informazioni. 😢 (Codice: ${response.status})`
      );
    if (response.status === 404)
      throw new Error(
        `La risorsa che stai cercando non esiste o è stata rimossa. Controlla l’URL e riprova. 😖 (codice: ${response.status})`
      );

    if (response.status === 404)
      throw new Error(
        `La risorsa che stai cercando non esiste o è stata rimossa. Controlla l’URL e riprova. 😖 (codice: ${response.status})`
      );

    if (response.status === 500)
      throw new Error(
        `Si è verificato un problema con il sito web e non può essere visualizzato. Riprova più tardi. 💀 (codice: ${response.status})`
      );

    if (!response.ok) throw new Error("Si è verificato un problema con la fetch");

    const data = await response.json();
    // Qui faccio il return dei dati ottenuti per utilizzarli altrove
    return data;
    // console.log(data);
  } catch (error) {
    console.error("⚠️ " + error);
  }
};
