import { render } from './render';
import FilterView from './view/filter-view';
import EventsPresenter from './presenter/events-presenter';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const filterContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsContainerElement = siteMainElement.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter({ eventsContainer: eventsContainerElement });

render(new FilterView(), filterContainerElement);

eventsPresenter.init();
