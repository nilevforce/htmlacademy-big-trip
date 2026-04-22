import AbstractView from '../framework/view/abstract-view';
import { SortTypes } from '../constants';

const createSortingTemplate = ({ currentSortType }) => {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortTypes.DAY || currentSortType === SortTypes.DEFAULT ? 'checked' : ''} data-js-sort-type="${SortTypes.DAY}">
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled ${currentSortType === SortTypes.EVENT ? 'checked' : ''} data-js-sort-type="${SortTypes.EVENT}">
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortTypes.TIME ? 'checked' : ''} data-js-sort-type="${SortTypes.TIME}">
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortTypes.PRICE ? 'checked' : ''} data-js-sort-type="${SortTypes.PRICE}">
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled ${currentSortType === SortTypes.OFFERS ? 'checked' : ''} data-js-sort-type="${SortTypes.OFFERS}">
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>
 `);
};

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
