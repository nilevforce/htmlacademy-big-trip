import { FilterTypes } from '../constants';
import { isDateInFuture, isDateInPast, isNowBetweenDates } from './times';

const filter = {
  [FilterTypes.EVERYTHING]: (events) => events,
  [FilterTypes.FUTURE]: (events) => events.filter((event) => isDateInFuture(event.dateFrom)),
  [FilterTypes.PRESENT]: (events) => events.filter((event) => isNowBetweenDates(event.dateFrom, event.dateTo)),
  [FilterTypes.PAST]: (events) => events.filter((event) => isDateInPast(event.dateTo)),
};

export {
  filter
};
