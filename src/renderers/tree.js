import _ from 'lodash';

const indentSpacesCount = 3;

const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const spaces = ' '.repeat(depth * indentSpacesCount);
  const body = Object.keys(item).reduce((acc, key) => {
    const curItem = item[key];
    if (!_.isObject(curItem)) {
      return `${acc}${spaces}   ${key}: ${item[key]}\n`;
    }
    const stringified = stringify(item[key], depth + 1);
    return `${acc}${spaces}   ${key}: ${stringified}\n`;
  }, '');
  return `{\n${body}${spaces}}`;
};

const stringBuilders = {
  new: ({ key, value }, depth) => ` + ${key}: ${stringify(value, depth + 1)}\n`,
  deleted: ({ key, value }, depth) => ` - ${key}: ${stringify(value, depth + 1)}\n`,
  modified: ({ key, value }, depth) => ` + ${key}: ${stringify(value.new, depth + 1)}\n${' '.repeat(depth * indentSpacesCount)} - ${key}: ${stringify(value.old, depth + 1)}\n`,
  unmodified: ({ key, value }) => `   ${key}: ${value}\n`,
  nested: ({ key, children }, depth, render) => `   ${key}: ${render(children, depth + 1)}`,
};

const getItemRenderer = ({ type }) => (item, depth, render) => {
  const stringBuilder = stringBuilders[type];
  const spaces = ' '.repeat(depth * indentSpacesCount);
  if (!stringBuilder) {
    throw new Error(`Type: ${type} is not supported`);
  }
  return `${spaces}${stringBuilder(item, depth, render)}`;
};

const render = (diffs, depth = 0) => {
  const spaces = ' '.repeat(depth * indentSpacesCount);
  const body = diffs.reduce((acc, item) => {
    const renderItem = getItemRenderer(item);
    const renderedItem = renderItem(item, depth, render);
    return `${acc}${renderedItem}`;
  }, '');
  return `{\n${body}${spaces}}\n`;
};

export default render;
