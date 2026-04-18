import AbstractView from '../framework/view/abstract-view';
import { DateFormats, TripEventTypes } from '../constants';
import { capitalizeFirstLetter, toSlug } from '../helpers/common';
import { formatDate } from '../helpers/times';

const createEventTypeItemTemplate = (type, currentType) => {
  const checkedAttr = type === currentType ? 'checked' : '';

  return `
    <div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${checkedAttr}
      />

      <label
        class="event__type-label  event__type-label--${type}"
        for="event-type-${type}-1">
        ${capitalizeFirstLetter(type)}
      </label>
    </div>
  `;
};

const createDestinationsList = (destinations) => {
  if (!destinations.length) {
    return '';
  }

  return destinations
    .map((dest) => `<option value="${dest.name}"></option>`)
    .join('');
};

const createOffersSectionTemplate = (offers, selectedOfferIds = []) => {
  if (!offers.length) {
    return '';
  }

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => `
          <div class="event__offer-selector">
            <input
              class="event__offer-checkbox visually-hidden"
              id="event-offer-${toSlug(offer.title)}-1"
              type="checkbox"
              name="event-offer"
              ${selectedOfferIds.includes(offer.id) ? 'checked' : ''}
            >
            <label class="event__offer-label" for="event-offer-${toSlug(offer.title)}-1">
              <span class="event__offer-title">${offer.title}</span>
              +€&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `).join('')}
      </div>
    </section>
  `;
};

const createDestinationPicturesListTemplate = (pictures) => {
  if (!pictures.length) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
      </div>
    </div>
  `;
};

const createDestinationSectionTemplate = (destination) => {
  if (!destination) {
    return '';
  }

  return `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">${destination.name}</h3>
      <p class="event__destination-description">${destination.description ?? ''}</p>
      ${createDestinationPicturesListTemplate(destination.pictures ?? '')}
    </section>
  `;
};

const createEditFormTemplate = ({ event, offers, destinations }) => {
  const selectedOfferIds = event.offers.map((offer) => offer.id);

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${event.type}.png"
                alt="Event type icon"
              >
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${Object.values(TripEventTypes).map((value) => createEventTypeItemTemplate(value, event.type)).join('')}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${capitalizeFirstLetter(event.type)}
            </label>
            <input
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              list="destination-list-1"
              value="${event.destination.name}"
            >
            <datalist id="destination-list-1">
              ${createDestinationsList(destinations)}
            </datalist>
          </div>
          <div class="event__field-group event__field-group--time">
            <input class="event__input event__input--time" type="text" name="event-start-time" value="${formatDate(event.dateFrom, DateFormats.DATE_TIME_INPUT)}">
            —
            <input class="event__input event__input--time" type="text" name="event-end-time" value="${formatDate(event.dateTo, DateFormats.DATE_TIME_INPUT)}">
          </div>
          <div class="event__field-group event__field-group--price">
            <label class="event__label">€</label>
            <input class="event__input event__input--price" type="text" name="event-price" value="${event.basePrice}">
          </div>
          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Close event</span>
          </button>
        </header>
        <section class="event__details">
          ${createOffersSectionTemplate(offers, selectedOfferIds)}
          ${createDestinationSectionTemplate(event.destination)}
        </section>
      </form>
    </li>
  `;
};

class EventEditFormView extends AbstractView {
  #event = null;
  #offers = null;
  #destinations = null;

  #handleFormSubmit = null;
  #handleCloseClick = null;

  constructor({ event, offers, destinations, onFormSubmit, onCloseClick }) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;

    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#onFormSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);
  }

  get template() {
    return createEditFormTemplate({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations
    });
  }

  #onFormSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#event);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };
}

export default EventEditFormView;
