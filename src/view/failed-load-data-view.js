import AbstractView from '../framework/view/abstract-view';

const createFailedLoadDataTemplate = () => '<p class="trip-events__msg">Failed to load latest route information</p>';

class FailedLoadDataView extends AbstractView {
  get template() {
    return createFailedLoadDataTemplate();
  }
}

export default FailedLoadDataView;
