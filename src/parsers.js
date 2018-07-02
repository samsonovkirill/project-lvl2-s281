import { safeLoad } from 'js-yaml';
import ini from 'ini';
import getHandlerByType from './utils';

const parsers = {
  json: JSON.parse,
  yml: safeLoad,
  ini: ini.parse,
};

export default format => getHandlerByType(format, parsers);
