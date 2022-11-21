import { Notify } from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(name) {
  if (!name) {
    return;
  }
  return fetch(
    `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    })
    .catch(err => Notify.failure('Oops, there is no country with that name'));
}

export { fetchCountries };
