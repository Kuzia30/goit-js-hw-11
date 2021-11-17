import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24347539-7a784c76778ec6b315780761f';

const perPage = 40;
let page = 1;
let nameKey = '';

export function fetchPictures(name) {
    if (nameKey !== name) {
        nameKey = name;
        page = 1;
    }
    return fetch(`${BASE_URL}?key=${KEY}&per_page=${perPage}&page=${page}&q=${nameKey}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
                throw Error('Whoops')
        })
        .then(({hits, totalHits}) => {
            if (page === 1) {
            Notify.success(`Hooray! We found ${totalHits} images.`);    
            }
            const totalPages = totalHits / perPage
            page += 1;
            const hasNextPage = page <= totalPages;
            if (!hasNextPage) {
                Notify.warning("We're sorry, but you've reached the end of search results.");
            }
            return {
                hits,
                hasNextPage,
                currentPage: (page - 1)
            };
        })
    .catch(() => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
}
