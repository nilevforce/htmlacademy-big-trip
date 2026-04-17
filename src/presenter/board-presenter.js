import { render } from '../framework/render';
import SortingView from '../view/sorting-view';
import EventsListView from '../view/events-list-view';
import EventPresenter from './event-presenter';

class BoardPresenter {
  #eventsListContainer = null;
  #sortingComponent = new SortingView();
  #eventsListComponent = new EventsListView();
  #eventsModel = null;
  #events = null;
  #destinations = null;

  constructor({ eventsListContainer, eventsModel }) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = this.#eventsModel.events;
    this.#destinations = this.#eventsModel.destinations;

    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#sortingComponent, this.#eventsListContainer);
    render(this.#eventsListComponent, this.#eventsListContainer);

    this.#renderEvents();
  }

  #renderEvents() {
    this.#events.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element
    });

    eventPresenter.init({
      event,
      offers: this.#eventsModel.getOffersByType(event.type),
      destinations: this.#destinations,
    });
  }
}

export default BoardPresenter;
