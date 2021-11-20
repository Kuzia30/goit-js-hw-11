import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24347539-7a784c76778ec6b315780761f';

const perPage = 40;
let page = 1;
let nameKey = '';

export async function fetchPictures(name) {
  try {
    if (nameKey !== name) {
      nameKey = name;
      page = 1;
    }
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&per_page=${perPage}&page=${page}&q=${nameKey}&image_type=photo&orientation=horizontal&safesearch=true`,
    );
    const data = await response.data;
    const picturesObj = await notifyForEvent(data);
    return picturesObj;
  } catch (error) {
    console.log(error);
  }
}

function notifyForEvent(data) {
  if (data.hits.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  if (page === 1 && data.hits.length !== 0) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
    const totalPages = data.totalHits / perPage;
    const hasNextPage = page <= totalPages;
    page += 1;
  if (!hasNextPage && data.hits.length !== 0) {
    Notify.warning("We're sorry, but you've reached the end of search results.");
  }
  return {
    ['hits']: data.hits,
    hasNextPage,
  };
}
