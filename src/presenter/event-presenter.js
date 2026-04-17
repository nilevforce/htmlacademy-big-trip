import EventItemView from '../view/event-item-view';
import EventEditFormView from '../view/event-edit-form-view';
import { render, replace } from '../framework/render';

class EventPresenter {
  #eventsListContainer = null;
  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #offers = null;
  #destinations = null;

  constructor({ eventsListContainer }) {
    this.#eventsListContainer = eventsListContainer;
  }

  init({ event, offers, destinations }) {
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#eventComponent = new EventItemView({
      event: this.#event,
      onEditClick: this.#onEditClick
    });

    this.#eventEditComponent = new EventEditFormView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: this.#onCloseClick
    });

    render(this.#eventComponent, this.#eventsListContainer);
  }

  #replaceCardToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #onEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  #onCloseClick = () => {
    this.#replaceFormToCard();
  };
}

export default EventPresenter;
