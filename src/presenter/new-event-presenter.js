import EventEditFormView from '../view/event-edit-form-view';
import { UpdateTypes, UserActions } from '../constants';
import { nanoid } from 'nanoid';
import { remove, render, RenderPosition } from '../framework/render';

class NewEventPresenter {
  #eventListContainer = null;
  #eventEditComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  #offers = null;
  #destinations = null;

  constructor({
    eventListContainer,
    onDataChange,
    onDestroy,
  }) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({
    offers,
    destinations
  }) {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#offers = offers;
    this.#destinations = destinations;

    this.#eventEditComponent = new EventEditFormView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: this.#handleDeleteClick,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#eventEditComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserActions.ADD_EVENT,
      UpdateTypes.MAJOR,
      { ...event, id: nanoid() }
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#handleDeleteClick();
    }
  };
}

export default NewEventPresenter;
