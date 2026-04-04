import { render, replace } from '../framework/render';
import SortingView from '../view/sorting-view';
import EventsListView from '../view/events-list-view';
import EventItemView from '../view/event-item-view';
import EventEditFormView from '../view/event-edit-form-view';

class EventsPresenter {
  #eventsListContainer = null;
  #sortingComponent = new SortingView();
  #eventsListComponent = new EventsListView();
  #eventsItemContainer = this.#eventsListComponent.element;
  #eventsModel = null;
  #events = null;
  #destinations = null;

  constructor({ eventsListContainer, eventsModel }) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;

    this.#events = this.#eventsModel.events;
    this.#destinations = this.#eventsModel.destinations;
  }

  init() {

    render(this.#sortingComponent, this.#eventsListContainer);
    render(this.#eventsListComponent, this.#eventsListContainer);

    this.#events.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #renderEvent(event) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventItemView({
      event,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EventEditFormView({
      event: event,
      offers: this.#eventsModel.getOffersByType(event.type),
      destinations: this.#destinations,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToCard() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#eventsItemContainer);
  }

}

export default EventsPresenter;
