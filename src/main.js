import FilterPresenter from './presenter/filter-presenter';
import BoardPresenter from './presenter/board-presenter';
import EventsModel from './model/events-model';
import NewEventButtonView from './view/new-event-button-view';
import { render } from './framework/render';
import { generateFilter } from './mock/filter-mock';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const filterContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsListContainerElement = siteMainElement.querySelector('.trip-events');

const eventsModel = new EventsModel();

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
  filters: generateFilter(eventsModel.events)
});

const boardPresenter = new BoardPresenter({
  eventsListContainer: eventsListContainerElement,
  eventsModel
});

render(new NewEventButtonView(), tripMainElement);
filterPresenter.init();
boardPresenter.init();
