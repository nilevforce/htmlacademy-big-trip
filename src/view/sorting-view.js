import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../constants';

const createSortingTemplate = ({ currentSortType }) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortType.DAY ? 'checked' : ''} data-js-sort-type="${SortType.DAY}">
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled ${currentSortType === SortType.EVENT ? 'checked' : ''} data-js-sort-type="${SortType.EVENT}">
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortType.TIME ? 'checked' : ''} data-js-sort-type="${SortType.TIME}">
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortType.PRICE ? 'checked' : ''} data-js-sort-type="${SortType.PRICE}">
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled ${currentSortType === SortType.OFFERS ? 'checked' : ''} data-js-sort-type="${SortType.OFFERS}">
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
  </form>
`;

class SortingView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();

    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener(
      'change', this.#sortTypeChangeHandler
    );
  }

  get template() {
    return createSortingTemplate({
      currentSortType: this.#currentSortType
    });
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.jsSortType);
  };
}

export default SortingView;
