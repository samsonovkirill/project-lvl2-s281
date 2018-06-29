import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

export default format => (data) => {
  const parse = parsers[format];
  if (!parse) {
    throw new Error(`Format ${format} is not supported`);
  }
  return parse(data);
};
