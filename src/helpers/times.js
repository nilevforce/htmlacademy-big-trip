import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { TimeUnits } from '../constants';

const MINUTES_IN_DAY = 1440;
const MINUTES_IN_HOUR = 60;

dayjs.extend(isBetween);

const formatDate = (date, format) => date
  ? dayjs(date).format(format)
  : '';

const getTimeDiff = (dateFrom, dateTo, unit) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  return end.diff(start, unit);
};

const formatDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const totalMinutes = end.diff(start, TimeUnits.MINUTE);

  const days = String(
    Math.floor(totalMinutes / MINUTES_IN_DAY)
  ).padStart(2, '0');

  const hours = String(
    Math.floor(totalMinutes % MINUTES_IN_DAY / MINUTES_IN_HOUR)
  ).padStart(2, '0');

  const minutes = String(
    totalMinutes % MINUTES_IN_DAY % MINUTES_IN_HOUR
  ).padStart(2, '0');

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
};

const isDateInPast = (date) => dayjs(date).isBefore(dayjs(), 'day');

const isNowBetweenDates = (dateStart, dateEnd) => dayjs().isBetween(dateStart, dateEnd, 'day', '[]');

const isDateInFuture = (date) => dayjs(date).isAfter(dayjs(), 'day');

export {
  formatDuration,
  getTimeDiff,
  formatDate,
  isDateInPast,
  isNowBetweenDates,
  isDateInFuture
};
