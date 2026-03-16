import FilterView from '../view/filter-view';
import { render } from '../framework/render';

class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;

  constructor({ filterContainer }) {
    this.#filterContainer = filterContainer;
  }

  init() {
    this.#filterComponent = new FilterView();

    render(this.#filterComponent, this.#filterContainer);
  }
}

export default FilterPresenter;
