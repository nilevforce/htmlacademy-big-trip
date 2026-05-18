import AbstractView from '../framework/view/abstract-view';

const createLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}

export default LoadingView;
