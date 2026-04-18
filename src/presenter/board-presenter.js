import { render, RenderPosition } from '../framework/render';
import SortingView from '../view/sorting-view';
import EventsListView from '../view/events-list-view';
import EventPresenter from './event-presenter';
import { updateItem } from '../helpers/common';
import { SortTypes } from '../constants';
import { sortEventsByDay, sortEventsByPrice, sortEventsByTime } from '../helpers/sorting';

class BoardPresenter {
  #eventsListContainer = null;
  #sortingComponent = null;
  #eventsListComponent = new EventsListView();

  #eventsModel = null;

  #events = null;
  #sourcedEvents = null;
  #destinations = null;

  #currentSortType = SortTypes.DEFAULT;

  #eventsPresenters = new Map();

  constructor({ eventsListContainer, eventsModel }) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = this.#eventsModel.events;
    this.#sourcedEvents = [...this.#events];
    this.#destinations = this.#eventsModel.destinations;

    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#eventsListComponent, this.#eventsListContainer);
    this.#renderSort();
    this.#renderEvents();
  }

  #renderSort() {
    this.#sortingComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortingComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvents() {
    this.#events.forEach((event) => {
      this.#renderEvent(event);
    });
  }

  #clearEventsList() {
    this.#eventsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventsPresenters.clear();
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init({
      event,
      offers: this.#eventsModel.getOffersByType(event.type),
      destinations: this.#destinations,
    });

    this.#eventsPresenters.set(event.id, eventPresenter);
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventsPresenters.get(updatedEvent.id).init({
      event: updatedEvent,
      offers: this.#eventsModel.getOffersByType(updatedEvent.type),
      destinations: this.#destinations
    });
  };

  #handleModeChange = () => {
    this.#eventsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEvents();
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortTypes.DAY:
        this.#events.sort(sortEventsByDay);
        break;
      case SortTypes.TIME:
        this.#events.sort(sortEventsByTime);
        break;
      case SortTypes.PRICE:
        this.#events.sort(sortEventsByPrice);
        break;
      default:
        this.#events = [...this.#sourcedEvents];
    }

    this.#currentSortType = sortType;
  }
}

export default BoardPresenter;
