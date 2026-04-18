import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortEventsByDay = (eventA, eventB) => {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
};

const sortEventsByTime = (eventA, eventB) => {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  const durationEventA = dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom));
  const durationEventB = dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom));

  return durationEventB - durationEventA;
};

const sortEventsByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export {
  sortEventsByDay,
  sortEventsByTime,
  sortEventsByPrice
};
