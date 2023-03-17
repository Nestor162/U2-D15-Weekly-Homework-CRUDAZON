const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MjA5NWY4MWI0MjAwMTM5YjI3YzIiLCJpYXQiOjE2NzkwNDA2NjIsImV4cCI6MTY4MDI1MDI2Mn0.5y8d8JwcZ5cbBO-aAdINDcyBNxKpQ-K-1Y0crjekibM";

const options = {
  headers: {
    Authorization: API_KEY
  }
};

const getContent = async () => {
  try {
    const response = await fetch(API_URL, options);
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
};

window.onload = () => {
  getContent();
};
