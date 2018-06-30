import _ from 'lodash';

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
  new: ({ key, value }, depth) => ` + ${key}: ${stringify(value, depth + 1)}\n`,
  deleted: ({ key, value }, depth) => ` - ${key}: ${stringify(value, depth + 1)}\n`,
  modified: ({ key, oldValue, newValue }, depth) => [` + ${key}: ${stringify(newValue, depth + 1)}\n`, ` - ${key}: ${stringify(oldValue, depth + 1)}\n`],
  unmodified: ({ key, value }) => `   ${key}: ${value}\n`,
  nested: ({ key, children }, depth, render) => `   ${key}: ${render(children, depth + 1)}`,
};

const getItemRenderer = ({ type }) => (item, depth, render) => {
  const stringBuilder = stringBuilders[type];
  if (!stringBuilder) {
    throw new Error(`Type: ${type} is not supported`);
  }
  return stringBuilder(item, depth, render);
};

const render = (diffs, depth = 0) => {
  const body = diffs.reduce((acc, item) => {
    const renderItem = getItemRenderer(item);
    const renderedItem = renderItem(item, depth, render);
    return [...acc, renderedItem];
  }, []);
  const spaces = ' '.repeat(depth * indentSpacesCount);
  const bodyWithIndents = _.flatten(body).map(item => `${spaces}${item}`).join('');
  return `{\n${bodyWithIndents}${spaces}}\n`;
};

export default render;
