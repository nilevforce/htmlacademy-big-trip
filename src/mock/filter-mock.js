import { filters } from '../helpers/filters';

const generateFilter = (events) => {
  return Object.entries(filters).map(
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
