import AbstractView from '../framework/view/abstract-view';

const createEventsTemplate = () => {
  return (`
    <ul class="trip-events__list"></ul>
  `);
};

class EventsListView extends AbstractView {
  get template() {
    return createEventsTemplate();
  }
}

export default EventsListView;
