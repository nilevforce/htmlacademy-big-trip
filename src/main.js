import FilterPresenter from './presenter/filter-presenter';
import BoardPresenter from './presenter/board-presenter';
import EventsModel from './model/events-model';
import NewEventButtonView from './view/new-event-button-view';
import { render } from './framework/render';
import FilterModel from './model/filter-model';
import EventsApiService from './service/events-api-service.js';
import TripInfoPresenter from './presenter/trip-info-presenter';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const filterContainerElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventsListContainerElement = siteMainElement.querySelector('.trip-events');

const AUTHORIZATION = 'Basic hS2afz41wcl1sa2j';
const BASE_API_URL = 'https://24.objects.htmlacademy.pro/big-trip';

const bootstrap = async () => {
  const eventsModel = new EventsModel({
    eventsApiService: new EventsApiService(BASE_API_URL, AUTHORIZATION)
  });

  const filterModel = new FilterModel();

  new TripInfoPresenter({
    tripInfoContainer: tripMainElement,
    eventsModel
  });

  new FilterPresenter({
    filterContainer: filterContainerElement,
    filterModel,
    eventsModel
  });

  const boardPresenter = new BoardPresenter({
    eventsListContainer: eventsListContainerElement,
    eventsModel,
    filterModel,
    onNewEventDestroy: handleNewEventFormClose
  });

  const newEventButtonComponent = new NewEventButtonView({
    onClick: handleNewEventButtonClick
  });

  function handleNewEventFormClose() {
    newEventButtonComponent.setDisabled(false);
  }

  function handleNewEventButtonClick() {
    boardPresenter.createEvent();
    newEventButtonComponent.setDisabled(true);
  }

  boardPresenter.init();
  await eventsModel.init();

  render(newEventButtonComponent, tripMainElement);
};

bootstrap();
