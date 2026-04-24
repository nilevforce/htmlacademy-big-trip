import FilterView from '../view/filter-view';
import { remove, render, replace } from '../framework/render';
import { FilterTypes, UpdateTypes } from '../constants';
import { filter } from '../helpers/filter';

class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;

  #filterModel = null;
  #eventsModel = null;

  constructor({ filterContainer, filterModel, eventsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: this.filters,
      currentFilter: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  get filters() {
    const events = this.#eventsModel.events;

    return Object.values(FilterTypes).map((type) => ({
      type,
      count: filter[type](events).length
    }));
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateTypes.MAJOR, filterType);
  };
}

export default FilterPresenter;
