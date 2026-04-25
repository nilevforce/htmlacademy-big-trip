import AbstractView from '../framework/view/abstract-view';

const createNewEventButtonTemplate = () => `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;

class NewEventButtonView extends AbstractView {
  #handleButtonClick = null;

  constructor({ onClick }) {
    super();

    this.#handleButtonClick = onClick;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}

export default NewEventButtonView;
