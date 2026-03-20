import { render } from '../framework/render';
import SortingView from '../view/sorting-view';
import EventsListView from '../view/events-list-view';
import EventItemView from '../view/event-item-view';
import { EventEditFormView } from '../view/event-edit-form-view';
import { TRIP_EVENT_TYPES } from '../constants';

class EventsPresenter {
  #eventsListContainer = null;
  #sortingComponent = null;
  #eventsListComponent = null;
  #eventsItemContainer = null;
  #eventsModel = null;
  #events = null;

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

    render(new EventEditFormView({
      type: TRIP_EVENT_TYPES.FLIGHT,
      offers: this.#eventsModel.getOffersByType(TRIP_EVENT_TYPES.FLIGHT),
      destinations: this.#eventsModel.destinations
    }), this.#eventsItemContainer);

    this.#events.forEach((event) => {
      render(new EventItemView({ event }), this.#eventsItemContainer);
    });
  }
}

export default EventsPresenter;
