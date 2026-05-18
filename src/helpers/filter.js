import { FilterType } from '../constants';
import { isDateInFuture, isDateInPast, isNowBetweenDates } from './times';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isDateInFuture(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isNowBetweenDates(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isDateInPast(event.dateTo)),
};

export {
  filter
};
