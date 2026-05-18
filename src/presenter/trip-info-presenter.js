import { remove, render, replace, RenderPosition } from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import { sortEventsByDay } from '../helpers/sorting';

class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  #eventsModel = null;

  constructor({ tripInfoContainer, eventsModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    return [...this.#eventsModel.events].sort(sortEventsByDay);
  }

  init() {
    const events = this.events;

    if (!events.length || this.#eventsModel.isFailedLoad) {
      this.#clearTripInfo();
      return;
    }

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      events
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #clearTripInfo() {
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
  }

  #handleModelEvent = () => {
    this.init();
  };
}

export default TripInfoPresenter;
