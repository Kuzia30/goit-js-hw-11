import { fetchPictures } from './API/pixabayApi'

const formEl = document.querySelector('#search-form');
const galleryWrap = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more')
let formData = ""

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
    evt.preventDefault();
    if (formData !== evt.currentTarget.elements.searchQuery.value) {
        formData = evt.currentTarget.elements.searchQuery.value;
        galleryWrap.innerHTML = "";
        loadPictures(formData);
    } 
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
    
    galleryWrap.insertAdjacentHTML('beforeend', murkup);
}
 
loadMore.addEventListener('click', () => loadPictures(formData));

function loadPictures(formData) {
    fetchPictures(formData).then(data => renderPictures(data.hits));
}

