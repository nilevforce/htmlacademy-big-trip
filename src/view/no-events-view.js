import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../constants';

const NoEventText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now'
};

const createNoEventsTemplate = ({ filterType }) => {
  const noEventsText = NoEventText[filterType];

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
