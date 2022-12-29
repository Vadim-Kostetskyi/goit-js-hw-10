import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
import { debounce } from 'lodash';
import countryListItem from './teamplates/contry_list.hbs';
import country from './teamplates/country.hbs';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry(el) {
  const countryName = el.target.value.trim();

  if (countryName.length !== 0) {
    fetchCountries(countryName)
      .then(data => {
        if (data.length >= 10) {
          clear(countryList);
          clear(countryInfo);

          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length <= 10 && data.length >= 2) {
          countryList.innerHTML = countryListItem(data);
          if (countryInfo.childNodes) {
            clear(countryInfo);
          }
        } else {
          if (countryList.childNodes) {
            clear(countryList);
          }
          countryInfo.innerHTML = country(data);
          console.log(country(data));
        }
      })
      .catch(error => {
        clear(countryList);
        clear(countryInfo);
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  } else {
    clear(countryList);
    clear(countryInfo);
  }
}

function clear(el) {
  // while (el.firstChild) {
  //   el.removeChild(el.firstChild);
  // }

  // [...el.children].map(i => i.remove());

  el.innerHTML = '';
}
