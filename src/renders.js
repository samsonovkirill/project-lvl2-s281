const indentSpacesCount = 3;

const sign = {
  new: '+',
  deleted: '-',
  unmodified: ' ',
};

const stringify = (item, depth) => {
  const spaces = ' '.repeat(depth * indentSpacesCount);
  if (typeof item === 'object') {
    const body = Object.keys(item).reduce((acc, key) => {
      if (typeof item[key] === 'object') {
        const stringified = stringify(item[key], depth + 1);
        return `${acc}${spaces}   ${key}: ${stringified}\n`;
      }
      return `${acc}${spaces}   ${key}: ${item[key]}\n`;
    }, '');
    return `{\n${body}${spaces}}`;
  }
  return item;
};

const renderItem = (item, depth) => {
  const spaces = ' '.repeat(depth * indentSpacesCount);
  const { type } = item;
  if (type === 'modified') {
    const { key, oldValue, newValue } = item;
    return `${spaces} ${sign.new} ${key}: ${stringify(newValue, depth + 1)}\n${spaces} ${sign.deleted} ${key}: ${stringify(oldValue, depth + 1)}\n`;
  }
  const { key, value } = item;
  return `${spaces} ${sign[type]} ${key}: ${stringify(value, depth + 1)}\n`;
};

const render = (diffs, depth = 0) => {
  const spaces = ' '.repeat(depth * indentSpacesCount);
  const body = diffs.reduce((acc, item) => {
    if (item.type === 'node') {
      const renderedBlock = render(item.children, depth + 1);
      return `${acc}${spaces}   ${item.key}: ${renderedBlock}`;
    }
    return `${acc}${renderItem(item, depth)}`;
  }, '');
  return `{\n${body}${spaces}}\n`;
};


export default render;
