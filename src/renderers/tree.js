import _ from 'lodash';
import getHandlerByType from '../utils';

const indentSpacesCount = 3;
const shift = depth => ' '.repeat(depth * indentSpacesCount);

const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const body = Object.keys(item).reduce((acc, key) => {
    const curItem = item[key];
    if (!_.isObject(curItem)) {
      return [...acc, `${key}: ${curItem}`];
    }
    const stringified = stringify(curItem, depth + 1);
    return [...acc, `${key}: ${stringified}`];
  }, []);
  const spaces = shift(depth);
  const indentBody = body.map(key => `${spaces}   ${key}`).join('\n');
  return `{\n${indentBody}\n${spaces}}`;
};

const pair = ({ key, value }, depth) => `${key}: ${stringify(value, depth)}`;
const stringBuilders = {
  new: (...args) => ` + ${pair(...args)}`,
  deleted: (...args) => ` - ${pair(...args)}`,
  modified: ({ key, oldValue, newValue }, depth) => [` + ${key}: ${stringify(newValue, depth)}`, ` - ${key}: ${stringify(oldValue, depth)}`],
  unmodified: (...args) => `   ${pair(...args)}`,
  nested: ({ key, children }, depth, render) => `   ${key}: ${render(children, depth)}`,
};


const render = (diffs, depth = 0) => {
  const body = diffs.reduce((acc, item) => {
    const renderItem = getHandlerByType(item.type, stringBuilders);
    const renderedItem = renderItem(item, depth + 1, render);
    return [...acc, renderedItem];
  }, []);
  const spaces = shift(depth);
  const bodyWithIndents = _.flatten(body).map(item => `${spaces}${item}`).join('\n');
  return `{\n${bodyWithIndents}\n${spaces}}`;
};

export default render;
