import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
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
              data-js-offer-id="${offer.id}"
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

class EventEditFormView extends AbstractStatefulView {
  #event = null;
  #offers = null;
  #destinations = null;

  #handleFormSubmit = null;
  #handleCloseClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ event, offers, destinations, onFormSubmit, onCloseClick }) {
    super();

    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;

    this._state = EventEditFormView.parseEventToState(event);

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offerChangeHandler);
    }

    this.#setDatepicker();
  }

  get template() {
    const offersForType = this.#offers.find(
      (offer) => offer.type === this._state.type
    )?.offers ?? [];

    return createEditFormTemplate({
      event: this._state,
      offers: offersForType,
      destinations: this.#destinations
    });
  }

  reset(event) {
    this.updateElement(
      EventEditFormView.parseEventToState(event)
    );
  }

  removeElement() {
    super.removeElement();
    this.#destroyDatepickers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(
      EventEditFormView.parseStateToEvent(this._state)
    );
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDest = this.#destinations.find(
      (dest) => dest.name === evt.target.value
    );

    if (!selectedDest) {
      evt.target.value = this._state.destination?.name ?? this.#event.destination.name;
      return;
    }

    this.updateElement({
      destination: selectedDest
    });
  };

  #offerChangeHandler = (evt) => {
    const offerId = evt.target.dataset?.jsOfferId;
    if (!offerId) {
      return;
    }

    const offersForType = this.#offers.find(
      (offer) => offer.type === this._state.type
    )?.offers ?? [];

    const clickedOffer = offersForType.find(
      (offer) => offer.id === offerId
    );

    if (!clickedOffer) {
      evt.target.checked = false;
      return;
    }

    const isAlreadySelected = this._state.offers.some(
      (offer) => offer.id === offerId
    );

    const updatedOffers = isAlreadySelected
      ? this._state.offers.filter((offer) => offer.id !== offerId)
      : [...this._state.offers, clickedOffer];

    this._setState({
      offers: updatedOffers
    });
  };

  #priceChangeHandler = (evt) => {
    const price = parseInt(evt.target.value, 10);

    this._setState({
      basePrice: isNaN(price) ? 0 : price,
    });
  };

  #dateFromChangeHandler = ([date]) => {
    this._setState({
      dateFrom: date
    });

    this.#datepickerTo.set('minDate', date);
  };

  #dateToChangeHandler = ([date]) => {
    this._setState({
      dateTo: date
    });
  };

  #setDatepicker() {
    if (this._state?.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('[name="event-start-time"]'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler,
        },
      );
    }

    if (this._state?.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('[name="event-end-time"]'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this.#dateToChangeHandler,
        },
      );
    }
  }

  #destroyDatepickers() {
    this.#datepickerFrom?.destroy();
    this.#datepickerTo?.destroy();
    this.#datepickerFrom = null;
    this.#datepickerTo = null;
  }

  static parseEventToState(event) {
    return {
      id: event.id,
      type: event.type,
      destination: event.destination,
      offers: event.offers,
      basePrice: event.basePrice,
      dateFrom: event.dateFrom,
      dateTo: event.dateTo,
      isFavorite: event.isFavorite,
    };
  }

  static parseStateToEvent(state) {
    return { ...state };
  }
}

export default EventEditFormView;
