const getHandlerByType = (type, handlers) => (data, ...args) => {
  const handler = handlers[type];
  if (!handler) {
    throw new Error(`Type: ${type} is not supported`);
  }
  return handler(data, ...args);
};

export default getHandlerByType;
