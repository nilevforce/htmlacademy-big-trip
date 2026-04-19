import { eventsMock } from '../mock/events-mock';
import { offersMock } from '../mock/offers-mock';
import { destinationsMock } from '../mock/destinations-mock';

class EventsModel {
  #events = eventsMock;
  #offers = offersMock;
  #destinations = destinationsMock;

  get events() {
    return this.#events.map((event) => ({
      id: event.id,
      basePrice: event.basePrice,
      dateFrom: event.dateFrom,
      dateTo: event.dateTo,
      destination: this.#getDestinationById(event.destination),
      isFavorite: event.isFavorite,
      offers: this.#getSelectedOffersByType(event.type, event.offers),
      type: event.type
    }));
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type)?.offers ?? [];
  }

  #getSelectedOffersByType(type, selectedOfferIds) {
    const offersForType = this.getOffersByType(type);

    return offersForType.filter((offer) =>
      selectedOfferIds.includes(offer.id)
    );
  }

  #getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}

export default EventsModel;
