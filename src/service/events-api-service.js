import ApiService from '../framework/api-service.js';
import { ApiEndpoints, ApiMethods } from '../constants.js';

class EventsApiService extends ApiService {
  async getEvents() {
    const response = await this._load({
      url: ApiEndpoints.POINTS,
      method: ApiMethods.GET
    });

    const events = await ApiService.parseResponse(response);

    return events.map((event) => this.#adaptEventToClient(event));
  }

  async getDestinations() {
    const response = await this._load({
      url: ApiEndpoints.DESTINATIONS,
      method: ApiMethods.GET
    });

    const destinations = await ApiService.parseResponse(response);

    return destinations.map((dest) => this.#adaptDestinationToClient(dest));
  }

  async getOffers() {
    const response = await this._load({
      url: ApiEndpoints.OFFERS,
      method: ApiMethods.GET
    });

    const offers = await ApiService.parseResponse(response);

    return offers.map((offer) => this.#adaptOfferToClient(offer));
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${ApiEndpoints.POINTS}/${event.id}`,
      method: ApiMethods.PUT,
      body: JSON.stringify(this.#adaptEventToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const updatedEvent = await ApiService.parseResponse(response);

    return this.#adaptEventToClient(updatedEvent);
  }

  async addEvent(event) {
    const response = await this._load({
      url: ApiEndpoints.POINTS,
      method: ApiMethods.POST,
      body: JSON.stringify(this.#adaptEventToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const createdEvent = await ApiService.parseResponse(response);

    return this.#adaptEventToClient(createdEvent);
  }

  async deleteEvent(eventId) {
    return await this._load({
      url: `${ApiEndpoints.POINTS}/${eventId}`,
      method: ApiMethods.DELETE,
    });
  }

  #adaptEventToClient(event) {
    return {
      'id': event.id,
      'basePrice': event.base_price,
      'dateFrom': event.date_from,
      'dateTo': event.date_to,
      'destination': event.destination,
      'isFavorite': event.is_favorite,
      'offers': event.offers,
      'type': event.type
    };
  }

  #adaptEventToServer(event) {
    return {
      'base_price': event.basePrice,
      'date_from': event.dateFrom,
      'date_to': event.dateTo,
      'destination': event.destination,
      'is_favorite': event.isFavorite,
      'offers': event.offers,
      'type': event.type
    };
  }

  #adaptDestinationToClient(dest) {
    return {
      id: dest.id,
      description: dest.description,
      name: dest.name,
      pictures: dest.pictures.map((picture) => ({
        src: picture.src,
        description: picture.description
      }))
    };
  }

  #adaptOfferToClient(offer) {
    return {
      type: offer.type,
      offers: offer.offers.map((item) => ({
        id: item.id,
        title: item.title,
        price: parseInt(item.price, 10)
      }))
    };
  }
}

export default EventsApiService;
