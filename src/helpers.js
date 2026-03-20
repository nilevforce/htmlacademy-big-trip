import dayjs from 'dayjs';
import { TIME_UNITS } from './constants';

const RANDOM_ITEMS_COUNT_DEFAULT = 1;
const MINUTES_IN_DAY = 1440;
const MINUTES_IN_HOUR = 60;

const getRandomItems = (arr, count = RANDOM_ITEMS_COUNT_DEFAULT) => {
  if (count > arr.length) {
    throw new Error('Количество элементов больше длины массива');
  }

  const copy = [...arr];

  for (let i = copy.length - 1; i > copy.length - 1 - count; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(-count);
};

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

  const totalMinutes = end.diff(start, TIME_UNITS.MINUTE);

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

const capitalizeWords = (str) => str.replace(/\b\p{L}/gu, (char) => char.toUpperCase());

const capitalizeFirstLetter = (str) =>
  str ? str[0].toUpperCase() + str.slice(1) : str;

const toSlug = (str) => {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
    'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '',
    'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  return str
    .toLowerCase()
    .split('')
    .map((char) => map[char] ?? char)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export {
  getRandomItems,
  formatDate,
  getTimeDiff,
  formatDuration,
  capitalizeWords,
  capitalizeFirstLetter,
  toSlug
};
