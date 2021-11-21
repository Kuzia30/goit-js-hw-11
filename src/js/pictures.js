import { fetchPictures } from './API/pixabayApi';
import { LoadMoreBtn } from './button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const galleryWrap = document.querySelector('.gallery');
let formData = '';
const perPage = 40;
let page = 1;



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
      loadMoreBtn.hide();
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

async function loadPictures(formData) {
  const dataFromApi = await fetchPictures(formData, page, perPage);
  const eventHendler = await notifyForEvent(dataFromApi);
   renderPictures(eventHendler.hits);
    if (!eventHendler.hasNextPage) {
      loadMoreBtn.hide();
    }
}

galleryWrap.addEventListener('click', onPreventDefault);

function onPreventDefault(event) {
  event.preventDefault();
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