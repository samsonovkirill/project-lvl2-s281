import { safeLoad } from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: safeLoad,
};

export default format => (data) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`Format ${format} is not supported`);
  }
  return parser(data);
};
