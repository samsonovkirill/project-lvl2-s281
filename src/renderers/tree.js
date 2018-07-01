import _ from 'lodash';
import getItemHandler from './utils';

const indentSpacesCount = 3;

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
  const spaces = ' '.repeat(depth * indentSpacesCount);
  const indentBody = body.map(key => `${spaces}   ${key}`).join('\n');
  return `{\n${indentBody}\n${spaces}}`;
};

const stringBuilders = {
  new: ({ key, value }, depth) => ` + ${key}: ${stringify(value, depth + 1)}`,
  deleted: ({ key, value }, depth) => ` - ${key}: ${stringify(value, depth + 1)}`,
  modified: ({ key, oldValue, newValue }, depth) => [` + ${key}: ${stringify(newValue, depth + 1)}`, ` - ${key}: ${stringify(oldValue, depth + 1)}`],
  unmodified: ({ key, value }) => `   ${key}: ${value}`,
  nested: ({ key, children }, depth, render) => `   ${key}: ${render(children, depth + 1)}`,
};

const renderBody = (diffs, depth = 0) => {
  const body = diffs.reduce((acc, item) => {
    const renderItem = getItemHandler(item, stringBuilders);
    const renderedItem = renderItem(item, depth, renderBody);
    return [...acc, renderedItem];
  }, []);
  const spaces = ' '.repeat(depth * indentSpacesCount);
  const bodyWithIndents = _.flatten(body).map(item => `${spaces}${item}`).join('\n');
  return `{\n${bodyWithIndents}\n${spaces}}`;
};

const render = diffs => `${renderBody(diffs)}\n`;

export default render;
