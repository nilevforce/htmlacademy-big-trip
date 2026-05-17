import Observable from '../framework/observable';
import { UpdateTypes } from '../constants.js';

class EventsModel extends Observable {
  #events = null;
  #offers = null;
  #destinations = null;
  #eventsApiService = null;

  constructor({ eventsApiService }) {
    super();

    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      this.#events = await this.#eventsApiService.getEvents();
      this.#destinations = await this.#eventsApiService.getDestinations();
      this.#offers = await this.#eventsApiService.getOffers();

      this._notify(UpdateTypes.INIT);
    } catch (e) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
    }
  }

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

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const rawUpdate = {
        ...update,
        destination: update.destination.id,
        offers: update.offers.map((offer) => offer.id)
      };

      const updatedEvent = await this.#eventsApiService.updateEvent(rawUpdate);

      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1)
      ];

      this._notify(updateType, update);
    } catch (e) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const rawCreate = {
        ...update,
        destination: update.destination.id,
        offers: update.offers.map((offer) => offer.id)
      };

      const createdEvent = await this.#eventsApiService.addEvent(rawCreate);

      this.#events = [createdEvent, ...this.#events];

      this._notify(updateType, update);
    } catch (e) {
      throw new Error('Can\'t create event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update.id);

      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1)
      ];

      this._notify(updateType, update);
    } catch (e) {
      throw new Error('Can\'t delete event');
    }
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
