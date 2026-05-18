import AbstractView from '../framework/view/abstract-view';
import { DateFormats } from '../constants';
import { formatDate } from '../helpers/times';

const MAX_DESTINATIONS_COUNT = 3;

const createRouteTitle = (events) => {
  const destinations = events.map((event) => event.destination.name);

  if (destinations.length <= MAX_DESTINATIONS_COUNT) {
    return destinations.join(' &mdash; ');
  }

  return `${destinations.at(0)} &mdash; ... &mdash; ${destinations.at(-1)}`;
};

const createTripDates = (events) => {
  const firstEvent = events.at(0);
  const lastEvent = events.at(-1);
  const dateFrom = formatDate(firstEvent.dateFrom, DateFormats.TRIP_DATE);
  const dateTo = formatDate(lastEvent.dateTo, DateFormats.TRIP_DATE);
  const monthFrom = formatDate(firstEvent.dateFrom, DateFormats.TRIP_MONTH);
  const monthTo = formatDate(lastEvent.dateTo, DateFormats.TRIP_MONTH);

  if (dateFrom === dateTo) {
    return dateFrom;
  }

  if (monthFrom === monthTo) {
    return `${formatDate(firstEvent.dateFrom, DateFormats.TRIP_DAY)}&nbsp;&mdash;&nbsp;${dateTo}`;
  }

  return `${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}`;
};

const calculateTripCost = (events) => events.reduce((totalCost, event) => {
  const offersCost = event.offers.reduce(
    (totalOffersCost, offer) => totalOffersCost + offer.price,
    0
  );

  return totalCost + event.basePrice + offersCost;
}, 0);

const createTripInfoTemplate = (events) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createRouteTitle(events)}</h1>

      <p class="trip-info__dates">${createTripDates(events)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTripCost(events)}</span>
    </p>
  </section>
`;

class TripInfoView extends AbstractView {
  #events = null;

  constructor({ events }) {
    super();

    this.#events = events;
  }

  get template() {
    return createTripInfoTemplate(this.#events);
  }
}

export default TripInfoView;
