import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';
// console.log(debounce);
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const searchQuery = refs.input.value.trim();
  if (!searchQuery) {
    refs.list.innerHTML = '';
    refs.div.innerHTML = '';
    return;
  }
  fetchCountries(searchQuery).then(data => {
    createMarkup(data);
  });
}

function createMarkup(arr) {
  if (arr.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (arr.length <= 10 && arr.length >= 2) {
    const markup = arr
      .map(
        item => `<li>
        <img src="${item.flags.svg}" alt="" width="50">
        <h2>${item.name.common}</h2>
      </li>`
      )
      .join('');
    refs.list.innerHTML = markup;
    refs.div.innerHTML = '';
    return;
  } else if (arr.length === 1) {
    const markup = arr
      .map(
        item => `<li>
        <img src="${item.flags.svg}" alt="" width="50">
        <h2>${item.name.common}</h2>
        <p>Capital: ${item.capital}</p>
      <p>Population: ${item.population}</p>
      <p>Languages: ${Object.values(item.languages)}</p>
      </li>`
      )
      .join('');
    refs.div.innerHTML = markup;
    refs.list.innerHTML = '';
    return;
  }
}
