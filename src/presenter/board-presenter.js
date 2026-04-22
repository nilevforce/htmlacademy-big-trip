import { remove, render, RenderPosition } from '../framework/render';
import SortingView from '../view/sorting-view';
import EventsListView from '../view/events-list-view';
import EventPresenter from './event-presenter';
import { SortTypes, UpdateTypes, UserActions } from '../constants';
import { sortEventsByDay, sortEventsByPrice, sortEventsByTime } from '../helpers/sorting';

class BoardPresenter {
  #eventsListContainer = null;
  #sortingComponent = null;
  #eventsListComponent = new EventsListView();

  #eventsModel = null;

  #currentSortType = SortTypes.DEFAULT;

  #eventsPresenters = new Map();

  constructor({ eventsListContainer, eventsModel }) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch (this.#currentSortType) {
      case SortTypes.DAY:
        return [...this.#eventsModel.events].sort(sortEventsByDay);
      case SortTypes.TIME:
        return [...this.#eventsModel.events].sort(sortEventsByTime);
      case SortTypes.PRICE:
        return [...this.#eventsModel.events].sort(sortEventsByPrice);
    }

    return [...this.#eventsModel.events];
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  get offers() {
    return this.#eventsModel.offers;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#eventsListComponent, this.#eventsListContainer);
    this.#renderSort();
    this.#renderEvents();
  }

  #clearBoard({ resetSortType = false } = {}) {
    if (resetSortType) {
      this.#currentSortType = SortTypes.DEFAULT;
    }

    this.#clearEventsList();
    remove(this.#sortingComponent);
  }

  #renderSort() {
    this.#sortingComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortingComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvents() {
    this.events.forEach((event) => {
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
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init({
      event,
      offers: this.offers,
      destinations: this.destinations
    });

    this.#eventsPresenters.set(event.id, eventPresenter);
  }

  #handleModeChange = () => {
    this.#eventsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserActions.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserActions.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserActions.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#eventsPresenters.get(data.id).init({
          event: data,
          offers: this.offers,
          destinations: this.destinations
        });
        break;
      case UpdateTypes.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateTypes.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = SortTypes[sortType];

    this.#clearEventsList();
    this.#renderEvents();
  };
}

export default BoardPresenter;
