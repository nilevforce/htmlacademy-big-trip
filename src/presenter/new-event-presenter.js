import EventEditFormView from '../view/event-edit-form-view';
import { UpdateType, UserAction } from '../constants';
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

  #handleFormSubmit = async (event) => {
    this.#eventEditComponent.updateElement({
      isSaving: true
    });

    try {
      await this.#handleDataChange(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        { ...event }
      );

      this.destroy();
    } catch {
      this.#eventEditComponent.updateElement({
        isSaving: false
      });
      this.#eventEditComponent.shake();
    }
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
