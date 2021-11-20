import { fetchPictures } from './API/pixabayApi';
import { LoadMoreBtn } from './button';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const galleryWrap = document.querySelector('.gallery');
let formData = '';

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  className: 'is-hidden',
  isHidden: true,
  onClick() {
    loadMoreBtn.hide();
    loadPictures(formData);
  },
});

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();
  if (formData !== evt.currentTarget.elements.searchQuery.value) {
    formData = evt.currentTarget.elements.searchQuery.value;
    galleryWrap.innerHTML = '';
    const dataTrim = formData.trim(' ');
    if (dataTrim !== '') {
       loadPictures(dataTrim);
    }
  }
}

function renderPictures(pictures) {
  const murkup = pictures
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class=" photo-card" href="${largeImageURL}">
        <div class="gallery__item">
          <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
          </div>
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
</a>`,
    )
    .join('');

  galleryWrap.insertAdjacentHTML('beforeend', murkup);
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.on('show.simplelightbox', () => {
    lightbox.options.captionDelay = '250';
  });
  lightbox.refresh();
  loadMoreBtn.show();
}

function loadPictures(formData) {
  fetchPictures(formData).then(pictures => {
    renderPictures(pictures.hits);
    if (!pictures.hasNextPage) {
      loadMoreBtn.hide();
    }
  });
}

galleryWrap.addEventListener('click', onPreventDefault);
function onPreventDefault(event) {
  event.preventDefault();
}
