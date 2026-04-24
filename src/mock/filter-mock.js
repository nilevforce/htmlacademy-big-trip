import { filter } from '../helpers/filter';

const generateFilter = (events) => {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => {
      const result = filterEvents(events);

      return {
        type: filterType,
        count: result.length
      };
    }
  );
};

export {
  generateFilter
};
