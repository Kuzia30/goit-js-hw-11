import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24347539-7a784c76778ec6b315780761f';
let nameKey = '';

export async function fetchPictures(name, page, perPage) {
  try {
    if (nameKey !== name) {
      nameKey = name;
      page = 1;
    }
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&per_page=${perPage}&page=${page}&q=${nameKey}&image_type=photo&orientation=horizontal&safesearch=true`);
    return response.data;;
  } catch (error) {
     Notify.failure('Sorry, ERROR!!!');
  }
}


