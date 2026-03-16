import SortingView from '../view/sorting-view';
import { render } from '../framework/render';
import EventsListView from '../view/events-list-view';
import EventItemView from '../view/event-item-view';

class EventsPresenter {
  #eventsListContainer = null;
  #sortingComponent = null;
  #eventsListComponent = null;
  #eventsItemContainer = null;

  constructor({ eventsListContainer }) {
    this.#eventsListContainer = eventsListContainer;
  }

  init() {
    this.#sortingComponent = new SortingView();
    this.#eventsListComponent = new EventsListView();
    this.#eventsItemContainer = this.#eventsListComponent.element;

    render(this.#sortingComponent, this.#eventsListContainer);
    render(this.#eventsListComponent, this.#eventsListContainer);

    for (let i = 0; i < 3; i++) {
      render(new EventItemView(), this.#eventsItemContainer);
    }
  }
}

export default EventsPresenter;
