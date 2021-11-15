import { fetchPictures } from './API/pixabayApi'

const formEl = document.querySelector('#search-form');
const galleryWrap = document.querySelector('.gallery');


formEl.addEventListener('submit', onSubmitForm);
function onSubmitForm(evt) {
    evt.preventDefault();
    const formData = evt.currentTarget.elements.searchQuery.value;
    fetchPictures(formData).then(data => renderPictures(data.hits));
}

function renderPictures(pictures) {
    const murkup = pictures.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
</a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`)
        .join('');
    
    galleryWrap.innerHTML = murkup;
}
 

