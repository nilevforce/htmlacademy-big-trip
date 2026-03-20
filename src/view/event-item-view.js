import AbstractView from '../framework/view/abstract-view';
import { formatDate, formatDuration } from '../helpers';
import { DATE_FORMATS } from '../constants';

const createOffersTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }

  return offers.map(({ title, price }) => `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      +€&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `).join('');
};

const createItemTemplate = (event) => {
  const {
    type,
    dateFrom,
    dateTo,
    basePrice,
    isFavorite,
    offers
  } = event;

  const {
    name: destinationName
  } = event.destination;

  const dateFromShortDate = formatDate(dateFrom, DATE_FORMATS.SHORT_DATE);
  const dateFromIsoDate = formatDate(dateFrom, DATE_FORMATS.ISO_DATE);
  const dateFromTime = formatDate(dateFrom, DATE_FORMATS.TIME);
  const dateToTime = formatDate(dateTo, DATE_FORMATS.TIME);
  const duration = formatDuration(dateFrom, dateTo);

  const favoriteButtonClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  const favoriteButtonTitle = isFavorite
    ? 'Remove from favorite'
    : 'Add to favorite';

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFromIsoDate}">${dateFromShortDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${dateFromTime}</time>
            —
            <time class="event__end-time" datetime="${dateTo}">${dateToTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(offers)}
        </ul>
        <button class="${favoriteButtonClassName}" type="button">
          <span class="visually-hidden">${favoriteButtonTitle}</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
};

class EventItemView extends AbstractView {
  #event = null;
  #handleEditClick = null;

  constructor({ event, onEditClick }) {
    super();
    this.#event = event;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createItemTemplate(this.#event);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}

export default EventItemView;
