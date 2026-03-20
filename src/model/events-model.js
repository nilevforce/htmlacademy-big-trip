import { eventsMock } from '../mock/events-mock';
import { offersMock } from '../mock/offers-mock';
import { destinationsMock } from '../mock/destinations-mock';

class EventsModel {
  #events = structuredClone(eventsMock);
  #offers = structuredClone(offersMock);
  #destinations = structuredClone(destinationsMock);

  getEventOffers(type, selectedOfferIds) {
    const offersForType = this.#offers
      .find((offer) => offer.type === type)
      ?.offers ?? [];

    return offersForType.filter((offer) =>
      selectedOfferIds.includes(offer.id)
    );
  }

  getDestinationById(id) {
    return this.#destinations.find((dest) => dest.id === id);
  }

  get events() {
    return this.#events.map((event) => ({
      id: event.id,
      basePrice: event.basePrice,
      dateFrom: event.dateFrom,
      dateTo: event.dateTo,
      destination: this.getDestinationById(event.destination),
      isFavorite: event.isFavorite,
      offers: this.getEventOffers(event.type, event.offers),
      type: event.type
    }));
  }

  getOffersByType(type) {
    return this.#offers
      .find((offer) => offer.type === type)
      ?.offers;
  }

  get destinations() {
    return this.#destinations;
  }
}

export default EventsModel;
