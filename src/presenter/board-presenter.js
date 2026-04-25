import { remove, render, RenderPosition } from '../framework/render';
import SortingView from '../view/sorting-view';
import EventsListView from '../view/events-list-view';
import EventPresenter from './event-presenter';
import { FilterTypes, SortTypes, UpdateTypes, UserActions } from '../constants';
import { sortEventsByDay, sortEventsByPrice, sortEventsByTime } from '../helpers/sorting';
import { filter } from '../helpers/filter';
import NoEventsView from '../view/no-events-view';
import NewEventPresenter from './new-event-presenter';

class BoardPresenter {
  #eventsListContainer = null;
  #sortingComponent = null;
  #eventsListComponent = new EventsListView();
  #noEventsComponent = null;

  #eventsModel = null;
  #filterModel = null;

  #currentSortType = SortTypes.DAY;

  #newEventPresenter = null;
  #eventsPresenters = new Map();

  constructor({
    eventsListContainer,
    eventsModel,
    filterModel,
    onNewEventDestroy
  }) {
    this.#eventsListContainer = eventsListContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    const events = this.#eventsModel.events;
    const filterType = this.#filterModel.filter;
    const filteredEvents = filter[filterType](events);

    switch (this.#currentSortType) {
      case SortTypes.DAY:
        return filteredEvents.sort(sortEventsByDay);
      case SortTypes.TIME:
        return filteredEvents.sort(sortEventsByTime);
      case SortTypes.PRICE:
        return filteredEvents.sort(sortEventsByPrice);
      default:
        return filteredEvents.sort(sortEventsByDay);
    }
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

  createEvent() {
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.EVERYTHING);
    this.#newEventPresenter.init({
      offers: this.offers,
      destinations: this.destinations
    });
  }

  #renderBoard() {
    render(this.#eventsListComponent, this.#eventsListContainer);

    const events = this.events;
    const eventsCount = events.length;

    if (eventsCount === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderEvents();
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#eventsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventsPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }

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

  #renderNoEvents() {
    this.#noEventsComponent = new NoEventsView({
      filterType: this.#filterModel.filter
    });

    render(this.#noEventsComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
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

    this.#clearBoard();
    this.#renderBoard();
  };
}

export default BoardPresenter;
