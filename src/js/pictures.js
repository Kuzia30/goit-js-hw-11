import HTTPServise from './API/pixabayApi'

const formEl = document.querySelector('#search-form');
console.log(formEl);
formEl.addEventListener('submit', onSubmitForm);
function onSubmitForm(evt) {
    evt.preventDefault();
  const formData = evt.currentTarget.elements.searchQuery.value;
    console.log(formData);

}

