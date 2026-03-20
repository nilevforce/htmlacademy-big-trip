import FilterPresenter from './presenter/filter-presenter';
import EventsPresenter from './presenter/events-presenter';
import EventsModel from './model/events-model';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const filterContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsListContainerElement = siteMainElement.querySelector('.trip-events');

const eventsModel = new EventsModel();

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement
});

const eventsPresenter = new EventsPresenter({
  eventsListContainer: eventsListContainerElement,
  eventsModel
});

filterPresenter.init();
eventsPresenter.init();
