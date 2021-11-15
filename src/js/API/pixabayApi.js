const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24347539-7a784c76778ec6b315780761f';
let page = 1;
let nameKey = '';

export function fetchPictures(name) {
    if (nameKey !== name) {
        nameKey = name;
        page = 1;
    }
   return fetch(`${BASE_URL}?key=${KEY}&per_page=40&page=${page}&q=${nameKey}&image_type=photo&orientation=horizontal&safesearch=true`)
.then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error('Whoops');
})
       .then(response => {
        page += 1
       return response})
}
