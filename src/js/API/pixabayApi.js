const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24347539-7a784c76778ec6b315780761f';


export function fetchPictures(name) {
   return fetch(`${BASE_URL}?key=${KEY}&per_page=40&page=1&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
.then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error('Whoops');
    })
}
