const getItemHandler = ({ type }, handlersList) => (item, ...args) => {
  const handler = handlersList[type];
  if (!handler) {
    throw new Error(`Type: ${type} is not supported`);
  }
  return handler(item, ...args);
};

export default getItemHandler;
