import SortingView from '../view/sorting-view';
import { render } from '../framework/render';
import EventsListView from '../view/events-list-view';
import EventItemView from '../view/event-item-view';

class EventsPresenter {
  #eventsListContainer = null;
  #sortingComponent = null;
  #eventsListComponent = null;
  #eventsItemContainer = null;

  #eventsModel = null;
  #events = null;

  // eslint-disable-next-line no-shadow
  constructor({ eventsListContainer, eventsModel }) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#sortingComponent = new SortingView();
    this.#eventsListComponent = new EventsListView();
    this.#eventsItemContainer = this.#eventsListComponent.element;
    this.#events = this.#eventsModel.events;

    render(this.#sortingComponent, this.#eventsListContainer);
    render(this.#eventsListComponent, this.#eventsListContainer);

    this.#events.forEach((event) => {
      render(new EventItemView({ event }), this.#eventsItemContainer);
    });
  }
}

export default EventsPresenter;
