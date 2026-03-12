import { render } from '../render';
import SortingView from '../view/sorting-view';
import EventAddView from '../view/event-add-view';
import EventListView from '../view/event-list-view';
import EventItemView from '../view/event-item-view';

class EventsPresenter {
  sortingComponent = new SortingView();
  eventsListComponent = new EventListView();
  eventAddComponent = new EventAddView();

  constructor({ eventsContainer }) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(this.sortingComponent, this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    render(this.eventAddComponent, this.eventsListComponent.getElement());

    for (let i = 1; i <= 3; i++) {
      render(new EventItemView(), this.eventsListComponent.getElement());
    }
  }
}

export default EventsPresenter;
