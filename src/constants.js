const TimeUnits = {
  SECOND: 'second',
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

const DateFormats = {
  DATE_TIME_INPUT: 'DD/MM/YY HH:mm',
  SHORT_DATE: 'MMM DD',
  ISO_DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm'
};

const TripEventTypes = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export {
  TimeUnits,
  DateFormats,
  TripEventTypes,
  FilterTypes
};
