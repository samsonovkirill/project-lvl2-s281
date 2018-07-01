const makePrefix = (path) => {
  const prefix = path.join('.');
  return prefix.length === 0 ? prefix : `${prefix}.`;
};

const getItemHandler = ({ type }, handlersList) => (item, ...args) => {
  const handler = handlersList[type];
  if (!handler) {
    throw new Error(`Type: ${type} is not supported`);
  }
  return handler(item, ...args);
};

export { makePrefix, getItemHandler };
