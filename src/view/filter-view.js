import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, count } = filter;

  return (`
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
      >

      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>
  `);
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map(
    (filter) => createFilterItemTemplate(filter, currentFilterType)
  ).join('');

  return (`
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleTypeFilterChange = null;

  constructor({ filters, currentFilter, onFilterTypeChange }) {
    super();

    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleTypeFilterChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleTypeFilterChange(evt.target.value);
  };
}

export default FilterView;
