import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '35648673-0e16e427271b01d9e7b771895';

export const getImages = async (query, page) => {
  const OPTIONS = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });
  try {
    const response = await axios.get(`?${OPTIONS.toString()}`);
    return response.data;
  } catch (error) {
    console.error(error.toJSON());
  }
};

export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
