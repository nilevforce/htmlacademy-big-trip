import { eventsMock } from '../mock/events-mock';
import { offersMock } from '../mock/offers-mock';
import { destinationsMock } from '../mock/destinations-mock';
import Observable from '../framework/observable';

class EventsModel extends Observable {
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

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    const rawUpdate = {
      ...update,
      destination: update.destination.id,
      offers: update.offers.map((offer) => offer.id)
    };

    this.#events = [
      ...this.#events.slice(0, index),
      rawUpdate,
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    const rawUpdate = {
      ...update,
      destination: update.destination.id,
      offers: update.offers.map((offer) => offer.id)
    };

    this.#events = [rawUpdate, ...this.#events];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  #getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type)?.offers ?? [];
  }

  #getSelectedOffersByType(type, selectedOfferIds) {
    const offersForType = this.#getOffersByType(type);

    return offersForType.filter((offer) =>
      selectedOfferIds.includes(offer.id)
    );
  }

  #getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}

export default EventsModel;
