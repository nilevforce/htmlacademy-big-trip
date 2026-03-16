import { eventsMock } from '../mock/events-mock';
import { offersMock } from '../mock/offers-mock';
import { destinationsMock } from '../mock/destinations-mock';

const getEventOffers = (type, selectedOfferIds) => {
  const allOffers = structuredClone(offersMock);

  const offersForType = allOffers
    .find((offer) => offer.type === type)
    ?.offers ?? [];

  return offersForType.filter((offer) => selectedOfferIds.includes(offer.id));
};

const getDestinationById = (id) => destinationsMock.find((dest) => dest.id === id);

class EventsModel {
  #events = null;

  get events() {
    this.#events = eventsMock;

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
