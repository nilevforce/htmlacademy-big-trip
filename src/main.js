import FilterPresenter from './presenter/filter-presenter';
import EventsPresenter from './presenter/events-presenter';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const filterContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsListContainerElement = siteMainElement.querySelector('.trip-events');

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement
});

const eventsPresenter = new EventsPresenter({
  eventsListContainer: eventsListContainerElement
});

filterPresenter.init();
eventsPresenter.init();
