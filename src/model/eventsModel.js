import { eventsMock } from '../mock/events-mock';
import { offersMock } from '../mock/offers-mock';
import { destinationsMock } from '../mock/destinations-mock';

const getEventOffers = (type, selectedOfferIds) => {
  const offersForType = offersMock
    .find((offer) => offer.type === type)
    ?.offers ?? [];

  return offersForType.filter((offer) => selectedOfferIds.includes(offer.id));
};

const getDestinationById = (id) => destinationsMock.find((dest) => dest.id === id);

class EventsModel {
  #events = null;
  #offers = null;
  #destinations = null;

  get events() {
    this.#events = eventsMock;
    this.#offers = offersMock;
    this.#destinations = destinationsMock;

    return this.#events.map((event) => ({
      id: event.id,
      basePrice: event.basePrice,
      dateFrom: event.dateFrom,
      dateTo: event.dateTo,
      destination: getDestinationById(event.destination),
      isFavorite: event.isFavorite,
      offers: getEventOffers(event.type, event.offers),
      type: event.type
    }));
  }
}

export default EventsModel;
