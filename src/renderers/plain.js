import getItemHandler from './utils';

const stringify = (item) => {
  if (typeof item === 'object') {
    return 'complex';
  }
  return `'${item}'`;
};

const makePrefix = (path) => {
  const prefix = path.join('.');
  return prefix.length === 0 ? prefix : `${prefix}.`;
};

const stringBuilders = {
  new: ({ key, value }, path) => `Property '${makePrefix(path)}${key}' was added with ${stringify(value)} value`,
  deleted: ({ key }, path) => `Property '${makePrefix(path)}${key}' was removed`,
  modified: ({ key, oldValue, newValue }, path) => `Property '${makePrefix(path)}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)} value`,
  nested: ({ children, key }, path, render) => render(children, [...path, key]),
};

const renderBody = (diffs, path = []) => {
  const affectedItems = diffs.filter(item => item.type !== 'unmodified');
  const body = affectedItems.reduce((acc, item) => {
    const renderItem = getItemHandler(item, stringBuilders);
    const renderedItem = renderItem(item, path, renderBody);
    return [...acc, renderedItem];
  }, []);
  return body.join('\n');
};

const render = diffs => `${renderBody(diffs)}\n`;

export default render;
