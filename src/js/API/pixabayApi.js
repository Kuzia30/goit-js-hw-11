const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24347539-7a784c76778ec6b315780761f';

fetch(`${BASE_URL}?key=${KEY}&per_page=6&q=cat&image_type=photo&orientation=horizontal&safesearch=true`)
// .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw Error('Whoops');
//     })

// https://pixabay.com/api/?key=24347539-7a784c76778ec6b315780761f&q=yellow+flowers&image_type=photo