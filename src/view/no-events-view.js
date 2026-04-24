import AbstractView from '../framework/view/abstract-view';
import { FilterTypes } from '../constants';

const NoEventsTextTypes = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.FUTURE]: 'There are no future events now'
};

const createNoEventsTemplate = ({ filterType }) => {
  const noEventsText = NoEventsTextTypes[filterType];

  return `<p class="trip-events__msg">${noEventsText}</p>`;
};

class NoEventsView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createNoEventsTemplate({ filterType: this.#filterType });
  }
}

export default NoEventsView;
