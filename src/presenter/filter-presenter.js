import FilterView from '../view/filter-view';
import { render } from '../framework/render';

class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filters = null;

  constructor({ filterContainer, filters }) {
    this.#filterContainer = filterContainer;
    this.#filters = filters;
  }

  init() {
    this.#filterComponent = new FilterView({ filters: this.#filters });

    render(this.#filterComponent, this.#filterContainer);
  }
}

export default FilterPresenter;
