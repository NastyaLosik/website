async function fetchImage() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    return data[0].url;
  } catch (error) {
    throw new Error('Ошибка при получении данных:' + error);
  }
}