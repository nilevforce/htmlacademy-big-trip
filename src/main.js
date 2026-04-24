import FilterPresenter from './presenter/filter-presenter';
import BoardPresenter from './presenter/board-presenter';
import EventsModel from './model/events-model';
import NewEventButtonView from './view/new-event-button-view';
import { render } from './framework/render';
import FilterModel from './model/filter-model';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const filterContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsListContainerElement = siteMainElement.querySelector('.trip-events');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
  filterModel,
  eventsModel
});

const boardPresenter = new BoardPresenter({
  eventsListContainer: eventsListContainerElement,
  eventsModel,
  filterModel
});

render(new NewEventButtonView(), tripMainElement);
filterPresenter.init();
boardPresenter.init();
