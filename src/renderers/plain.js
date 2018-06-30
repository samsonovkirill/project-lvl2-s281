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
  new: ({ key, value }, path) => `Property '${makePrefix(path)}${key}' was added with ${stringify(value)} value\n`,
  deleted: ({ key }, path) => `Property '${makePrefix(path)}${key}' was removed\n`,
  modified: ({ key, oldValue, newValue }, path) => `Property '${makePrefix(path)}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)} value\n`,
  nested: ({ children, key }, path, render) => render(children, [...path, key]),
};

const getItemRenderer = ({ type }) => (item, path, render) => {
  const stringBuilder = stringBuilders[type];
  if (!stringBuilder) {
    throw new Error(`Type: ${type} is not supported`);
  }
  return `${stringBuilder(item, path, render)}`;
};

const render = (diffs, path = []) => {
  const modifiedOnly = diffs.filter(item => item.type !== 'unmodified');
  return modifiedOnly.reduce((acc, item) => {
    const renderItem = getItemRenderer(item);
    const renderedItem = renderItem(item, path, render);
    return `${acc}${renderedItem}`;
  }, '');
};


export default render;
