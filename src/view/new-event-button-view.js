import AbstractView from '../framework/view/abstract-view';

const createNewEventButtonTemplate = () => {
  return (`
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `);
};

class NewEventButtonView extends AbstractView {
  get template() {
    return createNewEventButtonTemplate();
  }
}

export default NewEventButtonView;
